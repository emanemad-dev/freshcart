"use client";

import Link from 'next/link';
import { useState } from 'react';
import {
  FaGoogle,
  FaFacebook,
  FaLock,
  FaEnvelope,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaEye,
  FaEyeSlash,
  FaUser,
} from 'react-icons/fa';
import {
  RiLeafFill,
  RiTruckFill,
  RiShieldCheckFill,
  RiSparklingFill,
} from 'react-icons/ri';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Fruits/Vegetables */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-float">
          <span className="text-6xl">🥬</span>
        </div>
        <div className="absolute top-40 right-20 w-14 h-14 opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="text-5xl">🍊</span>
        </div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-4xl">🍎</span>
        </div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
          <span className="text-5xl">🥕</span>
        </div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <span className="text-6xl">🍇</span>
        </div>
        
        {/* Cute Dots Pattern */}
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
        {/* Cute Header Badge */}
        <div className="absolute top-8 left-8 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <RiSparklingFill className="text-yellow-500" />
          Forgot Password Help
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-xl mx-auto">
          {/* Cute Mascot */}
          <div className="mb-8 relative">
            <div className="w-48 h-48 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-300/50 relative">
              <span className="text-8xl">🔑</span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-2xl shadow-md">
                ⭐
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center text-3xl shadow-md">
                💖
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            No Problem!
            <span className="text-3xl ml-1">😊</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 font-medium">
            We help you get back to your account. Just enter your email and we'll send you a reset link 💌
          </p>

          {/* Cute Features */}
          <div className="space-y-3 mb-8 w-full">
            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-yellow-100 shadow-lg shadow-yellow-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <FaEnvelope className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Reset</h3>
                <p className="text-sm text-gray-500">Fast email delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-yellow-100 shadow-lg shadow-yellow-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <RiShieldCheckFill className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Process</h3>
                <p className="text-sm text-gray-500">100% safe recovery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-yellow-100 shadow-lg shadow-yellow-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                <FaLock className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">New Password</h3>
                <p className="text-sm text-gray-500">Set new secure password</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 max-w-md shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-yellow-300">
                <img src="https://www.loremfaces.net/96/id/3.jpg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-gray-900 font-bold block">Alex Smith</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 italic text-sm leading-relaxed">
              "Reset process was super easy! Got my account back in 2 minutes! 🚀"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-yellow-100 relative overflow-hidden">
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-500 text-sm">🔑</span>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-500 text-sm">✨</span>
            </div>

            {/* Welcome */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-300/50 transform -rotate-6">
                <FaLock className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Forgot Password?
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your email to get reset link 📧
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope className="text-sm" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-800 placeholder-gray-400 text-sm transition-all hover:bg-white hover:border-yellow-200"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3.5 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-yellow-300/50 hover:shadow-yellow-300/70 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <span>📧</span>
                  </>
                )}
              </button>
            </form>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                <h3 className="font-bold text-green-800 mb-2">Check Your Email!</h3>
                <p className="text-green-700 text-sm mb-4">
                  Reset code sent to <span className="font-semibold">{email}</span>
                </p>
                <Link
                  href="/verify-reset-code"
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
                >
                  Continue Reset ✨
                </Link>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100 text-sm">
              <Link href="/login" className="text-green-500 font-semibold hover:text-green-600 flex items-center gap-1">
                <FaLock className="text-sm" />
                Back to Login
              </Link>
              <Link href="/register" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1">
                <FaUser className="text-sm" />
                Create Account
              </Link>
            </div>

            {/* Trust Info */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-1 text-gray-500">
                <FaShieldAlt className="text-yellow-500 text-sm" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaStar className="text-yellow-400 text-sm" />
                <span>Trusted Recovery</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/" 
              className="text-gray-500 text-sm hover:text-yellow-500 transition-colors flex items-center justify-center gap-1"
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