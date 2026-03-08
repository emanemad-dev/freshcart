// Routes Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CATEGORIES: '/categories',
  BRANDS: '/brands',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
  PROFILE: '/profile',
} as const;

