import { MainLayout } from "@/components/layout/MainLayout";
import { useSearchBus } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search as SearchIcon, Clock, Users, ArrowRight, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Search() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialBusNumber = searchParams.get("busNumber") || "";
  
  const [busNumber, setBusNumber] = useState(initialBusNumber);
  const [activeSearch, setActiveSearch] = useState(initialBusNumber);

  const { data: searchResult, isLoading, isError, error } = useSearchBus(
    { busNumber: activeSearch },
    { query: { enabled: !!activeSearch, retry: false } }
  );

  useEffect(() => {
    if (initialBusNumber && initialBusNumber !== activeSearch) {
      setActiveSearch(initialBusNumber);
      setBusNumber(initialBusNumber);
    }
  }, [initialBusNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      setActiveSearch(busNumber.trim());
      // Update URL without reloading
      window.history.pushState({}, "", `/search?busNumber=${encodeURIComponent(busNumber.trim())}`);
    }
  };

  const handleBook = () => {
    if (searchResult) {
      setLocation(`/book?busNumber=${searchResult.busNumber}`);
    }
  };

  return (
    <MainLayout>
      <div className="bg-primary/5 border-b">
        <div className="container py-8 md:py-12 px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Find Your Bus Route</h1>
            <Card className="shadow-md">
              <CardContent className="p-2">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter Bus Number (e.g. 101)"
                      className="pl-10 h-14 bg-background border-none text-lg shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                      value={busNumber}
                      onChange={(e) => setBusNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-14 px-8 text-base font-bold shadow-sm">
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container py-8 px-4 md:px-6 mx-auto flex-1">
        {!activeSearch ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Bus className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Search for a route</h2>
            <p className="text-muted-foreground max-w-md">
              Enter a bus number above to see the complete route, stops, schedule, and book your seat.
            </p>
          </div>
        ) : isLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-12 w-64 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ) : isError || !searchResult ? (
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertTitle className="text-lg font-bold">Route not found</AlertTitle>
              <AlertDescription className="text-base">
                {error?.error?.error || "We couldn't find a bus with that number. Please check the number and try again."}
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Route Stops
                </h2>
                <div className="relative border-l-2 border-primary/30 ml-4 space-y-8 pb-4">
                  {searchResult.stops.map((stop, index) => (
                    <div key={stop.stopNumber} className="relative pl-8">
                      <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-background ${index === 0 || index === searchResult.stops.length - 1 ? 'bg-primary scale-125' : 'bg-muted-foreground'}`} />
                      
                      <div className="bg-card border rounded-lg p-4 shadow-sm hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-bold text-lg">{stop.stopName}</h3>
                            {stop.village && (
                              <p className="text-primary font-medium flex items-center gap-1 mt-1">
                                <Home className="h-3.5 w-3.5" />
                                Village: {stop.village}
                              </p>
                            )}
                            {stop.district && (
                              <p className="text-muted-foreground text-sm mt-1">{stop.district} District</p>
                            )}
                          </div>
                          <div className="bg-muted px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap">
                            {stop.estimatedArrivalMinutes === 0 ? "Origin" : `+${stop.estimatedArrivalMinutes} min`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24 shadow-md border-t-4 border-t-primary">
                <CardHeader className="bg-muted/30 pb-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-3xl font-black text-primary">{searchResult.busNumber}</CardTitle>
                    <span className="bg-background border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{searchResult.type}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      {searchResult.origin}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      {searchResult.destination}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Frequency</p>
                      <p className="font-bold">{searchResult.frequency}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Stops</p>
                      <p className="font-bold">{searchResult.totalStops}</p>
                    </div>
                  </div>
                  
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1 mb-1"><Users className="h-4 w-4 text-accent" /> Available Seats</p>
                    <p className="text-3xl font-black text-accent-foreground">{searchResult.availableSeats}</p>
                  </div>

                  {searchResult.nextDepartures && searchResult.nextDepartures.length > 0 && (
                    <div>
                      <p className="text-sm font-bold mb-3 border-b pb-1">Next Departures</p>
                      <div className="flex flex-wrap gap-2">
                        {searchResult.nextDepartures.map(time => (
                          <span key={time} className="bg-muted px-2 py-1 rounded text-sm font-medium border">{time}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full h-14 text-lg font-bold shadow-md" 
                    onClick={handleBook}
                    disabled={searchResult.availableSeats === 0}
                  >
                    {searchResult.availableSeats === 0 ? "Sold Out" : "Book a Seat"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// simple fallback icon
function Bus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
}
