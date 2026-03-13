import { useQuery } from "@tanstack/react-query";
import { mockThreads } from "@/lib/mock-data";

const fetchThread = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const thread = mockThreads.find((t) => t.id === id);
      if (thread) resolve(thread);
      else reject(new Error("Thread introuvable"));
    }, 300)
  );

export function useThread(id) {
  return useQuery({
    queryKey: ["thread", id],
    queryFn: () => fetchThread(id),
    enabled: !!id,
  });
}
