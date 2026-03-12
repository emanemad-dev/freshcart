"use client";

import Link from "next/link";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { Loader } from "@/shared/components/ui/Loader";
import { CategoryHero } from "./CategoryHero";
import { motion } from "framer-motion";
import { FaTags } from "react-icons/fa";

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
        >
          <FaTags className="w-16 h-16 text-emerald-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          No Categories Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Categories will appear here soon!
        </p>
        <Link
          href="/products"
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-3xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-3"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <CategoryHero />
      <section className="container mx-auto px-4 -mt-16 md:-mt-24 pb-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
