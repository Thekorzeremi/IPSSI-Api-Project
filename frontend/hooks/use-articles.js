import { useQuery } from "@tanstack/react-query";
import { mockArticles } from "@/lib/mock-data";

const fetchArticles = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockArticles), 400));

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
}
