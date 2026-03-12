"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaHeart } from "react-icons/fa";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

interface ExtendedCartItem {
  id?: string;
  product: {
    _id?: string;
    id?: string;
    imageCover?: string;
    image?: string;
    name?: string;
    title?: string;
    price: number;
    priceAfterDiscount?: number;
    category?: { name: string };
  };
  quantity?: number;
  count?: number;
}

interface CartCardProps {
  item: ExtendedCartItem;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  index: number;
}

export const CartCard = ({
  item,
  onUpdateQuantity,
  onRemove,
  index,
}: CartCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const productImage = item.product.imageCover || item.product.image || null;
  const productId = item.product._id || item.product.id || item.id || "";
  const productName =
    item.product.name || item.product.title || "Unnamed Product";
  const quantity = item.quantity || item.count || 1;
  const price = item.product.price || 0;
  const discountPrice = item.product.priceAfterDiscount || price;
  const totalPrice = discountPrice * quantity;
  const { isInWishlist, toggle } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle({ id: productId, product: item.product } as any);
  };

  const handleIncrement = () => onUpdateQuantity?.(productId, quantity + 1);
  const handleDecrement = () =>
    quantity > 1 && onUpdateQuantity?.(productId, quantity - 1);
  const handleRemove = () => onRemove?.(productId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl rounded-3xl p-6 transition-all duration-500 hover:border-emerald-400/50 overflow-hidden"
    >
      <div className="flex gap-6">
        {/* Image with Overlay */}
        <div className="relative h-32 w-32 md:h-36 md:w-36 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {productImage ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium">
                No Image
              </span>
            </div>
          )}

          {/* Wishlist Heart */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleWishlistToggle}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 mx-2"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FaHeart
                className={`w-6 h-6 transition-all ${isWishlisted ? "text-red-500 fill-current" : "text-gray-400"}`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="space-y-2">
            <Link
              href={`/products/${productId}`}
              className="block text-lg md:text-xl font-bold text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors group-hover:font-black"
            >
              {productName}
            </Link>

            <p className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full w-fit font-medium">
              {item.product.category?.name || "Shopping Cart"}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mt-auto">
            <div className="flex flex-col items-end">
              {discountPrice < price ? (
                <>
                  <span className="text-2xl font-black text-emerald-600">
                    EGP {totalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    EGP {(price * quantity).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-black text-gray-800">
                  EGP {totalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all">
              <button
                onClick={handleDecrement}
                className="p-2 hover:bg-emerald-100 rounded-xl transition-colors hover:scale-105"
                aria-label="Decrease"
              >
                <FaMinus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-12 text-center font-bold text-lg text-gray-800 px-4">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-2 hover:bg-emerald-100 rounded-xl transition-colors hover:scale-105"
                aria-label="Increase"
              >
                <FaPlus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRemove}
          className="group/remove self-start p-4 bg-white/70 hover:bg-red-50 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl border border-gray-200 hover:border-red-300 transition-all duration-300 hover:-rotate-180"
          title="Remove item"
        >
          <FaTrash className="w-6 h-6 text-gray-500 group-hover/remove:text-red-500 group-hover/remove:fill-current transition-all duration-300" />
        </motion.button>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/50 to-transparent rounded-b-3xl"></div>
    </motion.div>
  );
};
