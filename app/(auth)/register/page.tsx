"use client";

import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import {
  FaGoogle,
  FaFacebook,
  FaLock,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShoppingBasket,
} from "react-icons/fa";
import {
  RiLeafFill,
  RiTruckFill,
  RiShieldCheckFill,
  RiSparklingFill,
} from "react-icons/ri";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Fruits/Vegetables */}
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
        <div className="absolute top-8 left-8 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <RiSparklingFill className="text-green-500" />
          Join FreshCart!
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-xl mx-auto">
          {/* Cute Mascot */}
          <div className="mb-8 relative">
            <div className="w-48 h-48 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full flex items-center justify-center shadow-xl shadow-green-300/50 relative">
              <span className="text-8xl">🛒</span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-2xl shadow-md">
                ⭐
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center text-3xl shadow-md">
                💖
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Hello Beautiful!
            <span className="text-3xl ml-1">🌸</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 font-medium">
            Create your account to start enjoying fresh groceries delivered
            right to your doorstep 💚
          </p>

          {/* Cute Features */}
          <div className="space-y-3 mb-8 w-full">
            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-green-100 shadow-lg shadow-green-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <RiLeafFill className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fresh Always</h3>
                <p className="text-sm text-gray-500">
                  Premium quality products waiting for you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-green-100 shadow-lg shadow-green-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md">
                <RiTruckFill className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-500">
                  Same-day delivery magic ✨
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-2xl border-2 border-green-100 shadow-lg shadow-green-100/50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <RiShieldCheckFill className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Safe & Secure</h3>
                <p className="text-sm text-gray-500">
                  Your account is protected ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Cute Testimonial Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 max-w-md shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-green-300">
                <img
                  src="https://www.loremfaces.net/96/id/1.jpg"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-gray-900 font-bold block">
                  Sarah Johnson
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
              "Amazing! Signup took seconds and my first delivery was perfect!
              🌟"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-100 relative overflow-hidden">
            {/* Cute top decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300"></div>

            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-sm">🌱</span>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-500 text-sm">✨</span>
            </div>

            {/* Welcome */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-300/50 transform -rotate-6">
                <FaShoppingBasket className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm">
                Get started with FreshCart ✨
              </p>
            </div>

            {/* Social */}
            <div className="space-y-2 mb-6">
              <button
                className="w-full flex items-center justify-center gap-2 
                bg-white border-2 border-gray-200 text-gray-700 
                py-3 px-4 rounded-xl 
                hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 
                hover:border-green-300 hover:shadow-md
                transition-all duration-300 ease-in-out 
                font-medium text-sm"
              >
                <FaGoogle className="text-lg" />
                Continue with Google
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 
                bg-white border-2 border-gray-200 text-gray-700 
                py-3 px-4 rounded-xl 
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                hover:border-blue-300 hover:shadow-md
                transition-all duration-300 ease-in-out 
                font-medium text-sm"
              >
                <FaFacebook className="text-lg text-blue-600" />
                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 font-medium">
                  ✨ OR USE EMAIL ✨
                </span>
              </div>
            </div>

            {/* RegisterForm */}
            <RegisterForm />

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-5">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 font-bold hover:text-green-600 hover:underline"
              >
                Sign In
              </Link>
            </p>

            {/* Trust Info */}
            <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaShieldAlt className="text-green-500 text-sm" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaStar className="text-yellow-400 text-sm" />
                <span>50K+ Happy Users</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaLeaf className="text-green-500 text-sm" />
                <span>Fresh Always</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-gray-500 text-sm hover:text-green-500 transition-colors flex items-center justify-center gap-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
