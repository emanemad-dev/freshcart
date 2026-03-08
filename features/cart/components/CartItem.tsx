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
  return (
    <div className="flex gap-4 p-4 border-b">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity?.(item.product.id, Math.max(1, item.quantity - 1))}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity?.(item.product.id, item.quantity + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold">${item.product.price * item.quantity}</p>
        <Button variant="outline" size="sm" onClick={() => onRemove?.(item.product.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

