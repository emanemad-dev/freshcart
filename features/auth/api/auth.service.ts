// Auth API Service
import { axios } from '@/shared/lib/axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post('/api/v1/auth/login', credentials);
    return response.data.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post('/api/v1/auth/signup', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await axios.post('/api/v1/auth/logout');
  },

  async getCurrentUser(): Promise<AuthResponse> {
    const response = await axios.get('/api/v1/auth/me');
    return response.data.data;
  },
};

