"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";

import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { ProductHero } from "./ProductHero";
// import { motion } from "framer-motion";

import { Loader } from "@/shared/components/ui/Loader";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaBox, FaSearch } from "react-icons/fa";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { motion } from "framer-motion";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import Link from "next/link";
import dynamic from "next/dynamic";

// Client-side import فقط
const ProductsContent = dynamic(() => import("./ProductsContent"), {
  ssr: false, // مهم جداً لمنع خطأ useSearchParams
});

export default function ProductsPage() {
  return <ProductsContent />;
}
