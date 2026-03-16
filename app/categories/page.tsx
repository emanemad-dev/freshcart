"use client";

import Link from "next/link";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { Loader } from "@/shared/components/ui/Loader";
import { motion } from "framer-motion";
import { FaTags, FaArrowRight } from "react-icons/fa";
import { PageHeader } from "@/shared/components/layout/PageHeader";

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
        >
          <FaTags className="w-12 h-12 text-emerald-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          No Categories Found
        </h1>

        <p className="text-gray-500 mb-8">Categories will appear here soon.</p>

        <Link
          href="/products"
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Browse Products
          <FaArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Categories"
        description="Browse all product categories and discover what you need"
        icon={<FaTags className="w-6 h-6 text-emerald-600" />}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
