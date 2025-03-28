import React from 'react';
import { FilterOptions } from '../types';
import { X, Sliders, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClose,
}) => {
  const { theme } = useTheme();

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: { min, max },
    });
  };

  const handleCategoryChange = (category: string) => {
    const currentCategories = filters.categories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    onFilterChange({
      ...filters,
      categories: updatedCategories,
    });
  };

  const handleDietaryChange = (dietary: 'vegetarian' | 'vegan' | 'glutenFree') => {
    const currentDietary = filters.dietary || [];
    const updatedDietary = currentDietary.includes(dietary)
      ? currentDietary.filter((d) => d !== dietary)
      : [...currentDietary, dietary];

    onFilterChange({
      ...filters,
      dietary: updatedDietary,
    });
  };

  return (
    <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-xl shadow-xl p-6 w-full max-w-md`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filter Options</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range (KSh)</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={filters.priceRange?.min || ''}
              onChange={(e) =>
                handlePriceRangeChange(
                  Number(e.target.value),
                  filters.priceRange?.max || 10000
                )
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={filters.priceRange?.max || ''}
              onChange={(e) =>
                handlePriceRangeChange(
                  filters.priceRange?.min || 0,
                  Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Breakfast', 'Starters', 'Main Course', 'Desserts', 'Beverages'].map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded border ${(filters.categories || []).includes(category) 
                  ? 'bg-blue-600 border-blue-600 flex items-center justify-center' 
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'}`}>
                  {(filters.categories || []).includes(category) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={(filters.categories || []).includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'glutenFree', label: 'Gluten-free' },
            ].map((pref) => (
              <label
                key={pref.id}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded border ${(filters.dietary || []).includes(pref.id as any) 
                  ? 'bg-blue-600 border-blue-600 flex items-center justify-center' 
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'}`}>
                  {(filters.dietary || []).includes(pref.id as any) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={(filters.dietary || []).includes(pref.id as any)}
                  onChange={() => handleDietaryChange(pref.id as any)}
                />
                {pref.label}
              </label>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Spice Level</h3>
          <div className="flex gap-4">
            {['mild', 'medium', 'hot'].map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded border ${(filters.spiceLevel || []).includes(level as any) 
                  ? 'bg-blue-600 border-blue-600 flex items-center justify-center' 
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'}`}>
                  {(filters.spiceLevel || []).includes(level as any) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={(filters.spiceLevel || []).includes(level as any)}
                  onChange={() => {
                    const current = filters.spiceLevel || [];
                    const updated = current.includes(level as any)
                      ? current.filter((l) => l !== level)
                      : [...current, level as any];
                    onFilterChange({
                      ...filters,
                      spiceLevel: updated,
                    });
                  }}
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Preparation Time */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Preparation Time: <span className="text-blue-600 dark:text-blue-400">{filters.maxPrepTime || 60} min</span>
          </h3>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            value={filters.maxPrepTime || 60}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxPrepTime: Number(e.target.value),
              })
            }
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>5 min</span>
            <span>60 min</span>
          </div>
        </div>

        {/* Popularity */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Rating</h3>
          <select
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.minRating || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minRating: Number(e.target.value) || undefined,
              })
            }
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5+ stars</option>
            <option value="4.0">4.0+ stars</option>
            <option value="3.5">3.5+ stars</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onFilterChange({})}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};