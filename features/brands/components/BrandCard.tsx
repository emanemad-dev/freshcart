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
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-28 md:h-32 flex items-center justify-center bg-gray-50 p-4">
          {safeBrand.image ? (
            <Image
              src={safeBrand.image}
              alt={safeBrand.name || "Brand"}
              fill
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <FaStore className="text-gray-400 w-10 h-10" />
          )}

          {/* Hover Text */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-green-600 text-sm font-semibold shadow">
              Show Products
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="py-3 text-center">
          <h3 className="text-sm md:text-base font-medium text-gray-700 line-clamp-1">
            {safeBrand.name || "Brand"}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};
