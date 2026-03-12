"use client";

import Link from "next/link";
import { useProducts } from "@/features/products/hooks/useProducts";
import { motion } from "framer-motion";
import {
  FaShoppingBag,
  FaTags,
  FaSearch,
  FaArrowRight,
  FaGem,
} from "react-icons/fa";
import { useState } from "react";

export const ProductHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useProducts({ limit: 8 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white overflow-hidden py-24 md:py-36"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-white/60 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/40 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Stats Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-6 bg-white/20 backdrop-blur-xl rounded-3xl px-12 py-8 mb-12 border border-white/40 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <FaShoppingBag className="w-12 h-12 text-white animate-pulse" />
              <div>
                <div className="text-4xl md:text-5xl font-black">
                  {data?.data?.length || 0}
                </div>
                <div className="text-xl font-bold opacity-90">Products</div>
              </div>
            </div>
            <div className="h-16 w-px bg-white/30" />
            <div className="flex items-center gap-3">
              <FaGem className="w-10 h-10 text-white" />
              <div>
                <div className="text-2xl font-bold">Free Shipping</div>
                <div className="opacity-90">Over 500 EGP</div>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent mb-8 leading-tight"
          >
            Discover Amazing Products
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-16 opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our premium collection of handpicked products across all
            categories. Quality guaranteed at unbeatable prices.
          </motion.p>

          {/* Search + CTAs */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto items-stretch lg:items-center"
          >
            <form onSubmit={handleSearch} className="flex gap-3 flex-1">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-6 py-5 text-lg bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/60 transition-all shadow-xl"
                />
              </div>
              <button
                type="submit"
                className="px-12 py-5 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 whitespace-nowrap"
              >
                Search
              </button>
            </form>

            <Link
              href="/categories"
              className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl border border-white/30 transition-all flex-1 lg:flex-none"
            >
              Browse Categories
              <FaTags className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
