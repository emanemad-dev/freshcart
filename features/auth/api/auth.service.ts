import { axios } from '@/shared/lib/axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post('/api/v1/auth/signin', credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post('/api/v1/auth/signup', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await axios.post('/api/v1/auth/logout');
  },

  async getCurrentUser(): Promise<AuthResponse> {
    const response = await axios.get('/api/v1/auth/me');
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ statusMsg: string }> {
    const response = await axios.post('/api/v1/auth/forgotPasswords', { email });
    return response.data;
  },

  async verifyResetCode(resetCode: string): Promise<{ status: string }> {
    const response = await axios.post('/api/v1/auth/verifyResetCode', { resetCode });
    return response.data;
  },

  async resetPassword(email: string, newPassword: string): Promise<{ token: string }> {
    const response = await axios.post('/api/v1/auth/resetPassword', { email, newPassword });
    return response.data;
  },
};
