// Wishlist Hook
import { useMutation, useQuery } from '@tanstack/react-query';
import { useWishlistStore } from '../store/wishlist.store';
import { wishlistService } from '../api/wishlist.service';
import { Product } from '@/features/products/types/product.types';

export const useWishlist = () => {
  const { items, addItem, removeItem, isInWishlist } = useWishlistStore();

  const { data: serverWishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistService.getWishlist,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
  });

  const add = (product: Product) => {
    addItem(product);
  };

  const remove = (productId: string) => {
    removeItem(productId);
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
    toggle,
    isInWishlist,
  };
};

