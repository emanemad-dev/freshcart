// Axios Instance
import axiosLib from 'axios';

// Create axios instance
export const axiosInstance = axiosLib.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url || '';
    console.log('[Axios Request]', config.method?.toUpperCase(), url);
    
    // Auth routes go to external API (they don't need token, they create token)
    const isAuthRoute = url.includes('/auth/signin') || url.includes('/auth/signup') || url.includes('/auth/logout');
    
    // Cart, Orders, and Checkout routes go to external API (must check before general /api/ check)
    const isExternalRoute = url.includes('/api/v1/') || url.includes('/api/v2/');
    
    if (isAuthRoute) {
      // Auth routes go to external API directly
      config.baseURL = 'https://ecommerce.routemisr.com';
    } else if (isExternalRoute) {
      // Cart, Orders, and Checkout routes go to external API
      config.baseURL = 'https://ecommerce.routemisr.com';
    } else if (url.startsWith('/api/')) {
      // Local API routes (our proxy) - use relative URL
      config.baseURL = '';
    } else {
      // External API routes
      config.baseURL = 'https://ecommerce.routemisr.com';
    }

    // Check for token in localStorage (for non-auth routes)
    if (!isAuthRoute && typeof window !== 'undefined') {
      let token = localStorage.getItem('token');
      
      if (!token) {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          try {
            const parsed = JSON.parse(authStorage);
            token = parsed.state?.token || parsed.token;
          } catch (e) {
            console.error('Error parsing auth storage:', e);
          }
        }
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[Axios] Token added:', token.substring(0, 20) + '...');
      } else {
        console.log('[Axios] No token found');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[Axios Response]', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('[Axios Error]', error.message, error.config?.url);
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);

export const axios = axiosInstance;

