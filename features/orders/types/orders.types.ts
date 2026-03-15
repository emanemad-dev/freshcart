// Orders Types
import { CartItem } from '@/features/cart/types/cart.types';

export interface Order {
  _id: string;
  id?: string | number;
  cartItems: CartItem[];
  items?: CartItem[];
  totalOrderPrice: number;
  total?: number;
  taxPrice?: number;
  shippingPrice?: number;
  paymentMethodType?: string;
  isPaid: boolean;
  isDelivered: boolean;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

