"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";

import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { ProductHero } from "./ProductHero";
import { motion } from "framer-motion";

import { Loader } from "@/shared/components/ui/Loader";
import { FaShoppingBag } from "react-icons/fa";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  const brandId = searchParams.get("brand");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useProducts({
    search,
    categoryId: categoryId || undefined,
    subcategoryId: subcategoryId || undefined,
    brandId: brandId || undefined,
  });
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  const title = subcategoryId
    ? "Subcategory Products"
    : brandId
      ? "Brand Products"
      : categoryId
        ? "Category Products"
        : "All Products";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      <ProductHero />
      <section className="container mx-auto px-4 -mt-20 md:-mt-32 pb-24 relative z-10">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {data?.data?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loader size="lg" />}>
      <ProductsContent />
    </Suspense>
  );
}
