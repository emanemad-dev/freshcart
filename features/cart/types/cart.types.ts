import { Product } from '@/features/products/types/product.types';

export interface CartItem {
  id?: string;
  _id?: string;
  product: Product;
  count: number;
  price?: number; // Fallback for server cart items
}

export interface Cart {
  products: CartItem[];
  totalCartPrice: number;
  _id?: string;
}

