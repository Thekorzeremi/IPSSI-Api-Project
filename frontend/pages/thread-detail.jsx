import { useNavigate, useParams } from "react-router";
import { CommentCard } from "@/components/comment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useThread } from "@/hooks/use-thread";

export function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: thread, isLoading, isError } = useThread(id);

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </main>
    );
  }

  if (isError || !thread) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="border-2 border-destructive p-4 font-retro text-sm text-destructive retro-shadow">
          ERREUR 404 : thread introuvable.
        </div>
      </main>
    );
  }

  const date = new Date(thread.created_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const messages = thread.messages.map((m) => ({
    ...m,
    author: m.author,
    created_at: m.created_at,
  }));

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="font-retro hover:cursor-pointer text-xs border-2 border-foreground px-3 py-1 mb-6 hover:retro-shadow transition-all inline-block"
      >
        ← RETOUR
      </button>

      <header className="border-b-2 border-foreground pb-4 mb-8">
        <h1 className="font-retro font-bold text-2xl leading-snug mb-3">
          {thread.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-retro text-xs text-muted-foreground">
            @{thread.author}
          </span>
          <span className="font-retro text-xs text-muted-foreground">{date}</span>
          <span className="font-retro text-xs text-muted-foreground border border-foreground px-1">
            {thread.messages.length} messages
          </span>
          <span
            className="font-retro text-xs font-bold px-2 py-0.5 border-2 border-foreground ml-auto"
            style={{ background: "var(--retro-accent)" }}
          >
            ▲ {thread.score}
          </span>
        </div>
      </header>

      <section>
        <h2 className="font-retro font-bold text-lg border-b-2 border-foreground pb-2 mb-6">
          MESSAGES ({thread.messages.length})
        </h2>
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <CommentCard key={message.id} comment={message} />
          ))}
        </div>
      </section>
    </main>
  );
}
