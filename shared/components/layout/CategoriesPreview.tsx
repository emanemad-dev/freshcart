"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

export function CategoriesPreview() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        setError(null);

        // جلب الكاتيجوريز
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const json = await res.json();

        if (!json.data || json.data.length === 0) {
          throw new Error("No categories found");
        }

        // جلب المنتجات عشان نحسب العدد لكل كاتيجوري
        const productsRes = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products",
        );

        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products: ${productsRes.status}`);
        }

        const productsJson = await productsRes.json();
        const products = productsJson.data || [];

        // حساب عدد المنتجات لكل كاتيجوري (نجيب أول 10 كاتيجوري عشان نضمن صفين 5+5)
        const categoriesWithCount = json.data
          .slice(0, 10)
          .map((category: Category) => {
            const count = products.filter(
              (product: any) => product.category?._id === category._id,
            ).length;

            return {
              ...category,
              productCount: count, // لو مفيش هيبقى 0
            };
          });

        setCategories(categoriesWithCount);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load categories",
        );
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Skeleton Loader
  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-1 h-8 sm:h-10 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="h-8 sm:h-10 w-40 sm:w-56 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-2xl mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingBag className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            {error || "No Categories Found"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {error
              ? "Please try again later"
              : "Categories will appear here soon!"}
          </p>
          {error && (
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </section>
    );
  }

  // تقسيم الكاتيجوريز إلى صفين (5 + 5)
  const firstRow = categories.slice(0, 5);
  const secondRow = categories.slice(5, 10);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-12 w-1.5 sm:h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Shop by{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-xs sm:text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            View All
            <FaArrowRight className="text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* First Row - 5 Categories */}
        <div className="mb-4 md:mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {firstRow.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Second Row - 5 Categories (if available) */}
        {secondRow.length > 0 && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {secondRow.map((category, index) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  index={index + 5} // عشان الـ delay يبقى مختلف
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Category Card Component
const CategoryCard = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/categories/${category._id}/subcategories`}
        className="group block"
      >
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/30">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100/20 p-2">
            <div className="relative w-full h-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-all duration-300 rounded-2xl">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="absolute top-1 left-1 z-10 bg-emerald-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold shadow-lg">
              {category.productCount}+
            </div>

            {/* Quick View Icon */}
            <div className="absolute top-0.5 right-0.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="p-1 bg-white rounded-full shadow-md border border-gray-100 text-emerald-500">
                <FaArrowRight size={6} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 text-center">
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {category.name}
            </h3>

            <p className="text-xs text-gray-500 font-medium mt-1">
              {category.productCount} products
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
