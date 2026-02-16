import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "@/lib/firebase/firestore";
import type { TeamMember } from "@/types";

export function useTeam() {
  return useQuery({
    queryKey: ["/team"],
    queryFn: () => teamApi.getAll(),
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<TeamMember, 'id'>) => teamApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/team"] }),
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<TeamMember>) => teamApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/team"] }),
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teamApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/team"] }),
  });
}
