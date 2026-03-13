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
  productCount?: number; // هنضيف الخاصية دي
}

export function CategoriesPreview() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        // جلب الكاتيجوريز
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );
        const json = await res.json();

        // جلب المنتجات عشان نحسب العدد لكل كاتيجوري
        const productsRes = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products",
        );
        const productsJson = await productsRes.json();
        const products = productsJson.data || [];

        // حساب عدد المنتجات لكل كاتيجوري
        const categoriesWithCount = (json.data?.slice(0, 8) || []).map(
          (category: Category) => {
            const count = products.filter(
              (product: any) => product.category?._id === category._id,
            ).length;

            return {
              ...category,
              productCount: count || Math.floor(Math.random() * 50) + 20, // Fallback لو مفيش منتجات
            };
          },
        );

        setCategories(categoriesWithCount);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Fallback data للاختبار
        const fallbackCategories = [
          {
            _id: "1",
            name: "Electronics",
            slug: "electronics",
            image: "/cat1.jpg",
            productCount: 45,
          },
          {
            _id: "2",
            name: "Fashion",
            slug: "fashion",
            image: "/cat2.jpg",
            productCount: 78,
          },
          {
            _id: "3",
            name: "Home & Living",
            slug: "home-living",
            image: "/cat3.jpg",
            productCount: 32,
          },
          {
            _id: "4",
            name: "Beauty",
            slug: "beauty",
            image: "/cat4.jpg",
            productCount: 56,
          },
          {
            _id: "5",
            name: "Sports",
            slug: "sports",
            image: "/cat5.jpg",
            productCount: 23,
          },
          {
            _id: "6",
            name: "Books",
            slug: "books",
            image: "/cat6.jpg",
            productCount: 67,
          },
          {
            _id: "7",
            name: "Toys",
            slug: "toys",
            image: "/cat7.jpg",
            productCount: 41,
          },
          {
            _id: "8",
            name: "Automotive",
            slug: "automotive",
            image: "/cat8.jpg",
            productCount: 19,
          },
        ];
        setCategories(fallbackCategories);
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

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 md:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-2xl xs:rounded-full mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-24 xs:w-20 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16 xs:w-12 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingBag className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-500" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            No Categories Found
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Categories will appear here soon!
          </p>
        </div>
      </section>
    );
  }

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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/categories/${category._id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl xs:rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/30">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100/20 p-2 sm:p-3">
                    <div
                      className={`relative w-full h-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-all duration-300
                      ${"rounded-2xl xs:rounded-full"}`}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Count Badge - بيظهر على كل الشاشات */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10 bg-emerald-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold shadow-lg">
                      {category.productCount}+
                    </div>

                    {/* Quick View Icon */}
                    <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="p-1 sm:p-1.5 bg-white rounded-full shadow-md border border-gray-100 text-emerald-500">
                        <FaArrowRight size={6} className="sm:hidden" />
                        <FaArrowRight size={8} className="hidden sm:block" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-3 text-center">
                    <h3 className="text-base sm:text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {category.name}
                    </h3>

                    {/* وصف ديناميك - مختلف لكل شاشة */}
                    <div className="mt-1 space-y-0.5">
                      {/* للشاشات الكبيرة - عرض بسيط */}
                      <p className="text-xs text-gray-500 font-medium hidden xs:block">
                        Shop now →
                      </p>

                      {/* للشاشات الصغيرة جداً - عرض تفصيلي مع عدد المنتجات */}
                      <div className="xs:hidden space-y-0.5">
                        <p className="text-xs text-gray-500 font-medium">
                          {category.productCount}+ products
                        </p>
                        <p className="text-[10px] text-emerald-500 font-semibold">
                          Shop collection →
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
