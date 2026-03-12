// Wishlist API Service
import { axios } from '@/shared/lib/axios';
import { WishlistItem } from '../types/wishlist.types';

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const response = await axios.get('/wishlist');
    return response.data.data;
  },

  async addToWishlist(productId: string): Promise<WishlistItem> {
    const response = await axios.post('/wishlist', { productId });
    return response.data.data;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await axios.delete(`/wishlist/${productId}`);
  },
};

