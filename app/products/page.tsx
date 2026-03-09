// Products Page
'use client';

import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useCart } from '@/features/cart/hooks/useCart';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { Loader } from '@/shared/components/ui/Loader';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useProducts({ search });
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        breadcrumbs={[
          { label: 'Products' }
        ]}
        title="All Products"
        description="Browse our collection of products"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {data?.data && (
          <ProductGrid
            products={data.data}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
          />
        )}
      </div>
    </>
  );
}

