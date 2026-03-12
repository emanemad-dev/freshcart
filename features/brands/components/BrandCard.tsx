"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brand } from "../types/brands.types";
import { FaStore, FaArrowRight } from "react-icons/fa";

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  const safeBrand = brand || {};

  return (
    <Link href={`/brands/${safeBrand._id || ""}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl hover:border-purple-400/50 rounded-3xl overflow-hidden transition-all duration-500"
      >
        {/* Logo Container */}
        <div className="relative h-48 md:h-52 p-8 bg-gradient-to-b from-purple-50 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
          {safeBrand.image ? (
            <Image
              src={safeBrand.image}
              alt={safeBrand.name || "Brand"}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-purple-100 rounded-2xl flex items-center justify-center">
              <FaStore className="w-24 h-24 text-purple-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
            {safeBrand.name || "Brand Name"}
          </h3>

          {/* Brand Stats */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>★ 4.8</span>
            <span>150+ Products</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
            <FaStore className="w-16 h-16 text-white mb-4 animate-bounce" />
            <h4 className="text-2xl font-bold text-white mb-2">
              Explore Collection
            </h4>
            <p className="text-purple-100 text-lg mb-6">
              Discover amazing products
            </p>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl font-semibold text-white hover:bg-white/30 transition-all">
              Shop Now{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
