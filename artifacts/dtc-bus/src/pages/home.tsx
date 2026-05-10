import { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPopularRoutes, getGetPopularRoutesQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [, setLocation] = useLocation();
  const [busNumber, setBusNumber] = useState("");

  const { data: popularRoutes, isLoading } = useGetPopularRoutes({
    query: {
      queryKey: getGetPopularRoutesQueryKey(),
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      setLocation(`/search?busNumber=${encodeURIComponent(busNumber.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative w-full bg-primary/5 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Your Bridge Between Village and City
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Dependable, accessible seat booking for Delhi Transport Corporation buses. Secure your seat before you leave home.
                </p>
              </div>
              
              <div className="w-full max-w-sm space-y-2 bg-white p-4 rounded-xl shadow-sm border mt-4">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input 
                    type="text" 
                    placeholder="Enter Bus Number (e.g. 511, 712)" 
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
            <img
              src="/hero-bus.png"
              alt="Classic red DTC bus on Delhi street"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Popular Routes</h2>
            <p className="max-w-[900px] text-muted-foreground">
              Frequently traveled routes connecting rural areas to Delhi hubs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
              ))
            ) : popularRoutes?.map((route) => (
              <Card key={route.busNumber} className="hover-elevate cursor-pointer transition-colors" onClick={() => setLocation(`/search?busNumber=${route.busNumber}`)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                      Bus {route.busNumber}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{route.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium line-clamp-1">{route.origin} to {route.destination}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Every {route.frequency}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {route.totalStops} Stops
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground">
              Simple steps to secure your seat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">1. Find Your Bus</h3>
              <p className="text-muted-foreground">Search by bus number to view schedules and availability.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">2. Choose Seats</h3>
              <p className="text-muted-foreground">Select the number of passengers and confirm your details.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">3. Travel with Ease</h3>
              <p className="text-muted-foreground">Board the bus at your stop with your confirmed booking.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
