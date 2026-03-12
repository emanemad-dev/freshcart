"use client";

import Link from "next/link";
import {
  FaHeart,
  FaShoppingCart,
  FaTrashAlt,
  FaArrowRight,
  FaGem,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useCart } from "@/features/cart/hooks/useCart";

interface WishlistHeroProps {
  itemsLength: number;
  onClearAll: () => void;
}

export const WishlistHero = ({
  itemsLength,
  onClearAll,
}: WishlistHeroProps) => {
  const { items } = useWishlist();

  // Safe total value calculation
  const totalValue = items.reduce((sum, item) => {
    const price = item.product?.priceAfterDiscount || item.product?.price || 0;
    return sum + price;
  }, 0);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white overflow-hidden py-20 md:py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-white/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 mb-8 border border-white/30 shadow-2xl"
          >
            <FaHeart className="w-12 h-12 text-white animate-pulse" />
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">
                {itemsLength.toLocaleString()}
              </div>
              <div className="text-xl md:text-2xl font-bold opacity-90">
                {itemsLength === 1 ? "Favorite Item" : "Favorite Items"}
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent leading-tight"
          >
            Your Dream Collection
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the perfect pieces you&apos;ve saved. Ready to make them
            yours?
          </motion.p>

          {/* Total Value */}
          {totalValue > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 shadow-xl max-w-md mx-auto"
            >
              <div className="flex items-baseline gap-2">
                <FaGem className="w-8 h-8 text-emerald-200" />
                <span className="text-3xl font-black">
                  EGP {totalValue.toLocaleString()}
                </span>
                <span className="text-lg opacity-80">Potential Savings</span>
              </div>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
          >
            <button
              onClick={onClearAll}
              className="group flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <FaTrashAlt className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Clear All ({itemsLength})
            </button>
            <Link
              href="/products"
              className="group flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Continue Shopping
              <FaArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
