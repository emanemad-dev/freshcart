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
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative h-36 bg-gray-50 flex items-center justify-center p-4">
          {safeCategory.image ? (
            <Image
              src={safeCategory.image}
              alt={safeCategory.name || "Category"}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <FaTags className="w-10 h-10 text-gray-400" />
          )}

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="flex items-center gap-2 text-white font-semibold text-sm bg-emerald-600/90 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              View Subcategories
              <FaArrowRight className="ml-1 animate-pulse" />
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-800 text-base group-hover:text-emerald-600 transition line-clamp-1">
            {safeCategory.name || "Category"}
          </h3>

          {safeCategory.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {safeCategory.description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};
