'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WishlistItem as WishlistItemType } from '../types/wishlist.types';
import { FaHeart, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove?: (productId: string) => void;
  onAddToCart?: (product: WishlistItemType['product']) => void;
}

export const WishlistItem = ({ item, onRemove, onAddToCart }: WishlistItemProps) => {
  const productImage = item.product.imageCover || item.product.image || null;
  const productId = item.product.id || item.product._id || '';
  const productName = item.product.name || item.product.title || 'Unnamed Product';
  const productPrice = item.product.price || 0;
  const productSlug = item.product.slug || productId;
  const categoryName = typeof item.product.category === 'string' ? item.product.category : item.product.category?.name || 'Uncategorized';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(item.product);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(productId);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Product Info */}
      <td className="py-4 px-4">
        <Link href={`/products/${productSlug}`} className="flex items-center gap-4">
          <div className="relative h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {productImage ? (
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
            {/* Heart Icon Indicator */}
            <div className="absolute top-1 left-1 bg-white rounded-full p-1">
              <FaHeart className="w-3 h-3 text-red-500 fill-current" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-green-600 transition-colors">
              {productName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {categoryName}
            </p>
          </div>
        </Link>
      </td>

      {/* Price */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {item.product.priceAfterDiscount ? (
            <>
              <span className="font-bold text-green-600">{item.product.priceAfterDiscount} EGP</span>
              <span className="text-sm text-gray-400 line-through">{productPrice} EGP</span>
            </>
          ) : (
            <span className="font-bold text-gray-800">{productPrice} EGP</span>
          )}
        </div>
      </td>

      {/* Stock Status */}
      <td className="py-4 px-4">
        {item.product.quantity && item.product.quantity > 0 ? (
          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-red-500 text-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Out of Stock
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <FaShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button 
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove from wishlist"
          >
            <FaTrashAlt className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

