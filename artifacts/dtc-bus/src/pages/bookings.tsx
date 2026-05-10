import { useListBookings, getListBookingsQueryKey, useCancelBooking, useGetCurrentUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Ban, Bus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useLang } from "@/lib/language-context";

export default function BookingsPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { t } = useLang();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data: bookings, isLoading: isBookingsLoading } = useListBookings({
    query: { queryKey: getListBookingsQueryKey(), enabled: !!user }
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
    if (confirm(t("bookings.cancelConfirm"))) {
      cancelBooking.mutate({ id }, {
        onSuccess: () => {
          toast.success(t("bookings.cancelSuccess"));
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
      case 'confirmed': return <Badge className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-100">{t("bookings.confirmed")}</Badge>;
      case 'cancelled': return <Badge variant="destructive">{t("bookings.cancelled")}</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[100dvh]">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">{t("bookings.title")}</h1>

      {isBookingsLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : !bookings || bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-5">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold">{t("bookings.empty.title")}</h3>
          <p className="text-muted-foreground mt-2 mb-7">{t("bookings.empty.sub")}</p>
          <Button onClick={() => setLocation("/")} size="lg">{t("bookings.findBus")}</Button>
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map(booking => (
            <Card key={booking.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow border">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Bus number sidebar */}
                  <div className="bg-gradient-to-br from-primary/10 to-rose-50 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r min-w-[160px] gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Bus className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-extrabold text-primary">{booking.busNumber}</span>
                    {getStatusBadge(booking.status)}
                  </div>

                  {/* Booking details */}
                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("bookings.ref")}</p>
                        <p className="font-mono font-bold text-base text-primary">{booking.bookingRef}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("bookings.travelDate")}</p>
                        <p className="font-semibold flex items-center gap-1 justify-end">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> {booking.travelDate}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t("bookings.journey")}</p>
                        <div className="font-semibold flex items-center gap-1.5 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          <span className="line-clamp-1">{booking.fromStop}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          <span className="line-clamp-1">{booking.toStop}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t("bookings.passenger")}</p>
                        <div className="font-semibold flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary shrink-0" />
                          <span>{booking.passengerName} ({booking.passengerAge}y)</span>
                          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold shrink-0">
                            {booking.seatCount} {booking.seatCount > 1 ? t("book.seatsUnits") : t("book.seatsUnit")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {booking.status.toLowerCase() === 'confirmed' && (
                      <div className="flex justify-end pt-2 border-t">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancelBooking.isPending}
                          className="gap-1.5"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          {t("bookings.cancelBtn")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
