import { useNavigate } from "react-router";

export function ArticleCard({ article }) {
  const navigate = useNavigate();
  const excerpt = article.content.slice(0, 140).trimEnd() + "…";

  return (
    <article
      onClick={() => navigate(`/articles/${article.id}`)}
      className="border-2 border-foreground retro-shadow bg-card cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_oklch(0.145_0_0)] transition-all"
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover border-b-2 border-foreground"
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-retro font-bold text-base leading-snug">
          {article.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{excerpt}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="font-retro text-xs text-muted-foreground">
            @{article.author}
          </span>
          <span
            className="font-retro text-xs font-bold px-2 py-0.5 border-2 border-foreground"
            style={{ background: "var(--retro-accent)" }}
          >
            ▲ {article.score}
          </span>
        </div>
      </div>
    </article>
  );
}
