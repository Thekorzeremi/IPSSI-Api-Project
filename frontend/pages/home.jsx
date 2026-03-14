import { useThreads } from "@/hooks/use-threads";
import { useArticles } from "@/hooks/use-articles";
import { useEffect } from "react";
import { ArticleCard } from "@/components/article-card";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { ThreadCard } from "@/components/thread-card";

function ThreadCardSkeleton() {
  return (
    <div className="border-2 border-foreground p-4 flex flex-col gap-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between mt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
}

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

export function HomePage() {
    const { data: articles, isLoading: articlesLoading, isError: articlesError } = useArticles();
    const { data: threads, isLoading: threadsLoading, isError: threadsError } = useThreads();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(articles)
    });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-2 mb-12">
            <h1 className="font-retro font-bold text-4xl tracking-tight text-center">
                BIENVENUE SUR IAP
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-retro text-center">
                {`// actu Apple & tech, discussions & entraide`}
            </p>
        </div>


        <header className="mb-8 border-b-2 border-foreground pb-4">
            <h1 className="font-retro font-bold text-3xl tracking-tight">
                NOS DERNIERS ARTICLES
            </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesLoading
            ? Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((key) => (
                <ArticleCardSkeleton key={key} />
            ))
            : articles?.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>

        <div className="flex items-center justify-end mt-4">
            <h3 onClick={() => navigate("/articles")} className="font-retro text-sm text-foreground cursor-pointer hover:underline">
                Voir tous les articles
            </h3>
        </div>

        <header className="my-8 border-b-2 border-foreground pb-4">
            <h1 className="font-retro font-bold text-3xl tracking-tight">
                LES DERNIERS THREADS
            </h1>
        </header>

        <div className="flex flex-col gap-4">
        {threadsLoading
            ? Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((key) => (
                <ThreadCardSkeleton key={key} />
            ))
            : threads?.slice(0, 3).map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
            ))}
        </div>

        <div className="flex items-center justify-end mt-4">
            <h3 onClick={() => navigate("/threads")} className="font-retro text-sm text-foreground cursor-pointer hover:underline">
                Voir tous les threads
            </h3>
        </div>
    </main>
  )
};