export function CommentCard({ comment }) {
  const date = new Date(comment.created_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="border-l-4 pl-4 py-2"
      style={{ borderColor: "var(--retro-accent)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-retro text-xs font-bold">@{comment.author}</span>
        <div className="flex items-center gap-2">
          <span className="font-retro text-xs text-muted-foreground">{date}</span>
          <span className="font-retro text-xs font-bold border border-foreground px-1">
            ▲ {comment.score}
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed">{comment.content}</p>
    </div>
  );
}
