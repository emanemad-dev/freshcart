// Wishlist Types
import { Product } from '@/features/products/types/product.types';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

