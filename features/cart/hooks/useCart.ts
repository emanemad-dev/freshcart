// Cart Hook
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../store/cart.store';
import { cartService } from '../api/cart.service';
import { Product } from '@/features/products/types/product.types';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore();

  const { data: serverCart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: () => {
      // Optionally sync with server
    },
  });

  const add = (product: Product, quantity?: number) => {
    addItem(product, quantity);
  };

  const remove = (productId: string) => {
    removeItem(productId);
  };

  const update = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const clear = () => {
    clearCart();
  };

  return {
    items: items.length > 0 ? items : serverCart?.items || [],
    total: items.length > 0 ? total : serverCart?.total || 0,
    isLoading,
    add,
    remove,
    update,
    clear,
  };
};

