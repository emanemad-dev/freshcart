"use client";

import { FC } from "react";
import { FaTruck, FaUndo, FaCreditCard, FaShieldAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { StarRating } from "@/features/products/components/StarRating";
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
  const mainImage = product.imageCover || "/placeholder-image.png";
  const price = product.priceAfterDiscount || product.price;
  const originalPrice = product.priceAfterDiscount ? product.price : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Image */}
      <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <StarRating rating={product.ratingsAverage || 4.8} />
            <span className="text-sm font-medium text-gray-700">
              {product.ratingsQuantity} reviews
            </span>
          </div>
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4">
            {price} EGP
            {originalPrice && (
              <motion.span
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="text-lg text-gray-400 line-through ml-4"
              >
                {originalPrice} EGP
              </motion.span>
            )}
          </div>
          <motion.span
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${
              product.quantity > 0
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </motion.span>
        </div>

        {/* Material Info */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Material:</span> Polyester Blend
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Colour Name:</span> Multicolour
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Department:</span> Women
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center space-x-4">
          <label className="font-medium text-sm text-gray-700">Quantity</label>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            maxQuantity={product.quantity}
          />
          <span className="text-sm text-gray-500">
            {product.quantity} available
          </span>
        </div>

        {/* Total Price */}
        <div className="text-lg border-t pt-4">
          <span className="font-medium">Total Price:</span>
          <span className="ml-2 font-bold text-gray-900">
            {price * quantity} EGP
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              size="lg"
              className="w-full group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6 rounded-2xl"
            >
              <motion.div
                className="flex items-center gap-3 justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <FaShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Add to Cart
              </motion.div>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full border-emerald-400/50 bg-white/20 backdrop-blur-sm text-emerald-100 hover:bg-white/30 hover:text-white border-white/30 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-3 justify-center">
                <FaHeart className="w-6 h-6" />
                Add to Wishlist
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
          <motion.div
            className="flex flex-col items-center text-center group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaTruck className="w-10 h-10 text-emerald-400 group-hover:text-emerald-500 mb-3 transition-all duration-300 animate-bounce [animation-delay:0.1s]" />
            <span className="text-sm font-bold text-gray-800">
              Free Delivery
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <FaUndo className="w-10 h-10 text-emerald-400 group-hover:text-emerald-500 mb-3 transition-all duration-300 animate-bounce [animation-delay:0.2s]" />
            <span className="text-sm font-bold text-gray-800">
              30 Days Return
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <FaCreditCard className="w-10 h-10 text-emerald-400 group-hover:text-emerald-500 mb-3 transition-all duration-300 animate-bounce [animation-delay:0.3s]" />
            <span className="text-sm font-bold text-gray-800">
              Secure Payment
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
          >
            <FaShieldAlt className="w-10 h-10 text-emerald-400 group-hover:text-emerald-500 mb-3 transition-all duration-300 animate-bounce [animation-delay:0.4s]" />
            <span className="text-sm font-bold text-gray-800">
              100% Protected
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
