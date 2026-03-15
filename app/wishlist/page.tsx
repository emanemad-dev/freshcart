"use client";

import Link from "next/link";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { WishlistCard } from "@/features/wishlist/components/WishlistCard";
import { useCart } from "@/features/cart/hooks/useCart";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { WishlistHero } from "./WishlistHero";
import { EmptyWishlist } from "./EmptyWishlist";
import {
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { use } from "react";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const { add: addToCart } = useCart();

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      clear();
    }
  };

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-2xl shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider rounded-tl-2xl">
              Image
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider rounded-tr-2xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items
            .filter((item) => item?.product)
            .map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src={item.product?.imageCover || "/placeholder.jpg"}
                      alt={item.product?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="space-y-1">
                    <Link
                      href={`/products/${item.product?._id}`}
                      className="font-semibold text-gray-900 hover:text-emerald-600 text-base line-clamp-2 block"
                    >
                      {item.product?.title}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {item.product?.category?.name || "Uncategorized"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="space-y-1">
                    {item.product?.priceAfterDiscount ? (
                      <>
                        <span className="text-2xl font-bold text-emerald-600">
                          {item.product.priceAfterDiscount} EGP
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {item.product.price} EGP
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        {item.product?.price} EGP
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      item.product?.quantity && item.product.quantity > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.product?.quantity && item.product.quantity > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(item.product?.ratingsAverage || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-400"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      {item.product?.ratingsAverage || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(item.product!)}
                      className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => remove(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl hover:shadow-md transition-all duration-200"
                      title="Remove from wishlist"
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
        </tbody>
      </table>

      {items.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              <FaTrashAlt className="w-4 h-4" />
              Clear All ({items.length})
            </button>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <FaShoppingCart className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
