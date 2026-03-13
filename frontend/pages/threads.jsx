import { ThreadCard } from "@/components/thread-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useThreads } from "@/hooks/use-threads";

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

export function ThreadsPage() {
  const { data: threads, isLoading, isError } = useThreads();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8 border-b-2 border-foreground pb-4">
        <h1 className="font-retro font-bold text-3xl tracking-tight">
          THREADS
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-retro">
          {`// discussions & entraide`}
        </p>
      </header>

      {isError && (
        <div className="border-2 border-destructive p-4 font-retro text-sm text-destructive retro-shadow">
          ERREUR : impossible de charger les threads.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((key) => (
              <ThreadCardSkeleton key={key} />
            ))
          : threads?.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
      </div>
    </main>
  );
}
