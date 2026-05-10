import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetCurrentUser } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CalendarCheck, Ban, Route, MapPin, ArrowRight, Bus } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/language-context";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { t } = useLang();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data: summary, isLoading: isSummaryLoading } = useGetDashboardSummary({
    query: { queryKey: getGetDashboardSummaryQueryKey(), enabled: !!user }
  });

  if (isUserLoading) return <div className="p-8"><Skeleton className="h-64 w-full rounded-2xl" /></div>;

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (isSummaryLoading || !summary) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[100dvh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">AI Safar</p>
          <h1 className="text-3xl font-extrabold tracking-tight">{t("dash.welcome")} {user.name}</h1>
          <p className="text-muted-foreground mt-1">{t("dash.sub")}</p>
        </div>
        <Button onClick={() => setLocation("/")} size="lg" className="gap-2 shadow-sm">
          <Bus className="h-4 w-4" /> {t("dash.bookNew")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card className="border-l-4 border-l-primary shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">{t("dash.totalBookings")}</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{summary.totalBookings}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">{t("dash.upcoming")}</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-green-600">{summary.upcomingBookings}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">{t("dash.cancelled")}</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <Ban className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-destructive">{summary.cancelledBookings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <Card className="lg:col-span-2 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="font-extrabold">{t("dash.recentBookings")}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/bookings")} className="text-primary hover:text-primary">
              {t("dash.viewAll")}
            </Button>
          </CardHeader>
          <CardContent>
            {summary.recentBookings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Bus className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                <p>{t("dash.noRecent")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {summary.recentBookings.map(booking => (
                  <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border hover:border-primary/30 transition-colors">
                    <div className="bg-primary text-white font-bold px-3 py-2 rounded-xl text-sm min-w-[52px] text-center shadow-sm">
                      {booking.busNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        <span className="truncate">{booking.fromStop}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{booking.toStop}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{booking.travelDate}</p>
                    </div>
                    <Badge
                      className={booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
                        : ""}
                      variant={booking.status === "cancelled" ? "destructive" : "secondary"}
                    >
                      {booking.status === "confirmed" ? t("bookings.confirmed") : t("bookings.cancelled")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular routes */}
        <Card className="shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 font-extrabold">
              <Route className="h-5 w-5 text-primary" /> {t("dash.popularRoutes")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.popularRoutes.map((route, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl border hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium text-sm truncate">{route}</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setLocation(`/search?busNumber=${route.split(":")[0]}`)}
                    className="shrink-0 text-primary hover:text-primary font-semibold"
                  >
                    {t("dash.book")}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
