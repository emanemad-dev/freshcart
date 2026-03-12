"use client";

import { use } from "react";
import Link from "next/link";
import { useCategory } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useCart } from "@/features/cart/hooks/useCart";
import { Loader } from "@/shared/components/ui/Loader";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

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
        {/* Active Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <FaFilter className="text-green-600" />
            <span>Active Filters:</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
            {category?.image && (
              <Image
                src={category.image}
                alt={category.name}
                width={20}
                height={20}
                className="object-cover rounded-full"
              />
            )}
            <span className="text-green-700 font-medium">{category?.name}</span>
            <button
              onClick={() => window.history.back()}
              className="ml-1 text-green-500 hover:text-green-700"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {products?.data && products.data.length > 0 ? (
          <>
            <p className="mb-4 text-gray-600">
              Showing {products.data.length} products
            </p>
            <ProductGrid products={products.data} onAddToCart={addToCart} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found for this category
            </p>
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
