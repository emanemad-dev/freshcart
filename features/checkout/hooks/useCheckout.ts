// Checkout Hook
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ordersService, ShippingAddress } from '@/features/orders/api/orders.service';
import { useCartStore } from '@/features/cart/store/cart.store';
import { useAuthStore } from '@/features/auth/store/auth.store';

export interface CheckoutFormData {
  city: string;
  street: string;
  phone: string;
  paymentMethod: 'cash' | 'card';
}

export const useCheckout = () => {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const token = useAuthStore((state) => state.token);

  // Create Cash Order Mutation
  const createCashOrderMutation = useMutation({
    mutationFn: ({ cartId, shippingAddress }: { cartId: string; shippingAddress: ShippingAddress }) =>
      ordersService.createCashOrder(cartId, shippingAddress),
    onSuccess: () => {
      // Clear cart after successful order
      clearCart();
      // Navigate to orders page
      router.push('/orders');
    },
    onError: (error) => {
      console.error('Error creating cash order:', error);
    },
  });

  // Create Checkout Session (for online payment)
  const createCheckoutSessionMutation = useMutation({
    mutationFn: ({ cartId, url, shippingAddress }: { cartId: string; url: string; shippingAddress: ShippingAddress }) =>
      ordersService.createCheckoutSession(cartId, url, shippingAddress),
    onSuccess: (data) => {
      // Redirect to payment URL
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error('Error creating checkout session:', error);
    },
  });

  // Helper function to create order based on payment method
  const createOrder = async (formData: CheckoutFormData, cartId: string) => {
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const shippingAddress: ShippingAddress = {
      details: formData.street,
      phone: formData.phone,
      city: formData.city,
    };

    if (formData.paymentMethod === 'cash') {
      await createCashOrderMutation.mutateAsync({ cartId, shippingAddress });
    } else {
      // For card payment, create checkout session
      const returnUrl = `${window.location.origin}/orders`;
      await createCheckoutSessionMutation.mutateAsync({ 
        cartId, 
        url: returnUrl, 
        shippingAddress 
      });
    }
  };

  return {
    createOrder,
    isLoading: createCashOrderMutation.isPending || createCheckoutSessionMutation.isPending,
    error: createCashOrderMutation.error || createCheckoutSessionMutation.error,
  };
};

