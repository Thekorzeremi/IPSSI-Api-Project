import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { updateUserById } from "@/lib/api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ProfilePage() {
  const { user, token, login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
    setNewsletter(Boolean(user?.settings?.newsletter));
  }, [user]);

  const isDirty = useMemo(() => {
    if (!user) return false;
    return (
      username.trim() !== user.username ||
      email.trim().toLowerCase() !== user.email ||
      newsletter !== Boolean(user.settings?.newsletter)
    );
  }, [email, newsletter, user, username]);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: () =>
      updateUserById(
        user._id,
        {
          username: username.trim(),
          email: email.trim().toLowerCase(),
          settings: { newsletter },
        },
        token,
      ),
    onSuccess: (updatedUser) => {
      login({ token, user: updatedUser });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isDirty || !user || !token) return;
    mutate();
  }

  if (!user || !token) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="border-2 border-foreground retro-shadow p-8 flex flex-col gap-6">
          <header className="border-b-2 border-foreground pb-4">
            <h1 className="font-retro font-bold text-2xl">PROFILE</h1>
            <p className="font-retro text-xs text-muted-foreground mt-1">
              {`// connexion requise`}
            </p>
          </header>
          <p className="font-retro text-sm">
            Vous devez vous connecter pour voir ce profil.
          </p>
          <Link
            to="/login"
            className="inline-block mt-2 border-2 border-foreground py-2 px-4 font-retro font-bold text-sm retro-shadow-accent"
            style={{ background: "var(--retro-accent)" }}
          >
            ALLER AU LOGIN →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="border-2 border-foreground retro-shadow p-8 flex flex-col gap-6">
        <header className="border-b-2 border-foreground pb-4">
          <h1 className="font-retro font-bold text-2xl">PROFILE</h1>
          <p className="font-retro text-xs text-muted-foreground mt-1">
            {`// modifier votre compte`}
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
            <FieldLabel className="font-retro text-xs font-bold">USERNAME</FieldLabel>
            <Input
              type="text"
              placeholder="Votre username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel className="font-retro text-xs font-bold">REPUTATION</FieldLabel>
            <Input type="number" value={Number(user.reputation ?? 0)} readOnly disabled />
          </Field>

          <label className="font-retro text-xs font-bold flex items-center gap-2">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="h-4 w-4 accent-[var(--retro-accent)]"
            />
            NEWSLETTER
          </label>

          {error && (
            <FieldError errors={[error.message]} className="font-retro text-xs" />
          )}

          {isSuccess && !error && (
            <p className="font-retro text-xs text-green-700">Profil mis a jour.</p>
          )}

          <button
            type="submit"
            disabled={isPending || !isDirty}
            className="mt-2 border-2 border-foreground py-2 font-retro font-bold text-sm retro-shadow-accent hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
            style={{ background: "var(--retro-accent)" }}
          >
            {isPending ? "MISE A JOUR..." : "SAUVEGARDER →"}
          </button>
        </form>
      </div>
    </main>
  );
}
