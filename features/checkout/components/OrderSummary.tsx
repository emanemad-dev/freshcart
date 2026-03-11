"use client";

import Image from "next/image";
import { FaLock, FaShippingFast, FaUndo } from "react-icons/fa";

interface CartItem {
  product: {
    _id?: string;
    id?: string;
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
        <h2 className="text-lg font-semibold text-white">Order Summary</h2>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{cartCount || items.length} items</p>

        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
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
              <div key={index} className="flex gap-3">
                <div className="relative h-16 w-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {quantity} x {price} EGP
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {price * quantity} EGP
                </p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-800">
              {total.toFixed(2)} EGP
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-green-600">
              {total.toFixed(2)} EGP
            </span>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="text-center">
            <FaLock className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500">Secure</span>
          </div>
          <div className="text-center">
            <FaShippingFast className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500">Fast Delivery</span>
          </div>
          <div className="text-center">
            <FaUndo className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
