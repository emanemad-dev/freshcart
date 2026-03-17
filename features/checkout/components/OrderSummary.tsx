"use client";

import Image from "next/image";
import { FaLock, FaShippingFast, FaUndo } from "react-icons/fa";

interface CartItem {
  product: {
    imageCover?: string;
    image?: string;
    title?: string;
    name?: string;
    price?: number;
  };
  quantity?: number;
  count?: number;
}

interface OrderSummaryProps {
  items: CartItem[] | unknown[];
  total: number;
  cartCount: number;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function OrderSummary({
  items,
  total,
  cartCount,
  onSubmit,
  isLoading,
}: OrderSummaryProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white px-5 py-3">
        <h2 className="font-semibold">Order Summary</h2>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-4">
          {cartCount || items.length} items in your order
        </p>

        {/* Items */}
        <div className="space-y-4 mb-5 max-h-72 overflow-y-auto pr-1">
          {items.map((item: unknown, index: number) => {
            const cartItem = item as CartItem;

            const productImage =
              cartItem.product?.imageCover ||
              cartItem.product?.image ||
              "/placeholder.jpg";

            const productName =
              cartItem.product?.title || cartItem.product?.name || "Product";

            const price = cartItem.product?.price || 0;
            const quantity = cartItem.quantity || cartItem.count || 1;

            return (
              <div key={index} className="flex items-center gap-3">
                {/* Image */}
                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-gray-100 border">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {quantity} × {price} EGP
                  </p>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold text-gray-800">
                  {(price * quantity).toFixed(0)} EGP
                </p>
              </div>
            );
          })}
        </div>

        {/* Delivery Info */}
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-5">
          Free delivery on this order 🚚
        </div>

        {/* Prices */}
        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{total.toFixed(2)} EGP</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
          <span className="font-medium text-gray-800">Total</span>
          <span className="text-xl font-bold text-green-600">
            {total.toFixed(2)} EGP
          </span>
        </div>

        {/* Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>

        {/* Features Section */}
        <div className="flex justify-between items-center mt-6 px-5 py-4 bg-green-50 rounded-xl shadow-sm text-sm">
          <div className="flex flex-col items-center gap-1">
            <FaLock className="text-green-600 text-2xl" />
            <span className="font-medium text-gray-700">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaShippingFast className="text-blue-500 text-2xl" />
            <span className="font-medium text-gray-700">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaUndo className="text-orange-500 text-2xl" />
            <span className="font-medium text-gray-700">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
