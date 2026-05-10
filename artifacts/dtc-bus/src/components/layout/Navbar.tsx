import { Link, useLocation } from "wouter";
import { useGetCurrentUser, useLogoutUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bus, LogOut, LayoutDashboard, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetCurrentUser({
    query: {
      retry: false,
    }
  });

  const logout = useLogoutUser();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        toast.success("Logout Successful!");
        setLocation("/");
      },
      onError: () => {
        toast.error("Failed to logout");
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <Bus className="h-6 w-6" />
          <span>DTC Bus Seva</span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isLoading && user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/bookings"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <History className="h-4 w-4" />
                My Bookings
              </Link>
              <div className="flex items-center gap-2 pl-4 border-l">
                <span className="text-sm font-medium hidden sm:inline-block text-foreground">
                  {user.name}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </>
          ) : !isLoading ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
