"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";
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

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-r from-slate-50/50 to-emerald-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 bg-clip-text text-transparent mb-4">
            Subcategories
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subcategories.map((subcategory: Subcategory, index: number) => (
            <motion.div
              key={subcategory._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/products?categoryId=${categoryId}&subcategoryId=${subcategory._id}`}
                className="block relative h-80 bg-gradient-to-br from-white via-white/80 to-emerald-50/50 backdrop-blur-sm border border-emerald-100/50 shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/70 hover:shadow-emerald/20"
              >
                <div className="absolute inset-0">
                  {subcategory.image ? (
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-green-400/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <FaAngleRight className="w-8 h-8 text-emerald-500" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow-2xl">
                  <h3 className="font-black text-xl md:text-2xl leading-tight mb-3 bg-gradient-to-r from-white to-emerald-100 bg-clip-text">
                    {subcategory.name}
                  </h3>
                  <div className="flex items-center gap-2 opacity-90">
                    <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold tracking-wide">
                      Browse Products
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
