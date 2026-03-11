// Cart Hook
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../store/cart.store';
import { cartService } from '../api/cart.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Product } from '@/features/products/types/product.types';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore();
  // Use selector to directly access token - ensures it works even before persist rehydration
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;
  const queryClient = useQueryClient();

  // Only fetch server cart if user is logged in
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
    mutationFn: (productId: string) => cartService.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartService.updateCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const add = async (product: Product, quantity: number = 1) => {
    const productId = product._id || product.id;
    if (!productId) {
      console.error("Product ID not found");
      return;
    }

    // Always add to local store first (for both logged in and guest users)
    addItem(product, quantity);

    // If user is logged in, also sync with server
    if (isAuthenticated && token) {
      try {
        await addToCartMutation.mutateAsync({ productId, quantity });
      } catch (error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status !== 401) {
          console.error("Error adding to server cart:", error);
        }
      }
    }
  };

  const remove = async (productId: string) => {
    // Always remove from local store
    removeItem(productId);

    // If user is logged in, also remove from server
    if (isAuthenticated && token) {
      try {
        await removeFromCartMutation.mutateAsync(productId);
      } catch (error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status !== 401) {
          console.error("Error removing from server cart:", error);
        }
      }
    }
  };

  const update = async (productId: string, quantity: number) => {
    // Always update local store
    updateQuantity(productId, quantity);

    // If user is logged in, also update server
    if (isAuthenticated && token) {
      try {
        await updateCartMutation.mutateAsync({ productId, quantity });
      } catch (error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status !== 401) {
          console.error("Error updating server cart:", error);
        }
      }
    }
  };

  const clear = async () => {
    // Always clear local store
    clearCart();

    // If user is logged in, also clear server cart
    if (isAuthenticated && token) {
      try {
        await clearCartMutation.mutateAsync();
      } catch (error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status !== 401) {
          console.error("Error clearing server cart:", error);
        }
      }
    }
  };

  // Determine which cart to use based on authentication status
  const isUsingServerCart = isAuthenticated && !!token && serverCart?.products && serverCart.products.length > 0;
  
  // Get cart items and total
  const cartItems = isUsingServerCart ? serverCart!.products : items;
  const cartTotal = isUsingServerCart ? serverCart!.totalCartPrice : total;
  
  // Calculate cart count
  const cartCount = isUsingServerCart 
    ? serverCart!.products.reduce((sum: number, item: { count: number }) => sum + item.count, 0)
    : items.reduce((sum, item) => sum + item.quantity, 0);

  // Get cart ID from server cart
  const cartId = serverCart?._id;
  
  console.log('Server Cart:', serverCart);
  console.log('Cart ID:', cartId);

  return {
    items: cartItems,
    total: cartTotal,
    cartCount,
    cartId,
    serverCart,
    isLoading: isAuthenticated && isLoading,
    add,
    remove,
    update,
    clear,
  };
};

