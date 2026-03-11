// app/login/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";
import {
  FaGoogle,
  FaFacebook,
  FaTruck,
  FaLock,
  FaHeadphonesAlt,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 bg-white text-gray-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gray-100 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-100 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gray-100 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Image */}
          <Image
            src="/login.png"
            alt="FreshCart Shopping"
            width={350}
            height={350}
            className="w-full h-96 rounded-2xl shadow-2xl"
            unoptimized
          />

          {/* Headline */}
          <h1 className="text-3xl font-bold my-4 leading-tight text-gray-900">
            FreshCart – Your One-Stop Shop for Fresh Products
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-xl">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>

          {/* Benefits */}
          <div className="flex items-center justify-center gap-8 mb-12 text-gray-700">
            <div className="flex items-center gap-2">
              <FaTruck className="text-2xl text-green-500" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <FaLock className="text-2xl text-green-500" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <FaHeadphonesAlt className="text-2xl text-green-500" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 ">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-50">
            {/* Welcome */}
            <div className="text-center mb-8">
              <h2 className="text-3xl text-primary-600 font-bold text-gray-800 mb-2">
                Fresh<span className="text-green-600">Cart</span>
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-md">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social */}
            <div className="space-y-3 mb-8">
              {/* Google Button */}
              <button
                className="w-full flex items-center justify-center gap-3 
                bg-white border border-gray-300 text-gray-700 
                py-4 px-4 rounded-xl 
                hover:bg-green-100 hover:border-green-600 
                transition-colors duration-300 ease-in-out 
                font-medium text-base"
              >
                <FaGoogle className="text-xl text-red-500" />
                Continue with Google
              </button>

              {/* Facebook Button */}
              <button
                className="w-full flex items-center justify-center gap-3 
                bg-white border border-gray-300 text-gray-700 
                py-4 px-4 rounded-xl 
                hover:bg-green-100 hover:border-green-600 
                transition-colors duration-300 ease-in-out 
                font-medium text-base"
                          >
                <FaFacebook className="text-xl text-blue-600" />
                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Register */}
            <p className="text-center text-base text-gray-600 mt-8">
              New to FreshCart?{" "}
              <Link
                href="/register"
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Create an account
              </Link>
            </p>

            {/* Trust Info */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-base text-gray-500">
                <FaShieldAlt className="text-green-500 text-xl" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-500">
                <FaStar className="text-yellow-400 text-xl" />
                <span>50K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
