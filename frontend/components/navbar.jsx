import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="border-b-2 border-foreground bg-background sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-retro font-bold text-lg tracking-tight hover:text-[var(--retro-accent)] transition-colors"
          style={{ textShadow: "1px 1px 0 oklch(0.145 0 0)" }}
        >
          [IAP]
        </Link>
        <div className="flex gap-1">
          <Link
            to="/"
            className="font-retro text-sm px-3 py-1 border-2 border-transparent hover:border-foreground hover:retro-shadow transition-all"
          >
            HOME
          </Link>
          <Link
            to="/login"
            className="font-retro text-sm px-3 py-1 border-2 border-transparent hover:border-foreground hover:retro-shadow transition-all"
          >
            LOGIN
          </Link>
          <Link
            to="/register"
            className="font-retro text-sm px-3 py-1 border-2 border-foreground retro-shadow bg-[var(--retro-accent)] text-foreground font-bold"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </nav>
  );
}
