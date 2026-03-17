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
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isInWishlist: boolean;
}

export const ProductMainSection: FC<ProductMainSectionProps> = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  const images = product.images?.length ? product.images : [product.imageCover];
  const [mainImage, setMainImage] = useState(images[0]);

  const price = product.priceAfterDiscount || product.price;
  const originalPrice = product.priceAfterDiscount ? product.price : null;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 md:gap-8 lg:gap-12 mb-16">
      {/* Images  */}
      <div className="w-full mx-auto max-w-[400px]">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F9FAFB] border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImage + "-main"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails slider */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(img)}
              className={`flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 transform hover:scale-105
      ${
        mainImage === img
          ? "border-emerald-500 shadow-md hover:shadow-lg"
          : "border-gray-200 hover:shadow-sm hover:border-gray-300"
      }`}
            >
              <Image
                src={img}
                alt={`image-${idx}`}
                fill
                className="object-contain bg-[#F9FAFB]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details*/}
      <div className="space-y-5 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-xs">
          <span className="bg-emerald-100/80 text-emerald-700 px-3 py-1 rounded-full">
            {product.category?.name}
          </span>
          <span className="bg-gray-100/80 text-gray-700 px-3 py-1 rounded-full">
            {product.brand?.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 justify-center lg:justify-start text-yellow-500 text-sm">
          ⭐ {product.ratingsAverage?.toFixed(1) || 5}
          <span className="text-gray-500">
            ({product.ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-600">
            {price} EGP
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm sm:text-lg">
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
        <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
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
        <div className="text-lg text-center lg:text-left">
          Total:
          <span className="font-bold text-gray-900 ml-2">
            {price * quantity} EGP
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <Button
            onClick={onAddToCart}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >
            <FaShoppingCart />
            Add to Cart
          </Button>

          <Button className="flex-1 bg-gray-900 text-white py-3 rounded-xl shadow-lg">
            Buy Now
          </Button>
        </div>

        {/* Wishlist */}
        <Button
          onClick={onAddToWishlist}
          className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl flex items-center justify-center gap-2"
        >
          <FaHeart
            className={
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm text-sm text-gray-700">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaTruck className="text-emerald-500 w-5 h-5" />
            Free Delivery
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaUndo className="text-emerald-500 w-5 h-5" />
            30 Days Return
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaShieldAlt className="text-emerald-500 w-5 h-5" />
            Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};
