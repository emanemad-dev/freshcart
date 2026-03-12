"use client";

import Link from "next/link";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { motion } from "framer-motion";
import { FaThLarge, FaTags, FaArrowRight } from "react-icons/fa";

export const CategoryHero = () => {
  const { data: categories } = useCategories();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 text-white overflow-hidden py-24 md:py-32"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/70 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-3xl px-10 py-6 mb-12 border border-white/40 shadow-2xl"
          >
            <FaThLarge className="w-12 h-12 text-white animate-pulse" />
            <div>
              <div className="text-4xl md:text-5xl font-black">
                {categories?.length || 0}
              </div>
              <div className="text-xl md:text-2xl font-bold opacity-90">
                Categories
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white/90 to-emerald-100 bg-clip-text text-transparent mb-6"
          >
            Shop by Category
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Browse our curated collections and find exactly what you need.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl border border-white/30 transition-all flex items-center gap-3 justify-center hover:scale-105"
            >
              All Products{" "}
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/brands"
              className="group bg-gradient-to-r from-white/90 to-emerald-50 text-emerald-900 px-10 py-5 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl border border-white/50 transition-all hover:scale-105"
            >
              Top Brands <FaTags className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
