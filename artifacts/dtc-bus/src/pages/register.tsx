import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useRegisterUser, useGetCurrentUser, getGetCurrentUserQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Bus } from "lucide-react";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { data: user, isLoading } = useGetCurrentUser({
    query: { retry: false }
  });

  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);

  const registerUser = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    registerUser.mutate({
      data: { name, email, password }
    }, {
      onSuccess: () => {
        toast.success("Account created successfully! Logged in.");
        queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
        setLocation("/dashboard");
      },
      onError: (err) => {
        toast.error(err.error || "Registration failed");
      }
    });
  };

  if (isLoading || user) return null;

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <Bus className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
          <CardDescription>Join AI Safar to start booking</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Ravi Kumar" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                minLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (Min 6 chars)</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={6}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" form="register-form" className="w-full" disabled={registerUser.isPending}>
            {registerUser.isPending ? "Creating account..." : "Sign Up"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login">
              <a className="font-medium text-primary hover:underline">Log in</a>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
