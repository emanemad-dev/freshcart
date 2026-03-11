// Auth Hook
import { useMutation } from '@tanstack/react-query';
import { authService, UpdateUserData, ChangePasswordData } from '../api/auth.service';
import { useAuthStore } from '../store/auth.store';
import { LoginCredentials, RegisterData } from '../types/auth.types';

export const useAuth = () => {
  const { setAuth, logout, user, isAuthenticated } = useAuthStore();

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

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateUserData) => authService.updateMe(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token || '');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordData) => authService.changeMyPassword(data),
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    logout,
    user,
    isAuthenticated,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};

