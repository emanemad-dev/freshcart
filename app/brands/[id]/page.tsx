"use client";

import { use } from "react";
import Link from "next/link";
import { useBrand } from "@/features/brands/hooks/useBrands";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useCart } from "@/features/cart/hooks/useCart";
import { Loader } from "@/shared/components/ui/Loader";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

interface BrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

function BrandContent({ brandId }: { brandId: string }) {
  const { data: brand, isLoading: brandLoading } = useBrand(brandId);
  const { data: products, isLoading: productsLoading } = useProducts({
    brandId: brandId,
  });
  const { add: addToCart } = useCart();

  const isLoading = brandLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      {/* Brand Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{brand?.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Brand Image */}
            {brand?.image && (
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
            )}

            {/* Brand Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {brand?.name}
              </h1>
              <p className="text-green-100 text-lg">
                Shop {brand?.name} products
              </p>
              {brand?.slug && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {brand.slug}
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
            {brand?.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                width={20}
                height={20}
                className="object-contain"
              />
            )}
            <span className="text-green-700 font-medium">{brand?.name}</span>
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
              No products found for this brand
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function BrandPage({ params }: BrandPageProps) {
  const { id } = use(params);

  return <BrandContent brandId={id} />;
}
