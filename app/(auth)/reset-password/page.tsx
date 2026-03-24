"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { authService } from "@/features/auth/api/auth.service";
import {
  FaGoogle,
  FaFacebook,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";
import {
  RiLeafFill,
  RiTruckFill,
  RiShieldCheckFill,
  RiSparklingFill,
} from "react-icons/ri";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const email = decodeURIComponent(emailParam.replace(/\\\$/g, "$")) || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword({ email, newPassword });
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to reset password. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-emerald-50 items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-green-100 text-center backdrop-blur-sm">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaCheckCircle className="text-5xl text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Password Reset Success! 🔓
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your password has been successfully updated.
          </p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg shadow-emerald-300/50 text-lg"
          >
            Sign In with New Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-float">
          <span className="text-6xl">🥬</span>
        </div>
        <div
          className="absolute top-40 right-20 w-14 h-14 opacity-15 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="text-5xl">🍊</span>
        </div>
        <div
          className="absolute bottom-32 left-1/4 w-12 h-12 opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">🍎</span>
        </div>
        <div
          className="absolute top-1/3 right-1/3 w-14 h-14 opacity-15 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <span className="text-5xl">🥕</span>
        </div>
        <div
          className="absolute bottom-20 right-1/4 w-16 h-16 opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <span className="text-6xl">🍇</span>
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-3 h-3 bg-green-300 rounded-full"></div>
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-emerald-300 rounded-full"></div>
          <div className="absolute top-16 right-1/4 w-4 h-4 bg-green-200 rounded-full"></div>
          <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-emerald-200 rounded-full"></div>
          <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-green-300 rounded-full"></div>
        </div>
      </div>

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 bg-white/50 backdrop-blur-sm">
        <div className="absolute top-8 left-8 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <RiSparklingFill className="text-purple-500" />
          New Password Setup
        </div>

        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-xl mx-auto">
          <div className="mb-8 relative">
            <div className="w-48 h-48 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full flex items-center justify-center shadow-xl shadow-purple-300/50 relative">
              <span className="text-8xl">🔐</span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-2xl shadow-md">
                ⭐
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-emerald-300 rounded-full flex items-center justify-center text-3xl shadow-md">
                💖
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            New Password
            <span className="text-3xl ml-1">✨</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 font-medium">
            Create a strong new password for your account to keep it secure.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8 w-full">
            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <FaLock className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Strong Password</h3>
                <p className="text-sm text-gray-500">
                  8+ characters with symbols
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <RiShieldCheckFill className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Storage</h3>
                <p className="text-sm text-gray-500">Encrypted & protected</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <FaCheckCircle className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Instant Access</h3>
                <p className="text-sm text-gray-500">Login immediately after</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 max-w-md shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-purple-300">
                <img
                  src="https://www.loremfaces.net/96/id/5.jpg"
                  alt="Customer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-gray-900 font-bold block">
                  Emma Davis
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 italic text-sm leading-relaxed">
              "Password reset was super smooth! New password works perfectly
              now! 👍"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-purple-100 relative overflow-hidden">
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300"></div>

            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-500 text-sm">🔐</span>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-500 text-sm">✨</span>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-300/50 transform -rotate-6">
                <FaLock className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Create New Password
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                For account: <span className="font-semibold">{email}</span>
              </p>
              <p className="text-xs text-gray-400">
                Make it strong and memorable
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock className="text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password (8+ chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 text-lg transition-all hover:bg-white hover:border-purple-200"
                  required
                  minLength={8}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-purple-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock className="text-lg" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 text-lg transition-all hover:bg-white hover:border-purple-200"
                  required
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-purple-500 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span>8+ characters minimum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span>1 uppercase, 1 number, 1 symbol recommended</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  isLoading ||
                  newPassword !== confirmPassword ||
                  newPassword.length < 8
                }
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-300/50 hover:shadow-purple-300/70 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <FaLock className="text-lg" />
                    <span>Set New Password</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-gray-100 text-sm">
              <Link
                href="/login"
                className="text-green-500 font-semibold hover:text-green-600"
              >
                Back to Login
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-1 text-gray-500">
                <FaShieldAlt className="text-purple-500 text-sm" />
                <span>Secure Reset</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaStar className="text-yellow-400 text-sm" />
                <span>Instant Login</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-gray-500 text-sm hover:text-purple-500 transition-colors flex items-center justify-center gap-1"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
