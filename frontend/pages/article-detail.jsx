import { useNavigate, useParams } from "react-router";
import { CommentCard } from "@/components/comment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle } from "@/hooks/use-article";

export function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: article, isLoading, isError } = useArticle(id);

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </main>
    );
  }

  if (isError || !article) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="border-2 border-destructive p-4 font-retro text-sm text-destructive retro-shadow">
          ERREUR 404 : article introuvable.
        </div>
      </main>
    );
  }

  const date = new Date(article.created_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="font-retro text-xs border-2 border-foreground px-3 py-1 mb-6 hover:retro-shadow transition-all inline-block"
      >
        ← RETOUR
      </button>

      <article className="flex flex-col gap-6">
        <header className="border-b-2 border-foreground pb-4">
          <h1 className="font-retro font-bold text-2xl leading-snug mb-3">
            {article.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-retro text-xs text-muted-foreground">
              @{article.author}
            </span>
            <span className="font-retro text-xs text-muted-foreground">
              {date}
            </span>
            <span
              className="font-retro text-xs font-bold px-2 py-0.5 border-2 border-foreground ml-auto"
              style={{ background: "var(--retro-accent)" }}
            >
              ▲ {article.score}
            </span>
          </div>
        </header>

        <img
          src={article.image}
          alt={article.title}
          className="w-full object-cover border-2 border-foreground retro-shadow"
          style={{ maxHeight: "400px" }}
        />

        <div className="prose prose-neutral max-w-none">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-sm leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </article>

      <section className="mt-10">
        <h2 className="font-retro font-bold text-lg border-b-2 border-foreground pb-2 mb-6">
          COMMENTAIRES ({article.comments.length})
        </h2>
        <div className="flex flex-col gap-4">
          {article.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </main>
  );
}
