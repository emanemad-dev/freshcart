'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/hooks/useCart';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { ShippingForm, PaymentMethod, OrderSummary } from '@/features/checkout/components';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, total, cartCount } = useCart();
  
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    phone: '',
    paymentMethod: 'cash' as 'cash' | 'card',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isReady, setIsReady] = useState(false);

  // Handle redirects after component mounts to avoid React render error
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    
    setIsReady(true);
  }, [isAuthenticated, items.length, router]);

  if (!isReady) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.city || formData.city.length < 2) {
      newErrors.city = 'City name must be at least 2 characters';
    }
    if (!formData.street || formData.street.length < 10) {
      newErrors.street = 'Address details must be at least 10 characters';
    }
    if (!formData.phone || !/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Egyptian phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Order submitted:', { ...formData, items, total });
      alert('Order placed successfully!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange = (method: 'cash' | 'card') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  return (
    <>
      <PageHeader 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' }
        ]}
        title="Complete Your Order"
        icon={<FaShoppingCart />}
      />

      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/cart" 
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <FaArrowLeft />
          Back to Cart
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              <ShippingForm 
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
              
              <PaymentMethod 
                paymentMethod={formData.paymentMethod}
                onChange={handlePaymentChange}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <OrderSummary 
                items={items}
                total={total}
                cartCount={cartCount}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

