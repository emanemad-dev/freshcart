import { axios } from '../../../shared/lib/axios';

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) {
    const response = await axios.post('/auth/signup', data);
    return response.data;
  },

  async login(data: {
    email: string;
    password: string;
  }) {
    const response = await axios.post('/auth/signin', data);
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axios.post('/auth/forgotPasswords', { email });
    return response.data;
  },

  async verifyResetCode(resetCode: string) {
    const response = await axios.post('/auth/verifyResetCode', { resetCode });
    return response.data;
  },

  async resetPassword(data: {
    email: string;
    newPassword: string;
  }) {
    const response = await axios.put('/auth/resetPassword', data);
    return response.data;
  },
};

