// Cart Item Component
import Image from 'next/image';
import { CartItem as CartItemType } from '../types/cart.types';
import { Button } from '@/shared/components/ui/Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  // Handle both 'image' and 'imageCover' properties for compatibility
  const productImage = item.product.imageCover || item.product.image || null;
  // Handle both 'id' and '_id' properties
  const productId = item.product.id || item.product._id || '';
  // Handle both 'name' and 'title' properties
  const productName = item.product.name || item.product.title || 'Unnamed Product';

  if (!productImage) {
    return (
      <div className="flex gap-4 p-4 border-b">
        <div className="relative h-24 w-24 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{productName}</h3>
          <p className="text-gray-600">${item.product.price}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => onUpdateQuantity?.(productId, Math.max(1, item.quantity - 1))}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity?.(productId, item.quantity + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <p className="font-semibold">${item.product.price * item.quantity}</p>
          <Button variant="outline" size="sm" onClick={() => onRemove?.(productId)}>
            Remove
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 border-b">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={productImage}
          alt={productName}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{productName}</h3>
        <p className="text-gray-600">${item.product.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity?.(productId, Math.max(1, item.quantity - 1))}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity?.(productId, item.quantity + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold">${item.product.price * item.quantity}</p>
        <Button variant="outline" size="sm" onClick={() => onRemove?.(productId)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

