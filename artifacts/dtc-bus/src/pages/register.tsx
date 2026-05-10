import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useRegisterUser, useGetCurrentUser, getGetCurrentUserQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Train } from "lucide-react";
import { useLang } from "@/lib/language-context";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLang();

  const { data: user, isLoading } = useGetCurrentUser({
    query: { retry: false }
  });

  useEffect(() => {
    if (user && !isLoading) setLocation("/dashboard");
  }, [user, isLoading, setLocation]);

  const registerUser = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    registerUser.mutate({ data: { name, email, password } }, {
      onSuccess: () => {
        toast.success(t("reg.success"));
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">{t("reg.title")}</CardTitle>
          </div>
          <CardDescription>{t("reg.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("reg.name")}</Label>
              <Input
                id="name"
                placeholder={t("reg.namePh")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("reg.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("reg.emailPh")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("reg.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("reg.passwordPh")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button type="submit" form="register-form" className="w-full h-11 text-base font-semibold" disabled={registerUser.isPending}>
            {registerUser.isPending ? t("reg.loading") : t("reg.btn")}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {t("reg.haveAccount")}{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              {t("reg.login")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
