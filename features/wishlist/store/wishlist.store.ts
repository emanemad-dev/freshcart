// Wishlist Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '../types/wishlist.types';
import { Product } from '@/features/products/types/product.types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        // Use _id as the primary identifier, fallback to id
        const productId = product._id || product.id;
        if (!items.find((item) => item.product._id === productId || item.product.id === productId)) {
          const newItem: WishlistItem = {
            id: crypto.randomUUID(),
            product,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId) => {
        const items = get().items.filter((item) => item.product._id !== productId && item.product.id !== productId);
        set({ items });
      },

      isInWishlist: (productId) => {
        return !!get().items.find((item) => item.product._id === productId || item.product.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

