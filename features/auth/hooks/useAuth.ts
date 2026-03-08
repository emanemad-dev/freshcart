// Auth Hook
import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../api/auth.service';
import { useAuthStore } from '../store/auth.store';
import { LoginCredentials, RegisterData } from '../types/auth.types';

export const useAuth = () => {
  const { setAuth, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false,
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    user: user?.user,
    isLoading,
    isAuthenticated: !!user?.user,
  };
};

