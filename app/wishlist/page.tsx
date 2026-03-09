// Wishlist Page
'use client';

import Link from 'next/link';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { WishlistItem } from '@/features/wishlist/components/WishlistItem';
import { useCart } from '@/features/cart/hooks/useCart';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { add } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader 
          breadcrumbs={[{ label: 'Wishlist' }]}
          title="My Wishlist"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
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
        breadcrumbs={[{ label: 'Wishlist' }]}
        title="My Wishlist"
        description={`${items.length} items in your wishlist`}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={remove}
              onAddToCart={() => add(item.product)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

