'use client';

import Link from 'next/link';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { WishlistItem } from '@/features/wishlist/components/WishlistItem';
import { useCart } from '@/features/cart/hooks/useCart';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { FaHeart, FaShoppingCart, FaArrowRight, FaTrashAlt } from 'react-icons/fa';

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const { add: addToCart } = useCart();

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clear();
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHeader 
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
          title="My Wishlist"
          icon={<FaHeart className="fill-current" />}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
              <FaHeart className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any items to your wishlist yet. Start shopping and save your favorite items!
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              Start Shopping
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
        title="My Wishlist"
        description={`${items.length} item${items.length !== 1 ? 's' : ''} in your wishlist`}
        icon={<FaHeart className="fill-current" />}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaHeart className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClearAll}
              className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <FaTrashAlt className="w-4 h-4" />
              Clear All
            </button>
            <Link 
              href="/products" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              Continue Shopping
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Wishlist Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Product</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Stock Status</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    onRemove={remove}
                    onAddToCart={addToCart}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <FaShoppingCart />
            Add more items to your wishlist
          </Link>
        </div>
      </div>
    </>
  );
}

