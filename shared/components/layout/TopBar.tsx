"use client";

import Link from "next/link";
import { FaTruck, FaStar, FaPhone, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 text-gray-600 m-0">
      <div className="w-full px-2">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 text-sm">
          {/* Left Side - Promotional Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <FaTruck className="text-green-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          {/* Right Side - Contact & Auth */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-600 text-xs" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <FaEnvelope className="text-green-600 text-xs" />
              <span>support@freshcart.com</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Link 
                href="/login" 
                className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaSignInAlt className="text-xs" />
                <span>Sign In</span>
              </Link>
              <Link 
                href="/register" 
                className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaUserPlus className="text-xs" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

