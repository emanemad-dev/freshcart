"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGrid, FiPackage, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { Loader } from "@/shared/components/ui/Loader";
import Image from "next/image";

interface Subcategory {
  _id: string;
  name: string;
  image: string;
}

interface SubcategoriesProps {
  categoryId: string;
}

export const Subcategories = ({ categoryId }: SubcategoriesProps) => {
  const { data: subcategories, isLoading } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      );
      const json = await res.json();
      return json.data || [];
    },
  });

  // Array of different icons for variety
  const iconOptions = [
    FiGrid,
    FiPackage,
    FiShoppingBag,
    FiGrid,
    FiPackage,
    FiShoppingBag,
  ];

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <Loader size="md" />
        <p className="text-xs text-gray-400 mt-3 animate-pulse">
          Loading subcategories...
        </p>
      </div>
    );
  }

  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Subcategories
            </span>
          </h2>
        </motion.div>

        {/* Subcategories Grid - 4 كاردات في الشاشة الكبيرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {subcategories.map((subcategory: Subcategory, index: number) => {
            const IconComponent = iconOptions[index % iconOptions.length];

            return (
              <motion.div
                key={subcategory._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link
                  href={`/products?categoryId=${categoryId}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/30">
                    {/* Content - الأيقونة والكلمة على الشمال */}
                    <div className="flex items-center gap-3 p-3">
                      {/* الأيقونة - على الشمال */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
                        {subcategory.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={subcategory.image}
                              alt={subcategory.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        )}
                      </div>

                      {/* المحتوى على الشمال جنب الأيقونة */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {subcategory.name}
                        </h3>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] sm:text-xs text-gray-400">
                            {Math.floor(Math.random() * 20) + 5} items
                          </span>
                          <span className="text-[10px] sm:text-xs text-emerald-500 font-medium flex items-center gap-0.5">
                            Browse
                            <FiArrowRight
                              size={10}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
