"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";

import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { ProductHero } from "./ProductHero";
// import { motion } from "framer-motion";

import { Loader } from "@/shared/components/ui/Loader";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaBox, FaSearch } from "react-icons/fa";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { motion } from "framer-motion";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import Link from "next/link";

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50/50">
        <Loader size="lg" />
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        title={title}
        description="Browse our premium collection of high-quality products."
        icon={<FaBox className="text-2xl" />}
      />

      <section className="lg:px-5 py-8 lg:py-12">
        {/* Products Grid Section */}
        <div className="">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} onAddToCart={addToCart} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <FaBox className="w-24 h-24 text-gray-300 mx-auto mb-8" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Products Found
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Try adjusting your search or filters.
              </p>
              <Button asChild size="lg" className="mx-auto">
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return <ProductsContent />;
}
