"use client";

import { useState } from "react";
import { ProductMainSection } from "./components/ProductMainSection";
import { ProductTabs } from "./components/ProductTabs";
import { useParams } from "next/navigation";
import { useProduct } from "@/features/products/hooks/useProducts";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import type { Product } from "@/features/products/types/product.types";
import { ChevronRight, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Make sure this is a proper React component with a default export
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Trust Badges Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                text: "On orders over $50",
              },
              {
                icon: "🔄",
                title: "30 Days Return",
                text: "Money back guarantee",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                text: "100% secure checkout",
              },
              {
                icon: "⭐",
                title: "24/7 Support",
                text: "Always here to help",
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {badge.title}
                  </p>
                  <p className="text-xs text-gray-500">{badge.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
