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
import { useLang } from "@/lib/language-context";
import { Bus, MapPin, Calendar, Users } from "lucide-react";

export default function BookPage() {
  const searchString = useSearch();
  const [, setLocation] = useLocation();
  const { t } = useLang();
  const searchParams = new URLSearchParams(searchString);
  const busNumber = searchParams.get("busNumber") || "";

  const { data: user, isLoading: isUserLoading } = useGetCurrentUser({
    query: { queryKey: getGetCurrentUserQueryKey(), retry: false }
  });

  const { data: stops, isLoading: isStopsLoading } = useGetBusStops(
    busNumber,
    { query: { enabled: !!busNumber, queryKey: getGetBusStopsQueryKey(busNumber) } }
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
        <h2 className="text-2xl font-bold">{t("book.noStop")}</h2>
        <Button className="mt-4" onClick={() => setLocation("/")}>{t("search.goHome")}</Button>
      </div>
    );
  }

  if (isUserLoading || isStopsLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Skeleton className="h-[600px] w-full rounded-2xl" />
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
      toast.error(t("book.selectBothStops"));
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
        toast.success(t("book.success"));
        setLocation("/bookings");
      },
      onError: (error) => {
        toast.error(error.error || "Failed to create booking");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl min-h-[100dvh]">
      <Card className="border-t-4 border-t-primary shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-rose-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold">{t("book.title")} {busNumber}</CardTitle>
              <CardDescription className="mt-0.5">{t("book.desc")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Stop selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="fromStop" className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="h-4 w-4 text-green-500" /> {t("book.boardingStop")} *
                </Label>
                <Select value={formData.fromStop} onValueChange={(v) => setFormData({ ...formData, fromStop: v })} required>
                  <SelectTrigger id="fromStop" className="h-11">
                    <SelectValue placeholder={t("book.selectStop")} />
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
                <Label htmlFor="toStop" className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="h-4 w-4 text-red-500" /> {t("book.dropStop")} *
                </Label>
                <Select value={formData.toStop} onValueChange={(v) => setFormData({ ...formData, toStop: v })} required>
                  <SelectTrigger id="toStop" className="h-11">
                    <SelectValue placeholder={t("book.selectStop")} />
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

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="travelDate" className="flex items-center gap-1.5 font-semibold">
                <Calendar className="h-4 w-4 text-primary" /> {t("book.travelDate")} *
              </Label>
              <Input
                id="travelDate"
                type="date"
                value={formData.travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                required
                className="h-11"
              />
            </div>

            {/* Passenger details */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-extrabold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> {t("book.passenger")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="passengerName" className="font-semibold">{t("book.fullName")} *</Label>
                <Input
                  id="passengerName"
                  value={formData.passengerName}
                  onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                  placeholder={t("book.enterName")}
                  required
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerAge" className="font-semibold">{t("book.age")} *</Label>
                  <Input
                    id="passengerAge"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.passengerAge}
                    onChange={(e) => setFormData({ ...formData, passengerAge: e.target.value })}
                    placeholder={t("book.years")}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seatCount" className="font-semibold">{t("book.seats")} *</Label>
                  <Select value={formData.seatCount} onValueChange={(v) => setFormData({ ...formData, seatCount: v })}>
                    <SelectTrigger id="seatCount" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(n => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? t("book.seatsUnit") : t("book.seatsUnits")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-gray-50/70 px-6 py-4 gap-3">
          <Button variant="outline" onClick={() => setLocation(-1 as unknown as string)} className="flex-1 sm:flex-none">
            {t("book.cancel")}
          </Button>
          <Button type="submit" form="booking-form" className="flex-1 sm:flex-none font-semibold h-11" disabled={createBooking.isPending}>
            {createBooking.isPending ? t("book.confirming") : t("book.confirm")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
