// Cart Page
'use client';

import Link from 'next/link';
import { useCart } from '@/features/cart/hooks/useCart';
import { CartItem } from '@/features/cart/components/CartItem';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartPage() {
  const { items, total, remove, update, clear } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader 
          breadcrumbs={[
            { label: 'Cart' }
          ]}
          title="Shopping Cart"
          icon={<FaShoppingCart />}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/products" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        breadcrumbs={[
          { label: 'Cart' }
        ]}
        title="Shopping Cart"
        icon={<FaShoppingCart />}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={update}
                onRemove={remove}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

