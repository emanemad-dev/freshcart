"use client";

import React from "react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types/product.types";

export function FeaturedProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products?limit=8",
        );
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-12 flex items-center gap-4">
          <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
          <span>
            Featured{" "}
            <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Products
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

