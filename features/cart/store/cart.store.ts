// Cart Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '../types/cart.types';
import { Product } from '@/features/products/types/product.types';

interface CartState extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        // Use _id as the primary identifier, fallback to id
        const productId = product._id || product.id;
        const existingItem = items.find((item) => item.product._id === productId || item.product.id === productId);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.product._id === productId || item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems, total: get().getTotal() });
        } else {
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            product,
            quantity,
          };
          set({ items: [...items, newItem], total: get().getTotal() });
        }
      },

      removeItem: (productId) => {
        const items = get().items.filter((item) => item.product._id !== productId && item.product.id !== productId);
        set({ items, total: get().getTotal() });
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items.map((item) =>
          item.product._id === productId || item.product.id === productId ? { ...item, quantity } : item
        );
        set({ items, total: get().getTotal() });
      },

      clearCart: () => set({ items: [], total: 0 }),

      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

