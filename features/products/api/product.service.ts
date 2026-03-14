// Product API Service
import { axios } from '@/shared/lib/axios';
import { Product, ProductListParams, ProductListResponse } from '../types/product.types';

export const productService = {
  async getProducts(params?: ProductListParams): Promise<ProductListResponse> {
    const cleanParams: Record<string, string> = {};
    if (params?.search) cleanParams.search = params.search;
    if (params?.categoryId) cleanParams.category = params.categoryId;
    if (params?.subcategoryId) cleanParams['category[in]'] = params.subcategoryId;
    if (params?.brandId) cleanParams.brand = params.brandId;
    
    const response = await axios.get('/products', { params: cleanParams });
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`/products/${id}`);
    return response.data.data;
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await axios.post('/products', data);
    return response.data.data;
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await axios.put(`/products/${id}`, data);
    return response.data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`/products/${id}`);
  },
};

