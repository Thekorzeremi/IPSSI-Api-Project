import { useQuery } from "@tanstack/react-query";
import { mockThreads } from "@/lib/mock-data";

const fetchThreads = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockThreads), 400));

export function useThreads() {
  return useQuery({
    queryKey: ["threads"],
    queryFn: fetchThreads,
  });
}
