"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaTruck,
  FaLock,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password, phone });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side*/}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-600 rounded-full"></div>
        </div>

        {/* Content*/}
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to Fresh<span className="text-green-600">Cart</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 font-medium">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaLeaf className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-500">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaTruck className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-500">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaLock className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                <p className="text-sm text-gray-500">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-green-100 max-w-md shadow-lg">
            {/* Customer Info */}
            <div className="flex items-center gap-3 mb-4">
              {/* Avatar Image */}
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://www.loremfaces.net/96/id/1.jpg"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-gray-900 font-semibold block">
                  Sarah Johnson
                </span>

                <div className="flex items-center gap-1 mb-3">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            {/* Welcome */}
            <div className="text-center mb-8">
              <h2 className="text-3xl text-primary-600 font-bold text-gray-800 mb-2">
                Fresh<span className="text-green-600">Cart</span>
              </h2>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600 text-md">
                Start your fresh journey with us today
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
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              {/* Password Field */}

              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30"
              >
                Create My Account
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-base text-gray-600 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-600 font-semibold hover:text-green-700 hover:underline"
              >
                Sign In
              </Link>
            </p>

            {/* Trust Info */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-base text-gray-600">
                <FaShieldAlt className="text-green-500 text-xl" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
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
