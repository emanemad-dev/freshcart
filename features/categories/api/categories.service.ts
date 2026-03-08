// Categories API Service
import { axios } from '@/shared/lib/axios';
import { Category } from '../types/categories.types';

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const response = await axios.get('/api/v1/categories');
    return response.data.data;
  },

  async getCategoryById(id: string): Promise<Category> {
    const response = await axios.get(`/api/v1/categories/${id}`);
    return response.data.data;
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const response = await axios.post('/api/v1/categories', data);
    return response.data.data;
  },

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const response = await axios.put(`/api/v1/categories/${id}`, data);
    return response.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await axios.delete(`/api/v1/categories/${id}`);
  },
};

