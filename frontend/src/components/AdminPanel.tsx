import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, X } from 'lucide-react';

interface AdminPanelProps {
  onAddMenuItem: (item: MenuItem) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddMenuItem, onClose }) => {
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false },
    nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMenuItem({
      ...newItem,
      id: Date.now().toString(),
      featured: false,
      ingredients: newItem.ingredients?.map(i => i.trim()) || [],
    } as MenuItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Menu Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (KSh)</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onChange={e => setNewItem({ ...newItem, image: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onChange={e => setNewItem({ ...newItem, ingredients: e.target.value.split(',').map(i => i.trim()) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="">Select category</option>
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Spicy Level</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                onChange={e => setNewItem({ ...newItem, spicyLevel: e.target.value as any })}
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                onChange={e => setNewItem({
                  ...newItem,
                  dietaryInfo: { ...newItem.dietaryInfo!, vegetarian: e.target.checked }
                })}
              />
              <span className="text-sm text-gray-700">Vegetarian</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                onChange={e => setNewItem({
                  ...newItem,
                  dietaryInfo: { ...newItem.dietaryInfo!, vegan: e.target.checked }
                })}
              />
              <span className="text-sm text-gray-700">Vegan</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                onChange={e => setNewItem({
                  ...newItem,
                  dietaryInfo: { ...newItem.dietaryInfo!, glutenFree: e.target.checked }
                })}
              />
              <span className="text-sm text-gray-700">Gluten-free</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;