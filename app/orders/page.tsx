"use client";

import Link from "next/link";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderCard } from "@/features/orders/components/OrderCard";
import { Loader } from "@/shared/components/ui/Loader";
import { FaShoppingBag, FaClipboardList } from "react-icons/fa";

export default function OrdersPage() {
  const { data, isLoading } = useOrders();

  const orders = data?.orders || [];

  // 🔄 Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // 📭 Empty State
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 px-4">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaClipboardList className="text-5xl text-orange-500" />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-800">No orders yet</h2>

        <p className="text-gray-500 mb-8 text-sm text-center max-w-md">
          Looks like you haven't placed any orders yet. Start shopping and your
          orders will appear here.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition"
        >
          <FaShoppingBag />
          Start Shopping
        </Link>
      </div>
    );
  }

  // 📦 Orders List
  return (
    <div className="container mx-auto px-5 py-8">
      {/* HEADER */}
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

      {/* LIST */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
