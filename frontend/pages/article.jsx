import { ArticleCard } from "@/components/article-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/use-articles";

function ArticleCardSkeleton() {
  return (
    <div className="border-2 border-foreground">
      <Skeleton className="w-full h-48" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between mt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { data: articles, isLoading, isError } = useArticles();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8 border-b-2 border-foreground pb-4">
        <h1 className="font-retro font-bold text-3xl tracking-tight">
          TOUS NOS ARTICLES
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-retro">
          {`// actu Apple & tech`}
        </p>
      </header>

      {isError && (
        <div className="border-2 border-destructive p-4 font-retro text-sm text-destructive retro-shadow">
          ERREUR : impossible de charger les articles.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((key) => (
              <ArticleCardSkeleton key={key} />
            ))
          : articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>
    </main>
  );
}
