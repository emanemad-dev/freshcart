// Orders Hook
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../api/orders.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { OrderListParams, Order } from '../types/orders.types';

export const useOrders = (params?: OrderListParams) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { user, token } = useAuthStore.getState();
      console.log('Auth state:', { user, hasToken: !!token }); // DEBUG
      
      let userId = user?._id;
      if (!userId && token) {
        // Extract ID from JWT token if _id missing
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id;
          console.log('Extracted user ID from token:', userId);
        } catch (e) {
          console.error('Token decode error:', e);
        }
      }
      
      if (!userId) {
        console.error('No user ID found');
        throw new Error('No user ID available');
      }
      
      return ordersService.getUserOrders(userId);
    },
    select: (data) => {
      console.log('Orders API response:', data); // DEBUG
      // Handle both {orders: [], total: N} or flat [Order1, Order2]
      const orders = Array.isArray(data) ? data : (data.orders || data.data || []);
      return {
        orders,
        total: Array.isArray(data) ? orders.length : (data.total || data.results || 0),
      };
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersService.getOrderById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { items: any[]; total: number }) => ordersService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ordersService.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

