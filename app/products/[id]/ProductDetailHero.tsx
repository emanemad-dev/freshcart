"use client";

import { motion } from "framer-motion";
import { FaStar, FaHeart, FaShoppingCart, FaGem } from "react-icons/fa";
import Link from "next/link";
import type { Product } from "@/features/products/types/product.types";

interface ProductDetailHeroProps {
  product: Product;
}

export const ProductDetailHero = ({ product }: ProductDetailHeroProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />,
        );
      } else {
        stars.push(<FaStar key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white overflow-hidden py-24 md:py-36"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-white/60 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/40 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/80 mb-8 flex items-center justify-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="font-medium">{product.title}</span>
          </nav>

          {/* Stats Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-6 bg-white/20 backdrop-blur-xl rounded-3xl px-8 py-6 mb-12 border border-white/40 shadow-2xl glass-card"
          >
            <div className="flex items-center gap-3">
              <FaGem className="w-12 h-12 text-white animate-pulse" />
              <div>
                <div className="text-4xl md:text-5xl font-black">
                  {product.ratingsAverage?.toFixed(1) || "4.8"}
                </div>
                <div className="text-xl font-bold opacity-90">Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaHeart className="w-10 h-10 text-white/90" />
              <div>
                <div className="text-3xl font-black">
                  {product.ratingsQuantity || 0}+
                </div>
                <div className="opacity-90">Reviews</div>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent mb-8 leading-tight"
          >
            {product.title}
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl mb-16 opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            {product.description ||
              "Premium quality product with exceptional craftsmanship. Perfect for your everyday needs."}
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaShoppingCart className="w-5 h-5" />
                Shop Now
              </span>
              <motion.div
                className="absolute inset-0 bg-emerald-50"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/50 rounded-2xl font-bold text-white text-lg hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <FaHeart className="w-5 h-5" />
              Add to Wishlist
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </motion.section>
  );
};
