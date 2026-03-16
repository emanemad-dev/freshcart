"use client";

import { useBrands } from "@/features/brands/hooks/useBrands";
import { BrandCard } from "@/features/brands/components/BrandCard";
import { PageHeader } from "@/shared/components/layout/PageHeader";

export default function BrandsPage() {
  const { data: brands, isLoading } = useBrands();

  return (
    <>
      <PageHeader
        title="Brands"
        description="Discover top brands and their amazing products"
        icon={
          <svg
            className="w-7 h-7 text-emerald-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 01-2 0V6H3a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.832 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2zm-1 17a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-16 text-gray-400 text-lg">
                Loading brands...
              </div>
            ) : brands && brands.length > 0 ? (
              brands.map((brand) => <BrandCard key={brand._id} brand={brand} />)
            ) : (
              <div className="col-span-full text-center py-16 text-gray-400 text-lg">
                No brands available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
