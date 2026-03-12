"use client";

import Link from "next/link";
import { useBrands } from "@/features/brands/hooks/useBrands";
import { BrandCard } from "@/features/brands/components/BrandCard";
import { Loader } from "@/shared/components/ui/Loader";
import { BrandHero } from "./BrandHero";
import { motion } from "framer-motion";
import { FaStore } from "react-icons/fa";

export default function BrandsPage() {
  const { data: brands, isLoading, error } = useBrands();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !brands || brands.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-br from-slate-50 to-purple-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-8"
        >
          <FaStore className="w-16 h-16 text-purple-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          No Brands Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Check back later for exciting brand partnerships!
        </p>
        <Link
          href="/products"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-3xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-3"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <BrandHero />
      <section className="container mx-auto px-4 -mt-16 md:-mt-24 pb-24 relative z-10">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
