import React, { useState } from 'react';
import { FilterPanel } from '../components/FilterPanel';
import { MenuCard } from '../components/MenuCard';
import { FilterOptions, MenuItem } from '../types';
import { menuItems } from '../data/menu';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MenuPage: React.FC = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ menuItem: MenuItem; quantity: number }[]>([]);
  const [showOrderPanel, setShowOrderPanel] = useState(false);

  const filteredMenu = menuItems.filter(item => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!item.name.toLowerCase().includes(query) && 
          !item.description.toLowerCase().includes(query) &&
          !item.category.toLowerCase().includes(query) &&
          !item.ingredients.some(ing => ing.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    // Price range filter
    if (filters.priceRange) {
      if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
        return false;
      }
    }
    
    // Category filter
    if (filters.categories?.length) {
      if (!filters.categories.includes(item.category)) {
        return false;
      }
    }
    
    // Dietary filter
    if (filters.dietary?.length) {
      const matchesDietary = filters.dietary.every(pref => item.dietaryInfo[pref]);
      if (!matchesDietary) {
        return false;
      }
    }
    
    // Spice level filter
    if (filters.spiceLevel?.length) {
      if (!filters.spiceLevel.includes(item.spicyLevel || 'mild')) {
        return false;
      }
    }
    
    // Preparation time filter
    if (filters.maxPrepTime) {
      if (item.preparationTime > filters.maxPrepTime) {
        return false;
      }
    }
    
    // Rating filter
    if (filters.minRating) {
      if (item.popularity < filters.minRating) {
        return false;
      }
    }
    
    return true;
  });

  const totalItems = selectedItems.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-3d-gradient-light' : 'bg-3d-gradient'} hexagon-bg pt-8 pl-20 md:pl-24 cyberpunk-grid`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-xl p-6 mb-8 neon-border`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-200 dark:text-white neon-text">Smart Dining Starts Here</h1>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search dishes, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 dark:border-gray-600 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 neon-border"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 neon-border"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
              
              <button
                onClick={() => setShowOrderPanel(true)}
                className="relative flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/20 neon-border"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-xl p-8 text-center neon-border`}>
            <p className="text-gray-300 dark:text-gray-300 text-lg">
              No dishes match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <div key={item.id} onClick={() => {
                const existingItem = selectedItems.find(i => i.menuItem.id === item.id);
                if (existingItem) {
                  setSelectedItems(selectedItems.map(i => 
                    i.menuItem.id === item.id 
                      ? { ...i, quantity: i.quantity + 1 } 
                      : i
                  ));
                } else {
                  setSelectedItems([...selectedItems, { menuItem: item, quantity: 1 }]);
                }
              }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}

        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;