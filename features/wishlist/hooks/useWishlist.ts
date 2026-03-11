// Wishlist Hook
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWishlistStore } from '../store/wishlist.store';
import { wishlistService } from '../api/wishlist.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Product } from '@/features/products/types/product.types';

export const useWishlist = () => {
  const { items, addItem, removeItem, clearWishlist, isInWishlist } = useWishlistStore();
  // Use selector to directly access token - ensures it works even before persist rehydration
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;
  const queryClient = useQueryClient();

  const { data: serverWishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistService.getWishlist,
    enabled: isAuthenticated && !!token,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const add = (product: Product) => {
    addItem(product);
    if (isAuthenticated && token) {
      const productId = product._id || product.id || '';
      addToWishlistMutation.mutate(productId);
    }
  };

  const remove = (productId: string) => {
    removeItem(productId);
    if (isAuthenticated && token) {
      removeFromWishlistMutation.mutate(productId);
    }
  };

  const clear = () => {
    clearWishlist();
  };

  const toggle = (product: Product) => {
    const productId = product._id || product.id || '';
    if (isInWishlist(productId)) {
      remove(productId);
    } else {
      add(product);
    }
  };

  return {
    items: items.length > 0 ? items : serverWishlist || [],
    isLoading,
    add,
    remove,
    clear,
    toggle,
    isInWishlist,
  };
};

