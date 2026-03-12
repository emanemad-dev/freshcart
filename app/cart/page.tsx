// Cart Page
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { CartCard } from "@/features/cart/components/CartCard";
import { CartHero } from "./CartHero";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import {
  FaShoppingCart,
  FaCheck,
  FaShippingFast,
  FaGift,
  FaUser,
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

// Helper to get cart item key
const getCartItemKey = (item: {
  id?: string;
  product?: { _id?: string; id?: string };
}): string => {
  return (
    item.id || item.product?._id || item.product?.id || Math.random().toString()
  );
};

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success";
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        <div className="flex items-center gap-4 mb-4">
          {variant === "danger" ? (
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheck className="w-6 h-6 text-green-600" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  const router = useRouter();
  const { items, total, remove, update, clear, cartCount } = useCart();
  const { isAuthenticated } = useAuthStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clear();
    setShowClearModal(false);
  };

  const handleDeleteItem = (productId: string) => {
    setDeleteItemId(productId);
  };

  const confirmDeleteItem = () => {
    if (deleteItemId) {
      remove(deleteItemId);
      setDeleteItemId(null);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <CartHero />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
            <button
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Cart" }]}
        title="Shopping Cart"
        icon={<FaShoppingCart />}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleContinueShopping}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <FaTrash className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {items.map((item, index) => (
              <CartCard
                key={getCartItemKey(item)}
                item={item}
                onUpdateQuantity={update}
                onRemove={handleDeleteItem}
                index={index}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* Subtotal */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Subtotal ({cartCount || items.length} items)
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      {total.toFixed(2)} EGP
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {total.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-4"
                >
                  Checkout
                </button>

                {/* Guest Checkout */}
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-white border-2 border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all mb-6"
                >
                  Continue as Guest
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mb-6">
                  Don't have an account?{" "}
                  <button
                    onClick={handleSignUp}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </p>

                {/* Benefits */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Your cart items will be saved
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaShippingFast className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Track your orders easily
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaGift className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Access exclusive member deals
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Manage your profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Delete Item Modal */}
      <Modal
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={confirmDeleteItem}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}
