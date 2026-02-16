import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "@/lib/firebase/firestore";
import type { Service } from "@/types";

export function useServices() {
  return useQuery({
    queryKey: ["/services"],
    queryFn: () => servicesApi.getAll(),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Service, 'id'>) => servicesApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/services"] }),
  });
}
