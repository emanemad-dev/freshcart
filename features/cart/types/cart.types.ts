// Cart Types
import { Product } from '@/features/products/types/product.types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

