// Brands API Service
import { axios } from '@/shared/lib/axios';
import { Brand } from '../types/brands.types';

export const brandsService = {
  async getBrands(): Promise<Brand[]> {
    const response = await axios.get('/api/v1/brands');
    return response.data.data;
  },

  async getBrandById(id: string): Promise<Brand> {
    const response = await axios.get(`/api/v1/brands/${id}`);
    return response.data.data;
  },
};

