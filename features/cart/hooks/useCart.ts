// Cart Hook
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../store/cart.store';
import { cartService } from '../api/cart.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Product } from '@/features/products/types/product.types';
import { CartItem } from '../types/cart.types';
import { useState, useCallback } from 'react';

export const useCart = () => {
  const { items: localItems, addItem, removeItem, updateCount, clearCart, total: localTotal } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;
  const queryClient = useQueryClient();

  const { data: serverCart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: isAuthenticated && !!token,
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      setError('Failed to remove item');
      console.error('Remove error:', err);
    }
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ itemId, count }: { itemId: string; count: number }) =>
      cartService.updateCartItem(itemId, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      setError('Failed to update quantity');
      console.error('Update error:', err);
    }
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const getServerIds = useCallback((item: any) => ({
    cartId: serverCart?._id || '',
    productId: item.product?._id || item.product?.id || ''
  }), [serverCart]);

  const add = useCallback(async (product: Product, count: number = 1) => {
    const productId = product._id || product.id;
    if (!productId) {
      setError("Product ID not found");
      return;
    }

    addItem(product, count);

    if (isAuthenticated && token) {
      try {
        await addToCartMutation.mutateAsync({ productId, quantity: count });
      } catch (error) {
        setError("Failed to add to cart");
        console.error("Error adding to server cart:", error);
      }
    }
  }, [addItem, isAuthenticated, token, addToCartMutation, setError]);

const remove = useCallback(async (itemId: string) => {
  removeItem(itemId);

  if (isAuthenticated && token && serverCart) {
    try {
      const serverItem = serverCart.products?.find(
  (p: any) => p._id === itemId || p.product._id === itemId
);

      if (serverItem?._id) {
        await removeFromCartMutation.mutateAsync(serverItem.product._id);

        queryClient.setQueryData(['cart'], (old: any) => {
          if (!old) return old;

          return {
            ...old,
            products: old.products.filter((p: any) => p._id !== serverItem._id)
          };
        });

      }
    } catch (error) {
      setError("Failed to remove item");
      console.error(error);
    }
  }
}, [removeItem, isAuthenticated, token, serverCart]);

const update = useCallback(async (item: CartItem, count: number) => {
  const itemId = item.id || item._id || '';

  updateCount(itemId, count);

  if (isAuthenticated && token && serverCart && count > 0) {
    try {
      const serverItem = serverCart.products?.find(
        (p: any) => p.product._id === item.product._id
      );

      if (serverItem) {
        await updateCartMutation.mutateAsync({
          itemId: serverItem.product._id,
          count
        });

        queryClient.setQueryData(['cart'], (old: any) => {
          if (!old) return old;

          return {
            ...old,
            products: old.products.map((p: any) =>
              p.product._id === serverItem.product._id
                ? { ...p, count }
                : p
            )
          };
        });
      }
    } catch (error) {
      setError("Failed to update quantity");
    }
  }
}, [updateCount, isAuthenticated, token, serverCart]);

  const clear = useCallback(async () => {
    clearCart();
    
    if (isAuthenticated && token) {
      try {
        await clearCartMutation.mutateAsync();
      } catch (error) {
        console.error("Error clearing server cart:", error);
      }
    }
  }, [clearCart, isAuthenticated, token, clearCartMutation]);

  const isUsingServerCart = isAuthenticated && !!token && serverCart?.products && serverCart.products.length > 0;

  const mappedServerItems = serverCart?.products?.map((item: any) => ({
    id: item._id,
    product: { 
      ...item.product, 
      priceAfterDiscount: item.product.priceAfterDiscount || item.price 
    },
    count: item.count || 1,
    price: item.price || 0
  })) || [];

  const unifiedItems = isUsingServerCart ? mappedServerItems : localItems;
  
  const cartCount = unifiedItems.reduce((sum: number, item: CartItem) => sum + (item.count || 0), 0);
  const cartId = serverCart?._id || '';

  return {
    items: unifiedItems,
    total: isUsingServerCart ? (serverCart!.totalCartPrice || 0) : localTotal,
    cartCount,
    cartId,
    serverCart,
    isLoading: isAuthenticated && isLoading,
    error,
    loading: addToCartMutation.isPending || removeFromCartMutation.isPending || updateCartMutation.isPending || clearCartMutation.isPending,
    add,
    remove,
    update,
    clear,
  };
};

