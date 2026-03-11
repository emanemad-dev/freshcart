// Login Form Component
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      console.log("Logging in with:", credentials);
      const response = await authService.login(credentials);
      console.log("Login response:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Login success, data:", data);
      setAuth(data.user, data.token);
      window.location.href = "/";
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      alert(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 focus:bg-white"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-lg" />
              ) : (
                <FaEye className="text-lg" />
              )}
            </div>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
              Keep me signed in
            </span>
          </label>

          {/* Demo Credentials Hint (optional) */}
          <div className="text-xs text-gray-400">
            Demo: test@test.com / 123456
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3.5 px-4 rounded-xl hover:from-green-700 hover:to-green-600 transition-all font-semibold text-base shadow-lg shadow-green-500/25 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none "
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Loading State Extra (optional) */}
      {loginMutation.isPending && (
        <p className="text-xs text-center text-gray-500 animate-pulse">
          Please wait while we sign you in...
        </p>
      )}
    </form>
  );
};
