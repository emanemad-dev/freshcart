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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Product not found
      </div>
    );
  }

  // هنا الـ breadcrumb مباشرة
  const category = product.category;
  const subcategory = product.subcategory?.[0];

  return (
    
    <div className="mx-auto px-4 py-8 space-y-8">
      <nav className="text-sm mb-4">
        <ul className="flex flex-wrap gap-2 text-gray-600">
          <li>
            <a href="/">Home</a>
            <span className="mx-1">/</span>
          </li>
          {category && (
            <li>
              <a href={`/category/${category.slug}`}>{category.name}</a>
              <span className="mx-1">/</span>
            </li>
          )}
          {subcategory && (
            <li>
              <a href={`/category/${subcategory.slug}`}>{subcategory.name}</a>
              <span className="mx-1">/</span>
            </li>
          )}
          <li className="font-semibold">{product.title}</li>
        </ul>
      </nav>

      <ProductMainSection
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={isProductInWishlist}
      />

      <ProductTabs
        product={product}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={user}
      />
    </div>
  );
}
