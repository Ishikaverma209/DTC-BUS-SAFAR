import { useSearch, useLocation } from "wouter";
import { useGetBusStops, getGetBusStopsQueryKey, useCreateBooking, useGetCurrentUser, getGetCurrentUserQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";

export default function BookPage() {
  const searchString = useSearch();
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(searchString);
  const busNumber = searchParams.get("busNumber") || "";

  const { data: user, isLoading: isUserLoading } = useGetCurrentUser({
    query: {
      queryKey: getGetCurrentUserQueryKey(),
      retry: false,
    }
  });

  const { data: stops, isLoading: isStopsLoading } = useGetBusStops(
    busNumber,
    {
      query: {
        enabled: !!busNumber,
        queryKey: getGetBusStopsQueryKey(busNumber),
      }
    }
  );

  const createBooking = useCreateBooking();

  const [formData, setFormData] = useState({
    fromStop: "",
    toStop: "",
    travelDate: new Date().toISOString().split('T')[0],
    passengerName: user?.name || "",
    passengerAge: "",
    seatCount: "1",
  });

  if (!busNumber) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">No bus selected</h2>
        <Button className="mt-4" onClick={() => setLocation("/")}>Go Back Home</Button>
      </div>
    );
  }

  if (isUserLoading || isStopsLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  if (!user) {
    setLocation(`/login?redirect=/book?busNumber=${busNumber}`);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fromStop || !formData.toStop) {
      toast.error("Please select both boarding and drop stops");
      return;
    }
    
    createBooking.mutate({
      data: {
        busNumber,
        fromStop: formData.fromStop,
        toStop: formData.toStop,
        travelDate: formData.travelDate,
        passengerName: formData.passengerName,
        passengerAge: parseInt(formData.passengerAge, 10),
        seatCount: parseInt(formData.seatCount, 10),
      }
    }, {
      onSuccess: () => {
        toast.success("Booking confirmed successfully!");
        setLocation("/bookings");
      },
      onError: (error) => {
        toast.error(error.error || "Failed to create booking");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl min-h-[100dvh]">
      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Book Seat on Bus {busNumber}</CardTitle>
          <CardDescription>Secure your journey. Please fill in the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fromStop">Boarding Stop *</Label>
                <Select value={formData.fromStop} onValueChange={(v) => setFormData({...formData, fromStop: v})} required>
                  <SelectTrigger id="fromStop">
                    <SelectValue placeholder="Select stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {stops?.map(stop => (
                      <SelectItem key={`from-${stop.stopName}`} value={stop.stopName}>
                        {stop.stopName} {stop.village ? `(${stop.village})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toStop">Drop Stop *</Label>
                <Select value={formData.toStop} onValueChange={(v) => setFormData({...formData, toStop: v})} required>
                  <SelectTrigger id="toStop">
                    <SelectValue placeholder="Select stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {stops?.map(stop => (
                      <SelectItem key={`to-${stop.stopName}`} value={stop.stopName}>
                        {stop.stopName} {stop.village ? `(${stop.village})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDate">Date of Travel *</Label>
              <Input 
                id="travelDate" 
                type="date" 
                value={formData.travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                required
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Passenger Details</h3>
              <div className="space-y-2">
                <Label htmlFor="passengerName">Full Name *</Label>
                <Input 
                  id="passengerName" 
                  value={formData.passengerName}
                  onChange={(e) => setFormData({...formData, passengerName: e.target.value})}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerAge">Age *</Label>
                  <Input 
                    id="passengerAge" 
                    type="number" 
                    min="1"
                    max="120"
                    value={formData.passengerAge}
                    onChange={(e) => setFormData({...formData, passengerAge: e.target.value})}
                    placeholder="Years"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seatCount">Number of Seats *</Label>
                  <Select value={formData.seatCount} onValueChange={(v) => setFormData({...formData, seatCount: v})}>
                    <SelectTrigger id="seatCount">
                      <SelectValue placeholder="Seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Seat</SelectItem>
                      <SelectItem value="2">2 Seats</SelectItem>
                      <SelectItem value="3">3 Seats</SelectItem>
                      <SelectItem value="4">4 Seats</SelectItem>
                      <SelectItem value="5">5 Seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" onClick={() => setLocation(-1)}>Cancel</Button>
          <Button type="submit" form="booking-form" className="w-full md:w-auto ml-4" disabled={createBooking.isPending}>
            {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
