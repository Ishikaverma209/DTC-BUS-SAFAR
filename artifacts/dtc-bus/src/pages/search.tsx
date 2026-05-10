import { useSearch, useLocation } from "wouter";
import { useSearchBus, getSearchBusQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, ArrowRight, AlertCircle, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SearchPage() {
  const searchString = useSearch();
  const [, setLocation] = useLocation();
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
        <h2 className="text-2xl font-bold">No bus number provided</h2>
        <Button className="mt-4" onClick={() => setLocation("/")}>Go Back Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[100dvh]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <Button variant="outline" onClick={() => setLocation("/")}>New Search</Button>
      </div>

      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not find bus route {busNumber}. Please check the number and try again.
          </AlertDescription>
        </Alert>
      )}

      {result && !isLoading && (
        <div className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xl">
                      {result.busNumber}
                    </span>
                    <span className="text-foreground/80">{result.type}</span>
                  </CardTitle>
                  <CardDescription className="mt-2 text-base font-medium flex items-center gap-2">
                    {result.origin} <ArrowRight className="h-4 w-4" /> {result.destination}
                  </CardDescription>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setLocation(`/book?busNumber=${result.busNumber}`)}
                  disabled={result.availableSeats === 0}
                >
                  Book Seat
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3"/> Available</span>
                <p className="font-semibold text-lg">{result.availableSeats > 0 ? <span className="text-green-600">{result.availableSeats} Seats</span> : <span className="text-destructive">Full</span>}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3"/> Frequency</span>
                <p className="font-medium">{result.frequency}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> Total Stops</span>
                <p className="font-medium">{result.totalStops}</p>
              </div>
              <div className="space-y-1 col-span-2 md:col-span-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3"/> Next Departures</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.nextDepartures.map(time => (
                    <span key={time} className="bg-secondary px-2 py-0.5 rounded text-xs font-medium">{time}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold mt-8 mb-4">Route Stops</h3>
          <div className="relative border-l-2 border-primary/30 ml-4 space-y-6 pb-4">
            {result.stops.map((stop, index) => (
              <div key={stop.stopNumber} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white border-2 border-primary" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 bg-white p-4 rounded-lg border shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg">{stop.stopName}</h4>
                    {(stop.village || stop.district) && (
                      <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {[stop.village, stop.district].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                      +{stop.estimatedArrivalMinutes} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
