import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesService, CreateAddressData } from '../api/addresses.service';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const useAddresses = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesService.getAddresses(),
    enabled: isAuthenticated,
  });
};

export const useAddress = (id: string) => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['address', id],
    queryFn: () => addressesService.getAddress(id),
    enabled: !!id && isAuthenticated,
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
    onSuccess: () => {
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

