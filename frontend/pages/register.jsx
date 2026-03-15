import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { authRegister } from "@/lib/api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => authRegister(username, email, password, false),
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
          <h1 className="font-retro font-bold text-2xl">REGISTER</h1>
          <p className="font-retro text-xs text-muted-foreground mt-1">
            {`// création de compte`}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel className="font-retro text-xs font-bold">USERNAME</FieldLabel>
            <Input
              type="text"
              placeholder="CoolAppleFan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>

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
            {isPending ? "CRÉATION..." : "CRÉER UN COMPTE →"}
          </button>
        </form>

        <p className="font-retro text-xs text-center text-muted-foreground">
          Déjà un compte ?{" "}
          <Link to="/login" className="underline font-bold">
            LOGIN
          </Link>
        </p>
      </div>
    </main>
  );
}
