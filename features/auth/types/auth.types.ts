// Auth Types
export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  rePassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

