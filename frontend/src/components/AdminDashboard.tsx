import React, { useState } from 'react';
import { Order, MenuItem } from '../types';
import { Clock, CheckCircle, XCircle, Coffee, Bell } from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onAddMenuItem: (item: MenuItem) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onAddMenuItem,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');

  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const activeOrders = orders.filter(
    (order) => ['confirmed', 'preparing'].includes(order.status)
  );
  const completedOrders = orders.filter(
    (order) => ['ready', 'delivered'].includes(order.status)
  );

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'preparing':
        return <Coffee className="w-5 h-5 text-orange-500" />;
      case 'ready':
        return <Bell className="w-5 h-5 text-green-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <span className="font-semibold capitalize">{order.status}</span>
          </div>
          <p className="text-sm text-gray-600">
            Order #{order.id.slice(0, 8)} •{' '}
            {new Date(order.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <span className="font-bold text-green-600">
          KSh {order.totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="space-y-2">
        {order.items.map(({ menuItem, quantity, specialInstructions }) => (
          <div key={menuItem.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                {quantity}x {menuItem.name}
              </p>
              {specialInstructions && (
                <p className="text-sm text-gray-600">{specialInstructions}</p>
              )}
            </div>
            <span className="text-gray-600">
              KSh {(menuItem.price * quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {order.customerName && (
        <p className="mt-4 text-sm text-gray-600">
          Customer: {order.customerName}
          {order.tableNumber && ` • Table ${order.tableNumber}`}
        </p>
      )}

      {order.status !== 'delivered' && (
        <div className="mt-4 flex gap-2">
          {order.status === 'pending' && (
            <button
              onClick={() => onUpdateOrderStatus(order.id, 'confirmed')}
              className="flex-1 bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700"
            >
              Confirm
            </button>
          )}
          {order.status === 'confirmed' && (
            <button
              onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
              className="flex-1 bg-orange-600 text-white rounded px-3 py-1 text-sm hover:bg-orange-700"
            >
              Start Preparing
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => onUpdateOrderStatus(order.id, 'ready')}
              className="flex-1 bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700"
            >
              Mark Ready
            </button>
          )}
          {order.status === 'ready' && (
            <button
              onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
              className="flex-1 bg-gray-600 text-white rounded px-3 py-1 text-sm hover:bg-gray-700"
            >
              Mark Delivered
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'orders'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'menu'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Menu Management
            </button>
          </div>
        </div>

        {activeTab === 'orders' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending Orders */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Pending Orders ({pendingOrders.length})
              </h2>
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>

            {/* Active Orders */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Active Orders ({activeOrders.length})
              </h2>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>

            {/* Completed Orders */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Completed Orders ({completedOrders.length})
              </h2>
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Menu Management</h2>
            {/* Menu management content */}
          </div>
        )}
      </div>
    </div>
  );
};