// Orders Page
"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderCard } from "@/features/orders/components/OrderCard";
import { Loader } from "@/shared/components/ui/Loader";
import { FaShoppingBag } from "react-icons/fa";

export default function OrdersPage() {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-8">
      {/* PAGE HEADER */}
      <div className="mb-12">
        <nav className="text-sm text-gray-400 mb-4">
          <ol className="flex items-center gap-3">
            <li>Home</li>
            <li>/</li>
            <li className="text-gray-700 font-semibold">My Orders</li>
          </ol>
        </nav>

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg">
            <FaShoppingBag className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Orders</h1>
            <p className="text-gray-500 text-sm">
              Track and manage your orders
            </p>
          </div>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4">
        {data?.orders?.length ? (
          data.orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
}
