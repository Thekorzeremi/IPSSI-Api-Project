import { useNavigate } from "react-router";

export function ThreadCard({ thread }) {
  const navigate = useNavigate();

  const lastActivity = new Date(thread.last_message_at).toLocaleDateString(
    "fr-FR",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <article
      onClick={() => navigate(`/threads/${thread.id}`)}
      className="border-2 border-foreground retro-shadow bg-card cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_oklch(0.145_0_0)] transition-all p-4 flex flex-col gap-3"
    >
      <h2 className="font-retro font-bold text-base leading-snug">
        {thread.title}
      </h2>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <span className="font-retro text-xs text-muted-foreground">
            @{thread.author}
          </span>
          <span className="font-retro text-xs text-muted-foreground border border-foreground px-1">
            {thread.messages.length} msg
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-retro text-xs text-muted-foreground">
            {lastActivity}
          </span>
          <span
            className="font-retro text-xs font-bold px-2 py-0.5 border-2 border-foreground"
            style={{ background: "var(--retro-accent)" }}
          >
            ▲ {thread.score}
          </span>
        </div>
      </div>
    </article>
  );
}
