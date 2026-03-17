"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import { Button } from "@/shared/components/ui/Button";
import { QuantitySelector } from "@/features/products/components/QuantitySelector";
import type { Product } from "@/features/products/types/product.types";

interface ProductMainSectionProps {
  product: Product;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export const ProductMainSection: FC<ProductMainSectionProps> = ({
  product,
  quantity,
  onQuantityChange,
}) => {
  const images = product.images?.length ? product.images : [product.imageCover];
  const [mainImage, setMainImage] = useState(images[0]);

  const price = product.priceAfterDiscount || product.price;
  const originalPrice = product.priceAfterDiscount ? product.price : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      {/* Images */}
      <div>
        <div className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50 mb-4 border">
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImage}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={mainImage}
                alt={product.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition
          ${
            mainImage === img
              ? "border-emerald-500 shadow-sm"
              : "border-gray-200"
          }`}
            >
              <Image
                src={img}
                alt=""
                fill
                style={{ objectFit: "contain" }}
                className="bg-gray-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Tags */}
        <div className="flex gap-2 text-xs">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {product.category?.name}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {product.brand?.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 leading-snug">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 text-yellow-500 text-sm">
          ⭐ {product.ratingsAverage?.toFixed(1) || 5}
          <span className="text-gray-500">
            ({product.ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-extrabold text-emerald-600">
            {price} EGP
          </span>

          {originalPrice && (
            <span className="text-gray-400 line-through text-lg">
              {originalPrice} EGP
            </span>
          )}
        </div>

        {/* Stock */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            product.quantity > 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Quantity</span>

          <QuantitySelector
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            maxQuantity={product.quantity}
          />

          <span className="text-gray-500 text-sm">
            {product.quantity} available
          </span>
        </div>

        {/* Total */}
        <div className="text-lg">
          Total:
          <span className="font-bold text-gray-900 ml-2">
            {price * quantity} EGP
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm">
            <FaShoppingCart />
            Add to Cart
          </Button>

          <Button className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl">
            Buy Now
          </Button>
        </div>

        {/* Wishlist */}
        <Button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl flex items-center justify-center gap-2">
          <FaHeart />
          Add to Wishlist
        </Button>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-6 bg-gray-50 p-4 rounded-xl text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaTruck className="text-emerald-500" />
            Free Delivery
          </div>

          <div className="flex items-center gap-2">
            <FaUndo className="text-emerald-500" />
            30 Days Return
          </div>

          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-emerald-500" />
            Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};
