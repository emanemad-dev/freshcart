"use client";

import Link from "next/link";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useCart } from "@/features/cart/hooks/useCart";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const { add: addToCart } = useCart();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleClearAll = () => setShowClearModal(true);
  const confirmClearAll = () => {
    clear();
    setShowClearModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 px-4">
        <FaHeart className="w-16 h-16 mb-4 text-red-500" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-sm text-center max-w-xs">
          Browse products and add them to your wishlist.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl shadow hover:bg-emerald-600 transition"
        >
          <FaShoppingCart />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-sm text-gray-400 mb-4">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>Home</li>
            <li>/</li>
            <li className="text-gray-700 font-semibold">My Wishlist</li>
          </ol>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
            <FaHeart className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              My Wishlist
            </h1>
            <p className="text-gray-500 text-sm">
              Keep track of your favorite products
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase rounded-tl-2xl">
                Image
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase">
                Product
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase">
                Price
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase">
                Stock
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase">
                Rating
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items
              .filter((item) => item?.product)
              .map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                      <img
                        src={item.product?.imageCover || "/placeholder.jpg"}
                        alt={item.product?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.product?._id}`}
                        className="font-medium text-gray-900 hover:text-emerald-600 text-sm line-clamp-2 block"
                      >
                        {item.product?.title}
                      </Link>
                      <span className="text-xs text-gray-400">
                        {item.product?.category?.name || "Uncategorized"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {item.product?.priceAfterDiscount ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-emerald-600">
                          {item.product.priceAfterDiscount} EGP
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {item.product.price} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">
                        {item.product?.price} EGP
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        item.product?.quantity && item.product.quantity > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.product?.quantity && item.product.quantity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.product?.ratingsAverage || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-300"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        {item.product?.ratingsAverage || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end flex-wrap sm:flex-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item.product!)}
                        className="px-4 py-2 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition shadow"
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          remove(
                            item.product?._id || item.product?.id || item.id,
                          )
                        }
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg hover:shadow transition"
                        title="Remove from wishlist"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>

        {/* Footer Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium text-sm"
          >
            <FaTrashAlt className="w-4 h-4" />
            Clear All ({items.length})
          </button>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium shadow transition"
          >
            <FaShoppingCart className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Modal */}
        <Modal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          title="Clear Wishlist?"
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove {items.length} item(s) from your
            wishlist? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end flex-wrap sm:flex-nowrap">
            <Button
              variant="outline"
              onClick={() => setShowClearModal(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmClearAll}
              className="px-6 bg-red-500 hover:bg-red-600"
            >
              Clear All
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
