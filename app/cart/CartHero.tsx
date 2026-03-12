"use client";

import {
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart/hooks/useCart";
import Link from "next/link";

export const CartHero = () => {
  const { cartCount, total } = useCart();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white overflow-hidden py-20 md:py-32"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-white/70 rounded-full mix-blend-multiply filter blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Cart Stats Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-xl rounded-3xl px-8 py-5 mb-8 border border-white/40 shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center">
              <FaShoppingCart className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black mb-1">
                {cartCount || 0}
              </div>
              <div className="text-lg font-semibold opacity-90">
                Items in Cart • EGP {total.toLocaleString()}
              </div>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-emerald-50 to-white bg-clip-text text-transparent leading-tight"
          >
            Your Shopping Cart
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Review your items and get ready to complete your order with our
            secure checkout
          </motion.p>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mb-12 max-w-4xl mx-auto px-4"
          >
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                <FaShoppingCart className="w-4 h-4" />
              </div>
              <span>Cart</span>
              <div className="w-16 h-1 bg-white/50 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                <FaTruck className="w-4 h-4" />
              </div>
              <span>Shipping</span>
              <div className="w-16 h-1 bg-white/50 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaCheckCircle className="w-4 h-4" />
              </div>
              <span className="font-semibold">Payment</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col lg:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="group flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/40 hover:border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full lg:w-auto"
            >
              Continue Shopping
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/checkout"
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full lg:w-auto"
            >
              Proceed to Checkout ({cartCount || 0} items)
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
