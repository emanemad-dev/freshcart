"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHome, FaArrowLeft, FaShoppingBag, FaThLarge, FaTags, FaHeadphonesAlt } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 p-8">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated Illustration */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            {/* Background Circle */}
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
            
            {/* 404 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-green-600">404</span>
            </div>
            
            {/* Shopping Bag Icon */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce">
              <FaShoppingBag className="text-green-600 text-3xl" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Oops! Nothing Here</h1>
          <p className="text-xl text-gray-600">
            Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <FaHome className="text-xl" />
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
          >
            <FaArrowLeft className="text-xl" />
            Go Back
          </button>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link 
              href="/products" 
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaShoppingBag className="text-green-600 text-xl" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-600">All Products</span>
            </Link>

            <Link 
              href="/categories" 
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaThLarge className="text-green-600 text-xl" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-600">Categories</span>
            </Link>

            <Link 
              href="/products?onSale=true" 
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaTags className="text-green-600 text-xl" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-600">Today's Deals</span>
            </Link>

            <Link 
              href="/contact" 
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaHeadphonesAlt className="text-green-600 text-xl" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-600">Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Support Message */}
        <p className="mt-8 text-gray-500">
          Need help? <Link href="/contact" className="text-green-600 font-semibold hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}

