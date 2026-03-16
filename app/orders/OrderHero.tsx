"use client";

import { FaShoppingBag, FaTruck, FaCheckCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export const OrderHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-5">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-lg mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700">
                Your Orders Dashboard
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent mb-6 leading-tight">
              Manage & Track Your Orders
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              View order history, track deliveries, and manage returns.
              Everything in one place.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
                <FaShoppingBag className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
                <FaClock className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
                <FaTruck className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-500">In Transit</div>
              </div>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
                <FaCheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Delivered</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/api/placeholder/600/500')] bg-cover bg-center opacity-10" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-200/30 rounded-full blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaShoppingBag className="w-32 h-32 text-white/80 mx-auto mb-6 animate-bounce" />
                  <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl">
                    <div className="text-3xl font-bold text-white drop-shadow-lg">
                      Order Tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-emerald-300/20 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
    </section>
  );
};
