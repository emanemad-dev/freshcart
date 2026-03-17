"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import {
  ShippingForm,
  PaymentMethod,
  OrderSummary,
} from "@/features/checkout/components";
import { Address } from "@/features/addresses/types/addresses.types";
import { FaArrowLeft, FaShoppingCart, FaTruck } from "react-icons/fa";

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // 🛒 Use cart hook and get `clear`
  const {
    items,
    total,
    cartCount,
    cartId,
    serverCart,
    isLoading: cartLoading,
    clear, // <-- هنا
  } = useCart();

  const { createOrder, isLoading: checkoutLoading } = useCheckout();

  const [formData, setFormData] = useState({
    city: "",
    street: "",
    phone: "",
    paymentMethod: "cash" as "cash" | "card",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    setIsReady(true);
  }, [isAuthenticated, items.length, router]);

  if (!isReady || cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.city || formData.city.length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }
    if (!formData.street || formData.street.length < 10) {
      newErrors.street = "Address details must be at least 10 characters";
    }
    if (!formData.phone || !/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let orderData = { ...formData };

    if (selectedAddress) {
      orderData = {
        city: selectedAddress.city,
        street: selectedAddress.details,
        phone: selectedAddress.phone,
        paymentMethod: formData.paymentMethod,
      };
    }

    if (!orderData.city || !orderData.street || !orderData.phone) {
      alert("Please provide a valid shipping address.");
      return;
    }

    try {
      if (!cartId) {
        alert("Cart not found. Please add items to your cart and try again.");
        return;
      }

      await createOrder(orderData, cartId);

      clear();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePaymentChange = (method: "cash" | "card") => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shopping Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        title="Review & Complete Your Order"
        description="Almost there! Review your items, confirm your shipping details, and choose your payment method. 
  We’ll make sure your order reaches you safely and quickly. 🚚✨"
        icon={<FaTruck className="text-green-600" />}
      />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <FaArrowLeft />
          Back to Cart
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              <ShippingForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                setFormData={setFormData}
                setSelectedAddress={setSelectedAddress}
              />

              <PaymentMethod
                paymentMethod={formData.paymentMethod}
                onChange={handlePaymentChange}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <OrderSummary
                items={items}
                total={total}
                cartCount={cartCount}
                onSubmit={handleSubmit}
                isLoading={checkoutLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
