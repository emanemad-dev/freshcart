"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaGoogle, FaFacebook, FaTruck, FaLock, FaStar, FaShieldAlt, FaLeaf } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");

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
      
      {/* Left Side - خلفية بيضاء */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 bg-white">
        {/* Background Pattern - خفيف جداً أخضر */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-600 rounded-full"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Image src="/logo.png" alt="FreshCart" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-green-600">FreshCart</span>
          </div>
        </div>

        {/* Content - نصوص داكنة على خلفية بيضاء */}
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to FreshCart
          </h1>

          <p className="text-xl text-gray-600 mb-8 font-medium">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>

          {/* Features - مع خلفية شفافة خفيفة */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaLeaf className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-500">Premium quality products sourced from trusted suppliers.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaTruck className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-500">Same-day delivery available in most areas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaLock className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                <p className="text-sm text-gray-500">Your data and payments are completely secure</p>
              </div>
            </div>
          </div>

          {/* Testimonial - مع خلفية شفافة */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                SJ
              </div>
              <div>
                <span className="text-gray-900 font-semibold block">Sarah Johnson</span>
                <span className="text-green-600 text-sm">Verified Customer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - نفس الشيء مع تحسينات بسيطة */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo.png" alt="FreshCart" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-green-600">FreshCart</span>
            </div>

            {/* Welcome - نصوص داكنة واضحة */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600 text-lg">
                Start your fresh journey with us today
              </p>
            </div>

            {/* Social */}
            <div className="space-y-3 mb-8">
              <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base hover:border-gray-300">
                <FaGoogle className="text-xl text-red-500" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-[#1877f2] text-white py-4 px-4 rounded-xl hover:bg-[#166fe5] transition-colors font-medium text-base shadow-md">
                <FaFacebook className="text-xl" />
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

            {/* Register Form - مع تحسين وضوح الحقول */}
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
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" required />
                <span className="text-sm text-gray-600">
                  I agree to the <Link href="/terms" className="text-green-600 font-semibold hover:text-green-700">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 font-semibold hover:text-green-700">Privacy Policy</Link>
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
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700 hover:underline">
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