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

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );

        if (!res.ok) throw new Error("Failed to fetch categories");

        const json = await res.json();

        setCategories(json.data.slice(0, 10));
      } catch (err) {
        setError("Failed to load categories");
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#f9fafb] text-center text-lg">
        Loading...
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#f9fafb] text-center">
        <FaShoppingBag className="mx-auto text-red-400 mb-3 text-3xl lg:text-4xl" />
        <p className="text-lg">{error || "No categories found"}</p>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20  mx-auto px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black flex items-center gap-3 sm:gap-4 leading-tight">
          <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
          <span>
            Shop by{" "}
            <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Category
            </span>
          </span>
        </h2>

        <Link
          href="/categories"
          className="group text-sm lg:text-base text-emerald-600 flex items-center gap-1 relative w-fit font-semibold"
        >
          View All
          <FaArrowRight className="text-xs lg:text-sm transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {categories.map((category, index) => (
          <div key={category._id} className="w-full">
            <CategoryCard category={category} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Card
const CategoryCard = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/categories/${category._id}/subcategories`}
        className="block"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-5 lg:p-6 text-center border border-gray-100 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 group hover:-translate-y-1">
          {/* Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden bg-white shadow-sm group-hover:scale-105 transition">
            <Image
              src={category.image}
              alt={category.name}
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name */}
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors leading-tight">
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};
