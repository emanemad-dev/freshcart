"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Note: install if missing: npm i framer-motion
import { WishlistItem as WishlistItemType } from "../types/wishlist.types";
import { Product } from "@/features/products/types/product.types";
import { FaHeart, FaShoppingCart, FaTrashAlt, FaStar } from "react-icons/fa";
import { useState } from "react";

interface WishlistCardProps {
  item: WishlistItemType;
  onRemove?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const WishlistCard = ({
  item,
  onRemove,
  onAddToCart,
}: WishlistCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!item?.product) {
    return (
      <motion.div className="group bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 shadow-lg rounded-2xl p-8 flex items-center justify-center h-80 md:h-96">
        <div className="text-center text-gray-500">
          <FaHeart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold mb-2">Product Unavailable</h3>
          <p className="text-sm">This product may have been removed.</p>
        </div>
      </motion.div>
    );
  }

  const product = item.product!;
  const productImage =
    product.imageCover || product.image || "/placeholder-product.jpg";
  const productId = product.id || product._id || "";
  const productName = product.name || product.title || "Unnamed Product";
  const productPrice = product.price || 0;
  const priceAfterDiscount = product.priceAfterDiscount || productPrice;
  const hasDiscount = priceAfterDiscount < productPrice;
  const productSlug = product.slug || productId;
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "Uncategorized";
  const inStock = product.quantity && product.quantity > 0;
  const rating = product.ratingsAverage || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(productId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:border-emerald-400/50"
    >
      {/* Image with Overlay */}
      <div className="relative h-64 md:h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={productImage}
          alt={productName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Stock Ribbon */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            inStock ? "bg-emerald-500 text-white" : "bg-red-500/90 text-white"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-end p-6 opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-emerald-500/90 hover:bg-emerald-600 text-white p-3 rounded-xl backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 flex items-center gap-2"
              title="Add to Cart"
            >
              <FaShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={handleRemove}
              className="bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-xl backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 flex items-center gap-2"
              title="Remove from Wishlist"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Heart Indicator */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-lg hover:scale-110 transition-all">
          <FaHeart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/categories`}
            className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium"
          >
            {categoryName}
          </Link>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`w-3 h-3 ${i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>

        <Link href={`/products/${productSlug}`} className="block mb-3 h-12">
          <h3 className="font-bold text-lg md:text-xl text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {productName}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-end gap-2 mb-6">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through font-medium">
                {productPrice.toLocaleString()} EGP
              </span>
            )}
            <span className="text-2xl font-black text-emerald-600">
              {priceAfterDiscount.toLocaleString()} EGP
            </span>
            {hasDiscount && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                -{Math.round((1 - priceAfterDiscount / productPrice) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <FaShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleRemove}
            className="p-3 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FaTrashAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
