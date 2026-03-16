"use client";

import { useState } from "react";
import { Order } from "../types/orders.types";
import {
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaPhone,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  /* -------- ORDER STATUS FROM API -------- */
  const getOrderStatus = () => {
    if (order.isDelivered) return "delivered";
    if (order.isPaid) return "processing";
    return "pending";
  };

  const status = getOrderStatus();

  const statusColors: any = {
    pending: "bg-yellow-50 text-yellow-600",
    processing: "bg-orange-50 text-orange-600",
    shipped: "bg-blue-50 text-blue-600",
    delivered: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-red-50 text-red-600",
  };

  const statusIcons: any = {
    pending: <FaClock className="w-3 h-3" />,
    processing: <FaBox className="w-3 h-3" />,
    shipped: <FaTruck className="w-3 h-3" />,
    delivered: <FaCheckCircle className="w-3 h-3" />,
    cancelled: <FaCheckCircle className="w-3 h-3" />,
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalItems =
    order.cartItems?.reduce(
      (acc, item) => acc + (item.count || item.quantity || 1),
      0,
    ) || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {/* PRODUCT IMAGE */}
            <div className="relative">
              <img
                src={order.cartItems?.[0]?.product?.imageCover}
                className="w-16 h-16 rounded-xl object-cover"
              />

              {order.cartItems?.length > 1 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">
                  +{order.cartItems.length - 1}
                </span>
              )}
            </div>

            {/* ORDER INFO */}
            <div className="space-y-2">
              {/* STATUS + ID */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 font-medium ${
                    statusColors[status]
                  }`}
                >
                  {statusIcons[status]}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>

                <span className="text-gray-400 text-sm">
                  #{order.id || order._id?.slice(-5)}
                </span>
              </div>

              {/* DATE + ITEMS */}
              <div className="text-sm text-gray-400 flex items-center gap-2">
                {formatDate(order.createdAt)}
                <span>•</span>
                {totalItems} items
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-emerald-500 text-xs" />
                <span>
                  {order.shippingAddress?.city} -{" "}
                  {order.shippingAddress?.details}
                </span>
              </div>

              {/* PRICE */}
              <div className="text-2xl font-bold text-gray-900">
                {order.totalOrderPrice?.toLocaleString()} EGP
              </div>
            </div>
          </div>

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-emerald-600 transition"
          >
            {showDetails ? "Hide" : "Show"}
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {/* DETAILS */}
      {showDetails && (
        <div className="p-6 space-y-6 bg-gray-50/40">
          {/* ORDER ITEMS */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Order Items</h4>

            {order.cartItems?.map((item, index) => {
              const quantity = item.count || item.quantity || 1;
              const itemTotal = item.price * quantity;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.imageCover}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product?.title}
                      </p>

                      <p className="text-sm text-gray-400">
                        {quantity} × {item.price} EGP
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-gray-700">
                    {itemTotal.toLocaleString()} EGP
                  </span>
                </div>
              );
            })}
          </div>

          {/* ADDRESS + SUMMARY */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ADDRESS */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
              <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                <FaMapMarkerAlt className="text-emerald-500" />
                Delivery Address
              </h4>

              <p className="text-gray-500 text-sm">
                {order.shippingAddress?.details}
              </p>

              <p className="text-gray-500 text-sm">
                {order.shippingAddress?.city}
              </p>

              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <FaPhone />
                {order.shippingAddress?.phone}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-amber-50 rounded-xl p-4 shadow-sm space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                <FaBox className="text-amber-500" />
                Order Summary
              </h4>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{order.totalOrderPrice?.toLocaleString()} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shippingPrice} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span>{order.taxPrice} EGP</span>
              </div>

              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-gray-900">
                  {order.totalOrderPrice?.toLocaleString()} EGP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
