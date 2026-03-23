"use client";

import { useState, useEffect } from "react";
import { ProductMainSection } from "./components/ProductMainSection";
import { ProductTabs } from "./components/ProductTabs";
import { useParams } from "next/navigation";
import { useProduct, useProducts } from "@/features/products/hooks/useProducts";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { FaGem } from "react-icons/fa";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import type { Product } from "@/features/products/types/product.types";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const productQuery = useProduct(id);
  const { data: product, isLoading } = productQuery;
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");

  // State for carousel
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { add: addToCart } = useCart();
  const {
    add: addToWishlist,
    toggle: toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const isProductInWishlist = product
    ? isInWishlist(product._id || product.id || "")
    : false;

  const relatedProductsParams = product?.category?._id
    ? {
        categoryId: product.category._id,
        limit: 8,
        sort: "-sold",
      }
    : null;
  const { data: relatedProducts } = useProducts(relatedProductsParams);

  // Filter related products
  const allRelatedProducts =
    relatedProducts?.data?.filter((p: Product) => p._id !== product?._id) || [];

  // Calculate items per page based on screen size
  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024)
        setItemsPerPage(5); // 5 products on large screens
      else if (window.innerWidth >= 768)
        setItemsPerPage(3); // 3 products on medium screens
      else setItemsPerPage(2); // 2 products on small screens
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allRelatedProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentProducts = allRelatedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h2>
          <p className="text-gray-500">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const category = product.category;
  const subcategory = product.subcategory?.[0];

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </li>
            {category && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <li>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            {subcategory && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <li>
                  <Link
                    href={`/category/${subcategory.slug}`}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              </>
            )}
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="mb-12">
          <ProductMainSection
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            isInWishlist={isProductInWishlist}
          />
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentUser={user}
          />
        </div>

        {/* You May Also Like Section with Carousel */}
        {product.category && allRelatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <FaGem className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  You May Also Like
                </h2>
              </div>

              {/* Navigation Buttons */}
              {totalPages > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    aria-label="Previous products"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    aria-label="Next products"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {" "}
              {currentProducts.map((relatedProduct: Product) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
            </div>

            {/* Page Indicators */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentPage === idx
                        ? "w-6 bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
