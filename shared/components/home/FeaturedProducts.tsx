"use client";

import React from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { ProductGrid } from "@/features/products/components/ProductGrid";

export function FeaturedProducts() {
  const { data, isLoading, error } = useProducts();
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">All Products</h2>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">All Products</h2>
          <div className="text-center text-gray-500 py-12">Unable to load products. Please try again later.</div>
        </div>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className="py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">All Products</h2>
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No products found.</div>
        ) : (
          <ProductGrid products={products} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />
        )}
      </div>
    </div>
  );
}
