// Login Form Component
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { authService } from '../api/auth.service';
import { useAuthStore } from '../store/auth.store';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      console.log('Logging in with:', credentials);
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      return response;
    },
    onSuccess: (data) => {
      console.log('Login success, data:', data);
      setAuth(data.user, data.token);
      window.location.href = '/';
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

