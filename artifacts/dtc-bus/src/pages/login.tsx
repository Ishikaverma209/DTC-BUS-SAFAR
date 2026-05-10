import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useLoginUser, useGetCurrentUser, getGetCurrentUserQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Train } from "lucide-react";
import { useLang } from "@/lib/language-context";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLang();

  const { data: user, isLoading } = useGetCurrentUser({
    query: { retry: false }
  });

  useEffect(() => {
    if (user && !isLoading) {
      toast.info(t("login.alreadyIn"));
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation, t]);

  const loginUser = useLoginUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser.mutate({ data: { email, password } }, {
      onSuccess: () => {
        toast.success(t("login.success"));
        queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
        setLocation("/dashboard");
      },
      onError: (err) => {
        toast.error(err.error || "Login failed");
      }
    });
  };

  if (isLoading || user) return null;

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-primary/5 to-rose-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Train className="h-7 w-7" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">AI Safar</p>
            <CardTitle className="text-2xl font-extrabold tracking-tight">{t("login.welcome")}</CardTitle>
          </div>
          <CardDescription>{t("login.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button type="submit" form="login-form" className="w-full h-11 text-base font-semibold" disabled={loginUser.isPending}>
            {loginUser.isPending ? t("login.loading") : t("login.btn")}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {t("login.noAccount")}{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              {t("login.signup")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
