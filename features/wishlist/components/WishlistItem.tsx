// Wishlist Item Component
import Image from 'next/image';
import { WishlistItem as WishlistItemType } from '../types/wishlist.types';
import { Button } from '@/shared/components/ui/Button';

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export const WishlistItem = ({ item, onRemove, onAddToCart }: WishlistItemProps) => {
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
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button size="sm" onClick={() => onAddToCart?.(item.product.id)}>
          Add to Cart
        </Button>
        <Button variant="outline" size="sm" onClick={() => onRemove?.(item.product.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

