import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaEye, FaRetweet, FaStar } from "react-icons/fa";
import { Product } from "../types/product.types";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { isInWishlist, toggle } = useWishlist();
  const productId = product._id || product.id || "";
  const isWishlisted = isInWishlist(productId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      await onAddToCart(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add quick view logic here
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add share logic here
  };

  const renderRatingStars = () => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-3 h-3 ${i < Math.floor(product.ratingsAverage || 0) ? "text-amber-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  const renderDiscountBadge = () => {
    if (!product.priceAfterDiscount) return null;

    const discountPercentage = Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );

    return (
      <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm z-10">
        -{discountPercentage}% off
      </div>
    );
  };

  const renderActionButtons = () => (
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
      <button
        onClick={handleWishlist}
        className={`p-2.5 bg-white rounded-full shadow-md border border-gray-100 ${
          isWishlisted ? "text-red-500" : "text-gray-600"
        }`}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      </button>

      <button
        onClick={handleQuickView}
        className="p-2.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-600"
        aria-label="Quick view"
      >
        <FaEye size={16} />
      </button>

      <button
        onClick={handleShare}
        className="p-2.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-600"
        aria-label="Share product"
      >
        <FaRetweet size={16} />
      </button>
    </div>
  );

  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <Link href={`/products/${product._id}`} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 h-full flex flex-col hover:shadow-lg">
          {/* Image Container - Larger */}
          <div className="relative w-full h-64 bg-gray-50">
            <div className="relative w-full h-full p-6">
              <Image
                src={
                  product.imageCover ||
                  "https://via.placeholder.com/400x400/eeeeee/777?text=Product"
                }
                alt={product.title || product.name || "Product"}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Discount Badge */}
            {renderDiscountBadge()}

            {/* Action Buttons Group - Vertical */}
            {renderActionButtons()}
          </div>

          {/* Content - More space for longer card */}
          <div className="p-5 flex flex-col flex-1">
            {/* Category */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">
                {product.category?.name || "Category"}
              </span>

              {product.quantity > 0 ? (
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Title - Larger */}
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-3">
              {product.title || product.name || "Product Name"}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {renderRatingStars()}
              <span className="text-xs text-gray-400">
                ({product.ratingsQuantity || 0})
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <div>
                {product.priceAfterDiscount ? (
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      EGP {product.priceAfterDiscount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      EGP {product.price.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-gray-900">
                    EGP {product.price?.toLocaleString() || "0"}
                  </p>
                )}
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`text-sm px-5 py-2.5 rounded-lg font-medium transition-all ${
                  product.quantity > 0
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {product.quantity > 0 ? "+ Add" : "Sold out"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
