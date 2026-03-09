// Products Page
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useCart } from '@/features/cart/hooks/useCart';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { Loader } from '@/shared/components/ui/Loader';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { FaShoppingBag } from 'react-icons/fa';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useProducts({ search, categoryId: categoryId || undefined });
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  const title = categoryId ? 'Products' : 'All Products';

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
          { label: 'Home', href: '/' },
          { label: title }
        ]}
        title={title}
        description="Browse our collection of products"
        icon={<FaShoppingBag />}
      />
      <div className="container mx-auto px-4 py-8">
        {data?.data && (
          <>
            <p className="mb-4 text-gray-600">Showing {data.data.length} products</p>
            <ProductGrid
              products={data.data}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          </>
        )}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

