import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/firebase/firestore";
import type { Order } from "@/types";

export function useOrders() {
  return useQuery({
    queryKey: ["/orders"],
    queryFn: () => ordersApi.getAll(),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Order, 'id'>) => ordersApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/orders"] }),
  });
}
