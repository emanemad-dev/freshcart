// Cart Types
import { Product } from '@/features/products/types/product.types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  products: Array<{
    count: number;
    price: number;
    product: Product;
  }>;
  totalCartPrice: number;
  _id?: string;
}

