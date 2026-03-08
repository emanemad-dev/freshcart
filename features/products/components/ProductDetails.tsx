// Product Details Component
import Image from 'next/image';
import { Product } from '../types/product.types';
import { Button } from '@/shared/components/ui/Button';

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export const ProductDetails = ({ product, onAddToCart, onAddToWishlist }: ProductDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-96 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex gap-4">
          <Button onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </Button>
          <Button variant="outline" onClick={() => onAddToWishlist?.(product)}>
            Add to Wishlist
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          <p>Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  );
};

