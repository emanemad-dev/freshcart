// Order Card Component
import { Order } from '../types/orders.types';
import { Button } from '@/shared/components/ui/Button';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

export const OrderCard = ({ order, onViewDetails, onCancel }: OrderCardProps) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>${item.product.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="font-semibold">Total: ${order.total}</span>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onViewDetails?.(order.id)}>
            View Details
          </Button>
          {order.status === 'pending' && (
            <Button variant="outline" size="sm" onClick={() => onCancel?.(order.id)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

