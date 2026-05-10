import { useListBookings, getListBookingsQueryKey, useCancelBooking, useGetCurrentUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Ban } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function BookingsPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data: bookings, isLoading: isBookingsLoading } = useListBookings({
    query: {
      queryKey: getListBookingsQueryKey(),
      enabled: !!user,
    }
  });

  const cancelBooking = useCancelBooking();

  if (isUserLoading) {
    return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64 w-full" /></div>;
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking.mutate({ id }, {
        onSuccess: () => {
          toast.success("Booking cancelled");
          queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
        },
        onError: (err) => {
          toast.error(err.error || "Failed to cancel");
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-green-600 hover:bg-green-700">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[100dvh]">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {isBookingsLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : !bookings || bookings.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">No bookings yet</h3>
          <p className="text-muted-foreground mt-2 mb-6">You haven't booked any bus tickets.</p>
          <Button onClick={() => setLocation("/")}>Find a Bus</Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary/5 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r min-w-[200px]">
                  <span className="text-sm font-medium text-muted-foreground mb-1">Bus Number</span>
                  <span className="text-3xl font-bold text-primary">{booking.busNumber}</span>
                  <div className="mt-4">{getStatusBadge(booking.status)}</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Ref</p>
                      <p className="font-mono text-sm font-bold">{booking.bookingRef}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Travel Date</p>
                      <p className="font-medium flex items-center gap-1"><Calendar className="h-3 w-3"/>{booking.travelDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1 bg-muted/30 p-3 rounded">
                      <span className="text-xs text-muted-foreground">Journey</span>
                      <div className="font-medium flex items-center gap-2">
                        {booking.fromStop} <span className="text-muted-foreground">→</span> {booking.toStop}
                      </div>
                    </div>
                    <div className="space-y-1 bg-muted/30 p-3 rounded">
                      <span className="text-xs text-muted-foreground">Passenger</span>
                      <div className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground"/>
                        {booking.passengerName} ({booking.passengerAge}y)
                        <span className="ml-auto text-xs bg-white px-2 py-0.5 rounded shadow-sm border">
                          {booking.seatCount} Seat{booking.seatCount > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {booking.status.toLowerCase() === 'confirmed' && (
                    <div className="flex justify-end mt-4 pt-4 border-t">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancelBooking.isPending}
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
