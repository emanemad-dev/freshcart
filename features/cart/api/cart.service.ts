// Cart API Service
import { axios } from '@/shared/lib/axios';
import { Cart, CartItem } from '../types/cart.types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await axios.get('/api/v1/cart');
    return response.data.data;
  },

  async addToCart(productId: string, quantity: number): Promise<CartItem> {
    const response = await axios.post('/api/v1/cart', { productId, quantity });
    return response.data.data;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    const response = await axios.put(`/api/v1/cart/${itemId}`, { quantity });
    return response.data.data;
  },

  async removeFromCart(itemId: string): Promise<void> {
    await axios.delete(`/api/v1/cart/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await axios.delete('/api/v1/cart');
  },
};

