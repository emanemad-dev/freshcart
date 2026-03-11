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

        {/* Logo */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Image src="/logo.png" alt="FreshCart" width={32} height={32} />
            </div>
            <span className="text-2xl font-bold text-gray-900">FreshCart</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Image */}
          <div className="w-full max-w-md mb-8">
            <Image
              src="/login.png"
              alt="FreshCart Shopping"
              width={400}
              height={400}
              className="w-full h-auto rounded-2xl shadow-2xl"
              unoptimized
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            FreshCart – Your One-Stop Shop for Fresh Products
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-xl">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
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

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-12 text-center text-gray-800">
            <div>
              <p className="text-3xl font-bold text-green-500">10K+</p>
              <p className="text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">5K+</p>
              <p className="text-sm">Daily Orders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">99%</p>
              <p className="text-sm">Fresh Guarantee</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-md text-center mt-10">
            <p className="text-gray-600 italic leading-relaxed">
              "FreshCart makes grocery shopping effortless. The vegetables arrive
              incredibly fresh and delivery is always on time!"
            </p>
            <div className="flex items-center justify-center gap-1 mt-4 text-yellow-400">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="text-sm text-gray-500 mt-2">Sarah M. – Regular Customer</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Image src="/logo.png" alt="FreshCart" width={24} height={24} />
              </div>
              <span className="text-2xl font-bold text-green-600">FreshCart</span>
            </div>

            {/* Welcome */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-lg">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social */}
            <div className="space-y-3 mb-8">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base">
                <FaGoogle className="text-xl" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium text-base">
                <FaFacebook className="text-xl" />
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
              <Link href="/register" className="text-green-600 font-semibold hover:text-green-700">
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