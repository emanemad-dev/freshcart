"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStore, FaArrowRight } from "react-icons/fa";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <Link href={`/brands/${brand._id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 transition-all duration-300 h-full flex flex-col hover:shadow-md hover:shadow-purple-100/30">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-purple-100/20 p-3">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
              {brand.image ? (
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                  <FaStore className="w-8 h-8 text-purple-500" />
                </div>
              )}
            </div>

            {/* Product Count Badge */}
            {brand.productCount && brand.productCount > 0 && (
              <div className="absolute top-2 left-2 z-10 bg-purple-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg">
                {brand.productCount}+
              </div>
            )}

            {/* Quick View Icon */}
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="p-1.5 bg-white rounded-full shadow-md border border-gray-100 text-purple-500">
                <FaArrowRight size={10} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 text-center">
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
              {brand.name}
            </h3>

            <p className="text-xs text-gray-500 font-medium mt-1">
              {brand.productCount || 0} products
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
