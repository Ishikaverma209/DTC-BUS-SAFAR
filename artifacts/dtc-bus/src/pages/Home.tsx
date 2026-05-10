import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPopularRoutes } from "@workspace/api-client-react";
import { MapPin, Search as SearchIcon, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Home() {
  const [busNumber, setBusNumber] = useState("");
  const [, setLocation] = useLocation();
  const { data: popularRoutes, isLoading } = useGetPopularRoutes();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      setLocation(`/search?busNumber=${encodeURIComponent(busNumber.trim())}`);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="/hero-bus.png"
            alt="Classic red DTC bus"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container relative z-20 px-4 md:px-6 mx-auto">
          <div className="max-w-[700px] space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/90 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm shadow-sm font-medium border border-primary-foreground/20">
                Delhi Transport Corporation
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl/none drop-shadow-md">
                Your Bridge to the City. Every Single Day.
              </h1>
              <p className="max-w-[600px] text-lg text-white/90 md:text-xl drop-shadow-md font-medium">
                Reliable, safe, and accessible bus booking for everyone. Find your route and secure your seat before you travel.
              </p>
            </div>
            
            <div className="w-full max-w-md bg-background/95 backdrop-blur-sm p-2 rounded-xl shadow-xl border-4 border-primary/20">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter Bus Number (e.g. 101, 781)"
                    className="pl-10 h-14 bg-background border-none text-lg shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 text-base font-bold shadow-md">
                  Find Bus
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Popular Routes</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Frequently traveled routes connecting rural communities to the city center.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden shadow-sm">
                  <CardHeader className="bg-muted/50 pb-4 border-b">
                    <Skeleton className="h-8 w-24 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : popularRoutes && popularRoutes.length > 0 ? (
              popularRoutes.slice(0, 6).map((route) => (
                <Card key={route.busNumber} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-primary group">
                  <CardHeader className="bg-primary/5 pb-4 border-b group-hover:bg-primary/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-2xl font-bold text-primary">{route.busNumber}</CardTitle>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background border shadow-sm">{route.type}</span>
                    </div>
                    <CardDescription className="font-medium text-foreground/80 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Every {route.frequency}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3 relative before:absolute before:inset-y-3 before:left-3 before:w-0.5 before:bg-border before:-z-10 z-10">
                      <div className="flex gap-4 items-start bg-background">
                        <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                          <MapPin className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Origin</p>
                          <p className="font-bold text-foreground">{route.origin}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start bg-background">
                        <div className="mt-1 h-6 w-6 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center shrink-0 border border-accent/30">
                          <MapPin className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Destination</p>
                          <p className="font-bold text-foreground">{route.destination}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t flex justify-between items-center">
                      <span className="text-sm text-muted-foreground font-medium">{route.totalStops} Stops</span>
                      <Button variant="outline" size="sm" className="group/btn" onClick={() => setLocation(`/search?busNumber=${route.busNumber}`)}>
                        View Route <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No popular routes found at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Reliable Travel</h2>
            <p className="text-lg text-muted-foreground">
              We've made it incredibly easy to secure your seat so you can focus on your day, not on catching the bus.
            </p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <SearchIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Find Your Bus</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enter the bus number or search by your village stop to see live schedules and routes.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Book Your Seat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Select your boarding and drop-off stops, choose your date, and secure a confirmed seat instantly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Travel with Peace</h3>
              <p className="text-muted-foreground leading-relaxed">
                Board confidently knowing your seat is reserved. Just show your booking confirmation on your phone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
