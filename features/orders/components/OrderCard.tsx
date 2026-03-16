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
  FaCalendarAlt,
  FaBoxes,
} from "react-icons/fa";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getOrderStatus = () => {
    if (order.isDelivered) return "delivered";
    if (order.isPaid) return "processing";
    return "pending";
  };

  const status = getOrderStatus();

  const statusColors: any = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-orange-100 text-orange-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200 bg-emerald-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {/* PRODUCT IMAGE */}
            <div className="relative">
              <img
                src={order.cartItems?.[0]?.product?.imageCover}
                className="w-16 h-16 rounded-xl object-cover border border-gray-200"
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
                  className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 font-medium ${statusColors[status]}`}
                >
                  {statusIcons[status]}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>

                <span className="text-gray-600 text-sm font-mono">
                  #{order.id || order._id?.slice(-5)}
                </span>
              </div>

              {/* DATE + ITEMS */}
              <div className="text-sm text-gray-500 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <FaBoxes className="w-4 h-4 text-gray-400" />
                  <span>{totalItems} items</span>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition shadow"
          >
            {showDetails ? "Hide" : "Show"}
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {/* DETAILS */}
      {showDetails && (
        <div className="p-6 space-y-6 bg-gray-50 rounded-b-2xl">
          {/* ORDER ITEMS */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 text-lg">Order Items</h4>

            {order.cartItems?.map((item, index) => {
              const quantity = item.count || item.quantity || 1;
              const itemTotal = item.price * quantity;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.imageCover}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product?.title}
                      </p>

                      <p className="text-sm text-gray-500">
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
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
              <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                <FaMapMarkerAlt className="text-emerald-500" />
                Delivery Address
              </h4>

              <p className="text-gray-600 text-sm">
                {order.shippingAddress?.details}
              </p>
              <p className="text-gray-600 text-sm">
                {order.shippingAddress?.city}
              </p>

              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <FaPhone className="w-4 h-4" />
                {order.shippingAddress?.phone}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-amber-50 rounded-xl p-4 shadow-sm border border-amber-100 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                <FaBox className="text-amber-500" />
                Order Summary
              </h4>

              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span>{order.totalOrderPrice?.toLocaleString()} EGP</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>Shipping</span>
                <span>{order.shippingPrice} EGP</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>Tax</span>
                <span>{order.taxPrice} EGP</span>
              </div>

              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>{order.totalOrderPrice?.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
