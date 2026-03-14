import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaEye, FaRetweet, FaStar } from "react-icons/fa";
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
    router.push(`/products/${product._id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl = `${window.location.origin}/products/${product._id}`;

    if (navigator.share) {
      navigator
        .share({
          title: product.title || product.name,
          url: productUrl,
          text: `Check out ${product.title || product.name}`,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(productUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const renderRatingStars = () => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(product.ratingsAverage || 0) ? "text-amber-400 fill-current" : "text-gray-300"}`}
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
      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg z-10">
        -{discountPercentage}%
      </div>
    );
  };

  const renderActionButtons = () => (
    <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
      <button
        onClick={handleWishlist}
        className={`p-2 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all ${
          isWishlisted
            ? "text-red-500 hover:bg-red-50"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
      </button>

      <button
        onClick={handleQuickView}
        className="p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg transition-all"
        aria-label="Quick view"
      >
        <FaEye size={14} />
      </button>

      <button
        onClick={handleShare}
        className="p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg transition-all"
        aria-label="Share product"
        title="Share"
      >
        <FaRetweet size={14} />
      </button>
    </div>
  );

  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <div className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 h-full flex flex-col hover:shadow-md hover:shadow-emerald-100/30">
          {/* Image Container */}
          <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-emerald-50/30">
            <div
              className="relative w-full h-full p-4 cursor-pointer"
              onClick={() => router.push(`/products/${product._id}`)}
            >
              <Image
                src={
                  product.imageCover ||
                  "https://via.placeholder.com/400x400/eeeeee/777?text=Product"
                }
                alt={product.title || product.name || "Product"}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Discount Badge */}
            {renderDiscountBadge()}

            {/* Action Buttons */}
            {renderActionButtons()}
          </div>

          {/* Content */}
          <div className="p-3 flex flex-col flex-1">
            {/* Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">
                {product.category?.name || "Category"}
              </span>

              {product.quantity > 0 ? (
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Title */}
            <div
              className="cursor-pointer mb-2"
              onClick={() => router.push(`/products/${product._id}`)}
            >
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {product.title || product.name || "Product Name"}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              {renderRatingStars()}
              <span className="text-xs text-gray-500 font-medium">
                ({product.ratingsQuantity || 0})
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <div>
                {product.priceAfterDiscount ? (
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      EGP {product.priceAfterDiscount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      EGP {product.price.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-base font-bold text-gray-900">
                    EGP {product.price?.toLocaleString() || "0"}
                  </p>
                )}
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`text-xl w-10 h-10 rounded-full font-bold transition-all flex items-center justify-center ${
                  product.quantity > 0
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {product.quantity > 0 ? "+" : "!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
