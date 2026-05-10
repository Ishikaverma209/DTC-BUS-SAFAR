import { useSearch, useLocation } from "wouter";
import { useSearchBus, getSearchBusQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, ArrowRight, AlertCircle, Users, Bus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/language-context";

export default function SearchPage() {
  const searchString = useSearch();
  const [, setLocation] = useLocation();
  const { t } = useLang();
  const searchParams = new URLSearchParams(searchString);
  const busNumber = searchParams.get("busNumber") || "";

  const { data: result, isLoading, error } = useSearchBus(
    { busNumber },
    {
      query: {
        enabled: !!busNumber,
        queryKey: getSearchBusQueryKey({ busNumber }),
        retry: false,
      }
    }
  );

  if (!busNumber) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">{t("search.noNumber")}</h2>
        <Button className="mt-4" onClick={() => setLocation("/")}>{t("search.goHome")}</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[100dvh]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("search.title")}</h1>
        <Button variant="outline" onClick={() => setLocation("/")}>{t("search.newSearch")}</Button>
      </div>

      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="rounded-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{t("search.notFound")}</AlertDescription>
        </Alert>
      )}

      {result && !isLoading && (
        <div className="space-y-6">
          {/* Bus info card */}
          <Card className="border-2 border-primary/20 rounded-2xl shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-rose-50 pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Bus className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xl font-extrabold">
                        {result.busNumber}
                      </span>
                      <Badge variant="secondary" className="text-sm">{result.type}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1.5 text-base font-semibold flex items-center gap-2 text-foreground/70">
                      <MapPin className="h-4 w-4 text-green-500" /> {result.origin}
                      <ArrowRight className="h-4 w-4" />
                      <MapPin className="h-4 w-4 text-red-500" /> {result.destination}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => setLocation(`/book?busNumber=${result.busNumber}`)}
                  disabled={result.availableSeats === 0}
                  className="shrink-0 shadow-md"
                >
                  {t("search.bookSeat")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1 bg-gray-50 rounded-xl p-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Users className="h-3 w-3" /> {t("search.available")}
                </span>
                <p className="font-bold text-lg">
                  {result.availableSeats > 0
                    ? <span className="text-green-600">{result.availableSeats} {t("book.seatsUnits")}</span>
                    : <span className="text-destructive">{t("search.full")}</span>}
                </p>
              </div>
              <div className="space-y-1 bg-gray-50 rounded-xl p-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3" /> {t("search.frequency")}
                </span>
                <p className="font-bold">{result.frequency}</p>
              </div>
              <div className="space-y-1 bg-gray-50 rounded-xl p-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <MapPin className="h-3 w-3" /> {t("search.totalStops")}
                </span>
                <p className="font-bold">{result.totalStops}</p>
              </div>
              <div className="space-y-1 bg-gray-50 rounded-xl p-3 col-span-2 md:col-span-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3" /> {t("search.nextDepartures")}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.nextDepartures.map(time => (
                    <span key={time} className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-semibold">{time}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route stops */}
          <div>
            <h3 className="text-xl font-extrabold mb-6">{t("search.routeStops")}</h3>
            <div className="relative border-l-2 border-primary/30 ml-5 space-y-5 pb-4">
              {result.stops.map((stop, index) => (
                <div key={stop.stopNumber} className="relative pl-8">
                  <div className={`absolute -left-[9px] top-3 h-4 w-4 rounded-full border-2 border-primary ${index === 0 || index === result.stops.length - 1 ? "bg-primary" : "bg-white"}`} />
                  <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base">{stop.stopName}</h4>
                          {(index === 0) && <Badge className="text-xs bg-green-100 text-green-700 border-green-200">Origin</Badge>}
                          {(index === result.stops.length - 1) && <Badge className="text-xs bg-red-100 text-red-700 border-red-200">Destination</Badge>}
                        </div>
                        {(stop.village || stop.district) && (
                          <p className="text-sm text-primary font-semibold mt-0.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {[stop.village, stop.district].filter(Boolean).join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-lg">
                        +{stop.estimatedArrivalMinutes} {t("search.minArrival")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
