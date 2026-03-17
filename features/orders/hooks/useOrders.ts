// Orders Hook
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../api/orders.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { OrderListParams, Order } from '../types/orders.types';

export const useOrders = (params?: OrderListParams) => {
  const { user, token } = useAuthStore.getState();
  
  // التحقق من وجود userId
  let userId = user?._id;
  if (!userId && token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id;
    } catch (e) {
      console.error('Token decode error:', e);
    }
  }

  return useQuery({
    queryKey: ['orders', userId], // إضافة userId للـ queryKey
    queryFn: async () => {
      // لو مفيش userId، ارجع مصفوفة فاضية
      if (!userId) {
        console.log('No user ID found, returning empty orders');
        return { orders: [] };
      }
      
      try {
        const data = await ordersService.getUserOrders(userId);
        return data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        return { orders: [] }; // في حالة الخطأ ارجع مصفوفة فاضية
      }
    },
    enabled: true, // دايماً enabled عشان نقدر نرجع مصفوفة فاضية
    select: (data) => {
      console.log('Orders API response:', data);
      // Handle both {orders: [], total: N} or flat [Order1, Order2]
      const orders = Array.isArray(data) ? data : (data.orders || data.data || []);
      return {
        orders,
        total: Array.isArray(data) ? orders.length : (data.total || data.results || 0),
      };
    },
  });
};

// باقي الـ hooks زي ماهي
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