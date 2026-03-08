// Product Detail Page
'use client';

import { useParams } from 'next/navigation';
import { useProduct } from '@/features/products/hooks/useProducts';
import { ProductDetails } from '@/features/products/components/ProductDetails';
import { useCart } from '@/features/cart/hooks/useCart';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { Loader } from '@/shared/components/ui/Loader';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: product, isLoading } = useProduct(id);
  const { add: addToCart } = useCart();
  const { add: addToWishlist, isInWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails
        product={product}
        onAddToCart={addToCart}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
}

