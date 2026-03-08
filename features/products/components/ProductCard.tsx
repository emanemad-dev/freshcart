// Product Card Component
import Image from 'next/image';
import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onAddToWishlist }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onAddToWishlist?.(product)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ❤️
          </button>
          <button
            onClick={() => onAddToCart?.(product)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};

