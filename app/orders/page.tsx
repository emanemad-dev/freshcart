// Orders Page
'use client';

import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderCard } from '@/features/orders/components/OrderCard';
import { Loader } from '@/shared/components/ui/Loader';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {data?.orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {(!data?.orders || data.orders.length === 0) && (
          <p className="text-center text-gray-600 py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
}

