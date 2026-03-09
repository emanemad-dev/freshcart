"use client";
// Home Page
import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { ProductCard } from "@/features/products/components/ProductCard";

export default function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/products?limit=8');
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to FreshCart
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop shop for all your needs. Fresh products, great prices, fast delivery.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-blue-600 border-white hover:bg-white hover:text-blue-600">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">No products found.</div>
            ) : (
              products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">No categories found.</div>
            ) : (
              categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
                >
                  <img src={category.image} alt={category.name} className="mx-auto mb-4 h-16 w-16 object-cover rounded-full" />
                  <h3 className="font-semibold">{category.name}</h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

