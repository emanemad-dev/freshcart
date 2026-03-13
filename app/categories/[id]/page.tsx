"use client";

import { use } from "react";
import { Subcategories } from "./Subcategories";
import Link from "next/link";
import { useCategory } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useCart } from "@/features/cart/hooks/useCart";
import { Loader } from "@/shared/components/ui/Loader";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import { FaTimes, FaAngleRight } from "react-icons/fa";


interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

function CategoryContent({ categoryId }: { categoryId: string }) {
  const { data: category, isLoading: categoryLoading } =
    useCategory(categoryId);
  const { data: products, isLoading: productsLoading } = useProducts({
    categoryId: categoryId,
  });
  const { add: addToCart } = useCart();

  const isLoading = categoryLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      {/* Category Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{category?.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Category Image */}
            {category?.image && (
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover p-3"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
            )}

            {/* Category Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {category?.name}
              </h1>
              <p className="text-green-100 text-lg">
                Browse {category?.name} products
              </p>
              {category?.slug && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {category.slug}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <Subcategories categoryId={categoryId} />

        {products?.data && products.data.length > 0 ? (
          <>
            <div className="border-t border-gray-200 pt-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded"></span>
                <span>Products</span>
              </h3>
              <p className="mb-8 text-gray-600 text-lg">
                Showing {products.data.length} products in this category
              </p>
              <ProductGrid products={products.data} onAddToCart={addToCart} />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-8">
              No products found for this category
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Browse All Products
              <FaAngleRight />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);

  return <CategoryContent categoryId={id} />;
}
