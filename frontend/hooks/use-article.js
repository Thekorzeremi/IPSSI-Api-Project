import { useQuery } from "@tanstack/react-query";
import { mockArticles } from "@/lib/mock-data";

const fetchArticle = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const article = mockArticles.find((a) => a.id === id);
      if (article) resolve(article);
      else reject(new Error("Article introuvable"));
    }, 300)
  );

export function useArticle(id) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });
}
