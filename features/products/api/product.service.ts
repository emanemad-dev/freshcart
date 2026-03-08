// Product API Service
import { axios } from '@/shared/lib/axios';
import { Product, ProductListParams, ProductListResponse } from '../types/product.types';

console.log('Product Service Loaded');

export const productService = {
  async getProducts(params?: ProductListParams): Promise<ProductListResponse> {
    const response = await axios.get('/api/v1/products', { params });
    return response.data;
  },


  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`/api/v1/products/${id}`);
    return response.data.data;
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await axios.post('/api/v1/products', data);
    return response.data.data;
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await axios.put(`/api/v1/products/${id}`, data);
    return response.data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`/api/v1/products/${id}`);
  },
};

