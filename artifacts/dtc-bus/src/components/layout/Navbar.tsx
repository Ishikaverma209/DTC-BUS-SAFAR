import { Link, useLocation } from "wouter";
import { useGetCurrentUser, useLogoutUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Train, LogOut, LayoutDashboard, History, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user, isLoading } = useGetCurrentUser({
    query: { retry: false }
  });

  const logout = useLogoutUser();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        toast.success("Logout Successful!");
        setLocation("/");
        setMobileOpen(false);
      },
      onError: () => {
        toast.error("Failed to logout");
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white shadow-sm">
            <Train className="h-5 w-5" />
          </div>
          <span className="text-primary">AI</span>
          <span className="text-foreground">Safar</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link href="/search?busNumber=401" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Routes</Link>
          {user && (
            <>
              <Link href="/bookings" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <History className="h-4 w-4" /> My Bookings
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoading && user ? (
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <p className="text-sm font-semibold leading-none text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : !isLoading ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="shadow-sm">Get Started</Button>
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-sm font-medium py-2 border-b" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/search?busNumber=401" className="text-sm font-medium py-2 border-b" onClick={() => setMobileOpen(false)}>Routes</Link>
          {user && (
            <>
              <Link href="/bookings" className="text-sm font-medium py-2 border-b" onClick={() => setMobileOpen(false)}>My Bookings</Link>
              <Link href="/dashboard" className="text-sm font-medium py-2 border-b" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            </>
          )}
          {!isLoading && !user && (
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">Log in</Button>
              </Link>
              <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button className="w-full" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive justify-start px-0">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
