"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaArrowRight,
  FaTags,
  FaGem,
  FaTruck,
  FaStar,
} from "react-icons/fa";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.05 }}
    className="group bg-white/70 backdrop-blur-sm border border-white/40 shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl hover:border-emerald-400/50 transition-all duration-300"
  >
    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
      <Icon className="w-10 h-10 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export const EmptyWishlist = () => {
  const features = [
    {
      icon: FaTags,
      title: "Explore Categories",
      description:
        "Find your style across fashion, electronics, and more. Discover brands you love.",
    },
    {
      icon: FaGem,
      title: "Best Deals",
      description:
        "Save big with daily discounts and flash sales. Quality products at unbeatable prices.",
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description:
        "Get your orders delivered quickly anywhere in Egypt. Free shipping on orders over EGP 500.",
    },
    {
      icon: FaStar,
      title: "Top Rated",
      description:
        "Shop from customer favorites and trending items. See what everyone is loving.",
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Hero Empty State */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
          >
            {/* Animated Heart */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.3, 0.6, 1],
              }}
              className="w-32 h-32 md:w-40 md:h-40 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <FaHeart className="w-20 h-20 md:w-24 md:h-24 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-emerald-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Wishlist Empty
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            No favorites yet? Start your shopping journey and fill it with
            amazing finds!
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
          >
            <Link
              href="/products"
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 justify-center hover:scale-105 w-full sm:w-auto max-w-md mx-auto"
            >
              <span>Start Shopping</span>
              <FaArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="group bg-white/90 hover:bg-white text-gray-800 px-12 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 flex items-center gap-4 justify-center hover:scale-105 w-full sm:w-auto max-w-md mx-auto"
            >
              Browse Categories
              <FaTags className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
