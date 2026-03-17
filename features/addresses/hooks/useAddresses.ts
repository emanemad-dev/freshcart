import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesService, CreateAddressData, type Address } from '../api/addresses.service';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const useAddresses = () => {
  // Use selector to directly access token - ensures it works even before persist rehydration
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesService.getAddresses(),
    enabled: !!token,
  });
};

export const useAddress = (id: string) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['address', id],
    queryFn: () => addressesService.getAddress(id),
    enabled: !!id && !!token,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAddressData) => addressesService.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateAddressData }) =>
      addressesService.updateAddress(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['addresses'] });

      // Snapshot previous value
      const previousAddresses = queryClient.getQueryData<{ data: Address[] }>(['addresses']);

      // Optimistically update
      queryClient.setQueryData<{ data: Address[] }>(['addresses'], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((addr) =>
            addr._id === id ? { ...addr, ...data } : addr
          ),
        };
      });

      // Return context for rollback
      return { previousAddresses };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousAddresses) {
        queryClient.setQueryData(['addresses'], context.previousAddresses);
      }
    },
    onSettled: () => {
      // Always refetch after
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => addressesService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

