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
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button size="sm" onClick={() => onAddToCart?.(productId)}>
            Add to Cart
          </Button>
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
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button size="sm" onClick={() => onAddToCart?.(productId)}>
          Add to Cart
        </Button>
        <Button variant="outline" size="sm" onClick={() => onRemove?.(productId)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

