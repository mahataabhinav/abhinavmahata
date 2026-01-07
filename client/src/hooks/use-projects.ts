import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/api";

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}

import { getProject } from "@/lib/api";

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
}
