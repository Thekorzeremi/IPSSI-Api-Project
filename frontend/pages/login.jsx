import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { authLogin } from "@/lib/api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => authLogin(email, password),
    onSuccess: (data) => {
      login(data);
      navigate("/");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate();
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="border-2 border-foreground retro-shadow p-8 flex flex-col gap-6">
        <header className="border-b-2 border-foreground pb-4">
          <h1 className="font-retro font-bold text-2xl">LOGIN</h1>
          <p className="font-retro text-xs text-muted-foreground mt-1">
            {`// connexion à votre compte`}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel className="font-retro text-xs font-bold">EMAIL</FieldLabel>
            <Input
              type="email"
              placeholder="vous@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel className="font-retro text-xs font-bold">MOT DE PASSE</FieldLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          {error && (
            <FieldError errors={[error.message]} className="font-retro text-xs" />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 border-2 border-foreground py-2 font-retro font-bold text-sm retro-shadow-accent hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
            style={{ background: "var(--retro-accent)" }}
          >
            {isPending ? "CONNEXION..." : "SE CONNECTER →"}
          </button>
        </form>

        <p className="font-retro text-xs text-center text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/register" className="underline font-bold">
            REGISTER
          </Link>
        </p>
      </div>
    </main>
  );
}
