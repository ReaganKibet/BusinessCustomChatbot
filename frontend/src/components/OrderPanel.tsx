import React, { useState } from 'react';
import { Order, MenuItem } from '../types';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

interface OrderPanelProps {
  selectedItems: { menuItem: MenuItem; quantity: number }[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: (order: Partial<Order>) => void;
  onClose: () => void;
}

export const OrderPanel: React.FC<OrderPanelProps> = ({
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState<Record<string, string>>({});

  const totalAmount = selectedItems.reduce(
    (sum, { menuItem, quantity }) => sum + menuItem.price * quantity,
    0
  );

  const handlePlaceOrder = () => {
    const order: Partial<Order> = {
      items: selectedItems.map(({ menuItem, quantity }) => ({
        menuItem,
        quantity,
        specialInstructions: specialInstructions[menuItem.id],
      })),
      totalAmount,
      status: 'pending',
      timestamp: new Date(),
      customerName: customerName || undefined,
      tableNumber: tableNumber ? Number(tableNumber) : undefined,
    };

    onPlaceOrder(order);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Your Order</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {selectedItems.map(({ menuItem, quantity }) => (
            <div
              key={menuItem.id}
              className="flex items-start gap-4 p-4 border-b last:border-0"
            >
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{menuItem.name}</h3>
                    <p className="text-sm text-gray-600">
                      KSh {menuItem.price.toLocaleString()} each
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(menuItem.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-semibold">
                    KSh {(menuItem.price * quantity).toLocaleString()}
                  </span>
                </div>
                <textarea
                  placeholder="Special instructions..."
                  className="mt-2 w-full text-sm rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  value={specialInstructions[menuItem.id] || ''}
                  onChange={(e) =>
                    setSpecialInstructions({
                      ...specialInstructions,
                      [menuItem.id]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Table Number
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total Amount:</span>
            <span>KSh {totalAmount.toLocaleString()}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={selectedItems.length === 0}
            className="w-full bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};