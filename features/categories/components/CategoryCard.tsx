"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "../types/categories.types";
import { FaTags, FaArrowRight } from "react-icons/fa";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const safeCategory = category || {};

  return (
    <Link href={`/categories/${safeCategory._id || ""}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -12, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group bg-gradient-to-br from-white to-emerald-50/50 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl hover:border-emerald-400/50 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
          {safeCategory.image ? (
            <Image
              src={safeCategory.image}
              alt={safeCategory.name || "Category"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-emerald-100 flex items-center justify-center">
              <FaTags className="w-24 h-24 text-emerald-400" />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <span className="text-3xl font-bold mb-2 block">
                {safeCategory.name || "Category"}
              </span>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-8 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all">
                Explore{" "}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {safeCategory.name || "Category Name"}
          </h3>

          {safeCategory.description && (
            <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
              {safeCategory.description}
            </p>
          )}

          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1">
              800+ Products
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
