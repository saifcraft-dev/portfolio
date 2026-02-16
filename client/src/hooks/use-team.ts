import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertTeamMember, type UpdateTeamMemberRequest } from "@shared/routes";

export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch team");
      return api.team.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      const res = await fetch(api.team.create.path, {
        method: api.team.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add team member");
      return api.team.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.team.list.path] }),
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & UpdateTeamMemberRequest) => {
      const url = buildUrl(api.team.update.path, { id });
      const res = await fetch(url, {
        method: api.team.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update team member");
      return api.team.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.team.list.path] }),
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.team.delete.path, { id });
      const res = await fetch(url, { method: api.team.delete.method, credentials: "include" });
      if (!res.ok) throw new Error("Failed to remove team member");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.team.list.path] }),
  });
}
