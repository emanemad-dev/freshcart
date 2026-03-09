// Product API Service
import { axios } from '@/shared/lib/axios';
import { Product, ProductListParams, ProductListResponse } from '../types/product.types';

export const productService = {
  async getProducts(params?: ProductListParams): Promise<ProductListResponse> {
    // Filter out empty params
    const cleanParams: Record<string, string> = {};
    if (params?.search) {
      cleanParams.search = params.search;
    }
    
    const response = await axios.get('/api/v1/products', { params: cleanParams });
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

