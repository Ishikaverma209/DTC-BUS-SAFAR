import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetCurrentUser } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CalendarCheck, Ban, Route, MapPin } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data: summary, isLoading: isSummaryLoading } = useGetDashboardSummary({
    query: {
      queryKey: getGetDashboardSummaryQueryKey(),
      enabled: !!user,
    }
  });

  if (isUserLoading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  
  if (!user) {
    setLocation("/login");
    return null;
  }

  if (isSummaryLoading || !summary) {
    return <div className="p-8 space-y-4"><Skeleton className="h-32 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[100dvh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-1">Here is your travel summary with AI Safar.</p>
        </div>
        <Button onClick={() => setLocation("/")}>Book New Ticket</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.totalBookings}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Trips</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.upcomingBookings}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cancelled</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.cancelledBookings}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/bookings")}>View All</Button>
          </CardHeader>
          <CardContent>
            {summary.recentBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No recent bookings.</p>
            ) : (
              <div className="space-y-4">
                {summary.recentBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary font-bold px-3 py-2 rounded-md">
                        {booking.busNumber}
                      </div>
                      <div>
                        <p className="font-medium">{booking.fromStop} to {booking.toStop}</p>
                        <p className="text-sm text-muted-foreground">{booking.travelDate} • {booking.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" /> Popular Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.popularRoutes.map((route, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{route}</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setLocation(`/search?busNumber=${route}`)}>
                    Book
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
