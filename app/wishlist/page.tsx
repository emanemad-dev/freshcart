// Wishlist Page
'use client';

import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { WishlistItem } from '@/features/wishlist/components/WishlistItem';
import { useCart } from '@/features/cart/hooks/useCart';

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { add } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <a href="/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({items.length} items)</h1>
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
  );
}

