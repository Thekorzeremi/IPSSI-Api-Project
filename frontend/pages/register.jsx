import { Link } from "react-router";

export function RegisterPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="border-2 border-foreground retro-shadow p-8 flex flex-col gap-6">
        <header className="border-b-2 border-foreground pb-4">
          <h1 className="font-retro font-bold text-2xl">REGISTER</h1>
          <p className="font-retro text-xs text-muted-foreground mt-1">
            {`// création de compte`}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label className="font-retro text-xs font-bold">USERNAME</label>
            <input
              type="text"
              placeholder="CoolAppleFan"
              className="border-2 border-foreground px-3 py-2 text-sm font-retro bg-background focus:outline-none focus:border-[var(--retro-accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-retro text-xs font-bold">EMAIL</label>
            <input
              type="email"
              placeholder="vous@example.com"
              className="border-2 border-foreground px-3 py-2 text-sm font-retro bg-background focus:outline-none focus:border-[var(--retro-accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-retro text-xs font-bold">MOT DE PASSE</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border-2 border-foreground px-3 py-2 text-sm font-retro bg-background focus:outline-none focus:border-[var(--retro-accent)] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 border-2 border-foreground py-2 font-retro font-bold text-sm retro-shadow-accent hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            style={{ background: "var(--retro-accent)" }}
          >
            CRÉER UN COMPTE →
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
