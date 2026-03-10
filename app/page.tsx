"use client";
// Home Page
import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { ProductCard } from "@/features/products/components/ProductCard";
import { FeatureSection } from "@/shared/components/layout/FeatureSection";
import { FaArrowRight } from "react-icons/fa";
import { NewsletterSection } from "@/shared/components/layout/NewsletterSection";

export default function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );
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
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      {/* <section className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to FreshCart
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop shop for all your needs. Fresh products, great prices, fast delivery.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-green-600 border-white hover:bg-white ">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
             <Button
                size="lg"
                className="bg-transparent text-white border border-white hover:bg-white hover:text-green-600"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      <section className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight transform transition-transform duration-700 hover:scale-105">
            Welcome to FreshCart
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90 transition-opacity duration-500 hover:opacity-100">
            Your one-stop shop for all your needs. Fresh products, great prices,
            fast delivery.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="text-green-600 border-white 
             hover:bg-white hover:text-green-700 
             transition-transform duration-500 ease-in-out 
             shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Shop Now
              </Button>
            </Link>

            <Link href="/categories">
              <Button
                size="lg"
                className="bg-transparent text-white border border-white 
             hover:bg-white hover:text-green-700 
             transition-transform duration-500 ease-in-out 
             shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-green-700/20 via-green-600/10 to-green-800/30 pointer-events-none animate-pulse-slow"></div>
      </section>
      {/* FeatureSection */}
      <section className="py-16 w-full bg-gray-50">
        <FeatureSection />
      </section>

      {/* Categories Preview */}
      <section className="py-16 w-full bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12 flex items-center gap-4">
            <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
            <span>
              Shop by{" "}
              <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                Category
              </span>
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">
                No categories found.
              </div>
            ) : (
              categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug}`}
                  className="group block bg-white p-6 rounded-2xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto mb-4 h-20 w-20 object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="font-semibold text-gray-800 text-lg transition-colors duration-300 group-hover:text-black">
                    {category.name}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      {/* 2Card */}

      <section className="py-12 w-full bg-gray-50 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* card1 */}
          <div className="bg-gradient-to-r from-[#00BC7D] to-[#007A55] p-10 rounded-2xl shadow-xl flex-1 hover:scale-105 transform transition-all duration-500">
            <div className="flex items-center mb-6">
              <p className="text-white bg-white/30 rounded-full px-5 py-1">
                🔥 Deal of the Day
              </p>
            </div>

            <h3 className="text-3xl font-bold mb-3 text-white">
              Fresh Organic Fruits
            </h3>
            <p className="text-white/70 font-semibold mb-4">
              Get up to 40% off on selected organic fruits
            </p>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-white font-bold text-3xl py-2">
                40% OFF
              </span>
              <span className="text-white/70 font-semibold">
                Use code:{" "}
                <span className="font-bold text-white">ORGANIC40</span>
              </span>
            </div>

            <button className="bg-white text-green-500 px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-semibold flex items-center gap-2">
              Shop Now
              <FaArrowRight />
            </button>
          </div>
          {/* card2 */}
          <div className="bg-gradient-to-r from-[#FF8904] to-[#FF2056] p-10 rounded-2xl shadow-xl flex-1 hover:scale-105 transform transition-all duration-500">
            <div className="flex items-center mb-6">
              <p className="text-white bg-white/30 rounded-full px-5 py-1">
                🔥New Arrivals
              </p>
            </div>

            <h3 className="text-3xl font-bold mb-3 text-white">
              Exotic Vegetables
            </h3>
            <p className="text-white/70 font-semibold mb-4">
              Discover our latest collection of premium vegetables
            </p>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-white font-bold text-3xl py-2">
                25% OFF
              </span>
              <span className="text-white/70 font-semibold">
                Use code:{" "}
                <span className="font-bold text-white">ORGANIC40</span>
              </span>
            </div>

            <button className="bg-white text-orange-500 px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-semibold flex items-center gap-2">
              Explore Now
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
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
              products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
 {/* Newsletter & Mobile App Section */}
      <NewsletterSection />

    </div>
  );
}
