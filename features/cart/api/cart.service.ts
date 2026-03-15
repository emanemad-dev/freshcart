// Cart API Service
import { axios } from '@/shared/lib/axios';
import { Cart, CartItem } from '../types/cart.types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v2/cart');
    return response.data.data;
  },

  async addToCart(productId: string, quantity: number): Promise<CartItem> {
    const response = await axios.post('https://ecommerce.routemisr.com/api/v2/cart', { productId, quantity });
    return response.data.data;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v2/cart/${itemId}`, { count: quantity });
    return response.data.data;
  },

  async removeFromCart(itemId: string): Promise<void> {
    await axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await axios.delete('https://ecommerce.routemisr.com/api/v2/cart');
  },
};

