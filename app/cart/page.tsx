"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import {
  FaShoppingCart,
  FaCheck,
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
  FaLock,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";

const getCartItemKey = (item: any): string => {
  return (
    item.id ||
    item._id ||
    item.product?._id ||
    item.product?.id ||
    Math.random().toString()
  );
};

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        <div className="flex gap-3 items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <FaExclamationTriangle className="text-red-500" />
          </div>

          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition"
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
  const {
    items,
    total,
    cartId,
    serverCart,
    remove,
    update,
    clear,
    loading,
    error: cartError,
  } = useCart();
  const { isAuthenticated } = useAuthStore();

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce((sum: number, item) => {
    const price =
      item.product?.priceAfterDiscount ??
      item.product?.price ??
      item.price ??
      0;
    return sum + price * (item.count || 0);
  }, 0);

  const shipping = 0;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal,
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - discount + shipping;

  const handleCheckout = () => {
    if (isAuthenticated) router.push("/checkout");
    else router.push("/login");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const confirmDeleteItem = () => {
    if (deleteItemId) {
      remove(deleteItemId); // Now passes string itemId correctly
      setDeleteItemId(null);
    }
  };

  const confirmClearCart = () => {
    clear();
    setShowClearModal(false);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 px-4">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaBoxOpen className="text-5xl text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Browse our products and add some items to your cart to start shopping.
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
    <>
      <PageHeader
        breadcrumbs={[{ label: "Cart" }]}
        title="Shopping Cart"
        description="Review your items"
        icon={<FaShoppingCart className="text-3xl" />}
        backgroundColor="bg-gradient-to-r from-emerald-600 to-green-600"
        contentOffset="pb-24"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {cartError && (
            <div className="lg:col-span-12 mb-4">
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                <FaExclamationTriangle />
                <span>{cartError}</span>
                <button
                  onClick={() => window.location.reload()}
                  className="ml-auto text-sm underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Cart ({items.length} {items.length === 1 ? "item" : "items"})
              </h2>

              <button
                onClick={() => setShowClearModal(true)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition font-medium"
              >
                <FaTrash className="text-sm" />
                Clear all items
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => {
                const itemId = item.id || item._id || getCartItemKey(item);
                console.log("🛒 Update attempt:", {
                  itemId,
                  itemProductId: item.product?._id || item.product?.id,
                  isServerCart: !!serverCart?._id,
                  cartId: serverCart?._id,
                });
                const product = item.product;
                const originalPrice = product?.price ?? 0;
                const discountedPrice =
                  product?.priceAfterDiscount ?? item.price ?? 0;
                const currentPrice = discountedPrice || originalPrice;
                const hasDiscount =
                  discountedPrice > 0 && discountedPrice < originalPrice;
                const itemCount = item.count || 1;

                return (
                  <div
                    key={itemId}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product?.imageCover || "/placeholder.jpg"}
                          alt={product?.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.jpg";
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">
                              {product?.title || "Product"}
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {product?.category?.name || "Uncategorized"} •
                              SKU: {itemId.slice(-6) || "N/A"}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-bold text-emerald-600">
                                {currentPrice.toFixed(2)} EGP
                              </span>
                              {hasDiscount && (
                                <>
                                  <span className="text-sm text-gray-400 line-through">
                                    {originalPrice.toFixed(2)} EGP
                                  </span>
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                    Save{" "}
                                    {Math.round(
                                      ((originalPrice - discountedPrice) /
                                        originalPrice) *
                                        100,
                                    )}
                                    %
                                  </span>
                                </>
                              )}
                              <span className="text-xs text-gray-400">
                                per unit
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">
                                Quantity:
                              </span>
                              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => {
                                    const newCount = Math.max(1, itemCount - 1);
                                    update(item, newCount);
                                  }}
                                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition font-bold w-8 disabled:opacity-50"
                                  disabled={loading}
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 font-semibold border-x border-gray-300 min-w-[40px] text-center">
                                  {itemCount}
                                </span>
                                <button
                                  onClick={() => {
                                    const newCount = itemCount + 1;
                                    update(item, newCount);
                                  }}
                                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition font-bold w-8 disabled:opacity-50"
                                  disabled={loading}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={() =>
                                setDeleteItemId(item.id || item._id)
                              }
                              className="text-red-500 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                              title="Remove item"
                              disabled={loading}
                            >
                              <FaTrash />
                            </button>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Total</div>
                              <div className="font-bold text-lg">
                                {(itemCount * currentPrice).toFixed(2)} EGP
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-600">
                  {items.length} {items.length === 1 ? "item" : "items"} in your
                  cart
                </span>
              </div>

              {remainingForFreeShipping > 0 ? (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <FaTruck />
                    <span className="font-medium">Free Shipping!</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Add {remainingForFreeShipping.toFixed(2)} EGP more to
                    qualify for free delivery
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <FaCheck />
                    <span className="font-medium">
                      You qualify for free delivery!
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    {subtotal.toFixed(2)} EGP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{discount.toFixed(2)} EGP</span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Apply Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        promoApplied
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                      <FaCheck className="text-xs" />
                      Promo code applied successfully!
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600">
                      {finalTotal.toFixed(2)} EGP
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition mb-3 flex items-center justify-center gap-2"
              >
                <FaLock className="text-sm" />
                Secure Checkout
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <FaLock /> Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <FaTruck /> Fast Delivery
                </span>
              </div>

              <button
                onClick={handleContinueShopping}
                className="w-full border border-emerald-500 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={confirmDeleteItem}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
      />

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </>
  );
}
