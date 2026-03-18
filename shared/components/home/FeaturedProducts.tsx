"use client";

import React from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { ProductGrid } from "@/features/products/components/ProductGrid";

export function FeaturedProducts() {
  const { data, isLoading, error } = useProducts();
  const { add: addToCart } = useCart();

  if (isLoading) {
    return (
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-left mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black flex items-center gap-4 leading-tight">
            <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                Products
              </span>
            </span>
          </h2>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-left mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black flex items-center gap-4 leading-tight">
            <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                Products
              </span>
            </span>
          </h2>
        </div>
        <div className="text-center text-gray-500 py-12 lg:py-16 text-lg">
          Unable to load products. Please try again later.
        </div>
      </section>
    );
  }

  const products = data?.data || [];

  return (
    <section className="py-16 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-left mb-12 lg:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black flex items-center gap-4 leading-tight">
          <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
          <span>
            Our{" "}
            <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Products
            </span>
          </span>
        </h2>
      </div>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-12 lg:py-16 text-lg">
          No products found.
        </div>
      ) : (
        <ProductGrid products={products} onAddToCart={addToCart} />
      )}
    </section>
  );
}
