// Orders Page
'use client';

import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderCard } from '@/features/orders/components/OrderCard';
import { Loader } from '@/shared/components/ui/Loader';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { FaBox } from 'react-icons/fa';

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
    <>
      <PageHeader 
        breadcrumbs={[{ label: 'Orders' }]}
        title="My Orders"
        description="Track and manage your orders"
        icon={<FaBox />}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {data?.orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          {(!data?.orders || data.orders.length === 0) && (
            <p className="text-center text-gray-600 py-8">No orders yet</p>
          )}
        </div>
      </div>
    </>
  );
}

