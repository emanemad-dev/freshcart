// Cart Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '../types/cart.types';
import { Product } from '@/features/products/types/product.types';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product, count?: number) => void;
  removeItem: (itemId: string) => void;
  updateCount: (itemId: string, count: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, count = 1) => {
        const items = get().items;
        const productId = product._id || product.id;
        const existingItem = items.find((item) => (item.product._id || item.product.id) === productId);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            (item.product._id || item.product.id) === productId
              ? { ...item, count: item.count + count }
              : item
          );
          set({ items: updatedItems, total: get().getTotal() });
        } else {
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            product,
            count,
          };
          set({ items: [...items, newItem], total: get().getTotal() });
        }
      },

      removeItem: (itemId: string) => {
        const items = get().items.filter((item) => (item.id || item._id) !== itemId);
        set({ items, total: get().getTotal() });
      },

      updateCount: (itemId: string, count: number) => {
        if (count === 0) {
          return get().removeItem(itemId);
        }
        const items = get().items.map((item) =>
          (item.id || item._id) === itemId ? { ...item, count } : item
        ).filter(item => item.count && item.count > 0);
        set({ items, total: get().getTotal() });
      },

      clearCart: () => set({ items: [], total: 0 }),

      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const price = item.product.priceAfterDiscount || item.product.price || 0;
          return total + price * (item.count || 0);
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

