import { axios } from '@/shared/lib/axios';

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface CreateAddressData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export const addressesService = {
  async getAddresses(): Promise<{ data: Address[] }> {
    const response = await axios.get('/addresses');
    return response.data;
  },

  async getAddress(id: string): Promise<{ data: Address }> {
    const response = await axios.get(`/addresses/${id}`);
    return response.data;
  },

  async createAddress(data: CreateAddressData): Promise<{ data: Address }> {
    const response = await axios.post('/addresses', data);
    return response.data;
  },

  async updateAddress(id: string, data: CreateAddressData): Promise<{ data: Address }> {
    const response = await axios.put(`/addresses/${id}`, data);
    return response.data;
  },

  async deleteAddress(id: string): Promise<{ message: string }> {
    const response = await axios.delete(`/addresses/${id}`);
    return response.data;
  },
};

