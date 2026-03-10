// Cart Item Component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../types/cart.types';
import { Product } from '@/features/products/types/product.types';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

// Extended type to handle both local cart items and server cart items
interface ExtendedCartItem {
  id?: string;
  product: Product & { category?: { name: string } };
  quantity?: number;
  count?: number;
}

interface CartItemProps {
  item: ExtendedCartItem;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps): React.ReactElement => {
  // Handle both 'image' and 'imageCover' properties for compatibility
  const productImage = item.product.imageCover || item.product.image || null;
  // Handle both 'id' and '_id' properties
  const productId = item.product.id || item.product._id || item.id || '';
  // Handle both 'name' and 'title' properties
  const productName = item.product.name || item.product.title || 'Unnamed Product';
  // Handle both 'quantity' and 'count' properties
  const quantity = item.quantity || item.count || 1;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-28 w-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          {productImage ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link 
              href={`/products/${productId}`}
              className="font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2"
            >
              {productName}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {item.product.category?.name || 'Category'}
            </p>
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">
                {item.product.price * quantity} EGP
              </span>
              {item.product.priceAfterDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {item.product.priceAfterDiscount * quantity} EGP
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
              <button
                onClick={() => onUpdateQuantity?.(productId, Math.max(1, quantity - 1))}
                className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity?.(productId, quantity + 1)}
                className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove?.(productId)}
          className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove item"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

