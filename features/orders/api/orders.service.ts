// Orders API Service
import { axios } from '@/shared/lib/axios';
import { Order, OrderListParams, OrderListResponse } from '../types/orders.types';

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export const ordersService = {
  async getOrders(params?: OrderListParams): Promise<OrderListResponse> {
    const response = await axios.get('/api/v1/orders', { params });
    return response.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await axios.get(`/api/v1/orders/${id}`);
    return response.data.data;
  },

  async createOrder(data: { items: any[]; total: number }): Promise<Order> {
    const response = await axios.post('/api/v1/orders', data);
    return response.data.data;
  },

  // Create Cash Order From Cart (v2)
  async createCashOrder(cartId: string, shippingAddress: ShippingAddress): Promise<Order> {
    const response = await axios.post(`/api/v2/orders/${cartId}`, {
      shippingAddress
    });
    return response.data.data;
  },

  // Create Checkout Session for online payment
  async createCheckoutSession(cartId: string, url: string, shippingAddress: ShippingAddress): Promise<{ url: string }> {
    const response = await axios.post(`/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress
    });
    return response.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await axios.put(`/api/v1/orders/${id}/status`, { status });
    return response.data.data;
  },

  async cancelOrder(id: string): Promise<void> {
    await axios.delete(`/api/v1/orders/${id}`);
  },
};

