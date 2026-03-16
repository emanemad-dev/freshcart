"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaEye,
  FaSyncAlt,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { Product } from "../types/product.types";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const router = useRouter();
  const { isInWishlist, toggle } = useWishlist();

  const productId = product._id || product.id || "";
  const isWishlisted = isInWishlist(productId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const renderStars = () => {
    const rating = product.ratingsAverage || 0;

    return (
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < Math.floor(rating) ? "fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 relative transition-all hover:shadow-md">
      {/* Action Icons */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
        <button
          onClick={handleWishlist}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 transition"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-gray-600 text-sm" />
          )}
        </button>

        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <FaSyncAlt className="text-gray-600 text-sm" />
        </button>

        <button
          onClick={handleQuickView}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <FaEye className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* Image */}
      <div
        className="flex justify-center mb-4 cursor-pointer overflow-hidden"
        onClick={() => router.push(`/products/${productId}`)}
      >
        <Image
          src={
            product.imageCover ||
            "https://via.placeholder.com/300x300/eeeeee/777?text=Product"
          }
          alt={product.title || product.name || "Product"}
          width={160}
          height={160}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Category */}
      <p className="text-xs text-gray-500 mb-1">
        {product.category?.name || "Women's Fashion"}
      </p>

      {/* Title */}
      <h3
        onClick={() => router.push(`/products/${productId}`)}
        className="font-semibold text-gray-800 mb-2 cursor-pointer line-clamp-1 transition-colors duration-300 group-hover:text-emerald-600"
      >
        {product.title || product.name || "Product Name"}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        {renderStars()}
        <span className="text-sm text-gray-500">
          {product.ratingsAverage || 0} ({product.ratingsQuantity || 0})
        </span>
      </div>

      {/* Price + Add To Cart */}
      <div className="flex items-center justify-between">
        <div>
          {product.priceAfterDiscount ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                {product.priceAfterDiscount} EGP
              </p>
              <p className="text-xs text-gray-400 line-through">
                {product.price} EGP
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-900">
              {product.price} EGP
            </p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition
          ${
            product.quantity > 0
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
