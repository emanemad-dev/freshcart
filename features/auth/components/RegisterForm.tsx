// Register Form Component
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { authService } from '../api/auth.service';
import { useAuthStore } from '../store/auth.store';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string; rePassword: string }) =>
      authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.push('/');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== rePassword) {
      alert('Passwords do not match!');
      return;
    }
    
    registerMutation.mutate({ name, email, password, rePassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <Input
        type="password"
        placeholder="Confirm Password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

