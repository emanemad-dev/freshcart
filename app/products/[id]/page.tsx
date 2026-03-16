"use client";

import { useState } from "react";
import { ProductDetailHero } from "./ProductDetailHero";
import { ProductMainSection } from "./components/ProductMainSection";
import { ProductTabs } from "./components/ProductTabs";
import { useParams } from "next/navigation";
import { useProduct } from "@/features/products/hooks/useProducts";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Product } from "@/features/products/types/product.types";
import type { User } from "@/features/auth/types/auth.types";

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

  return (
    <div className=" mx-auto px-4 py-8 space-y-8">
      <ProductDetailHero product={product} />
      <ProductMainSection
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
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
