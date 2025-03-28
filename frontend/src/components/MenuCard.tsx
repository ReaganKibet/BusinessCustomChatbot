import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Star, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { theme } = useTheme();
  const [showNutrition, setShowNutrition] = useState(false);

  return (
    <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group neon-border`}>
      <div className="relative h-48">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.featured && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex flex-wrap gap-2">
              {item.dietaryInfo.vegetarian && (
                <span className="bg-green-900/80 text-green-200 text-xs px-2 py-1 rounded">Vegetarian</span>
              )}
              {item.dietaryInfo.vegan && (
                <span className="bg-green-900/80 text-green-200 text-xs px-2 py-1 rounded">Vegan</span>
              )}
              {item.dietaryInfo.glutenFree && (
                <span className="bg-blue-900/80 text-blue-200 text-xs px-2 py-1 rounded">Gluten-free</span>
              )}
              {item.spicyLevel && (
                <span className={`text-xs px-2 py-1 rounded ${
                  item.spicyLevel === 'hot' ? 'bg-red-900/80 text-red-200' :
                  item.spicyLevel === 'medium' ? 'bg-orange-900/80 text-orange-200' :
                  'bg-yellow-900/80 text-yellow-200'
                }`}>
                  {item.spicyLevel.charAt(0).toUpperCase() + item.spicyLevel.slice(1)} 🌶
                </span>
              )}
              <span className="bg-purple-900/80 text-purple-200 text-xs px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-200 dark:text-white neon-text">{item.name}</h3>
          <span className="text-green-400 dark:text-green-400 font-bold">KSh {item.price.toLocaleString()}</span>
        </div>
        <p className="text-gray-400 dark:text-gray-300 text-sm mb-3">{item.description}</p>
        
        {/* Nutritional Information */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowNutrition(!showNutrition);
          }}
          className="text-blue-400 dark:text-blue-400 text-sm flex items-center gap-1 mb-2 hover:text-blue-300 dark:hover:text-blue-300 transition-colors neon-text"
        >
          <Info className="w-4 h-4" />
          Nutritional Info
          {showNutrition ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showNutrition && (
          <div 
            className={`${theme === 'light' ? 'bg-blue-900/30' : 'bg-gray-800/70'} p-3 rounded-md mb-3 text-sm neon-border`}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold mb-2 text-gray-200 dark:text-white">Nutritional Information</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">Calories:</span>
                <span className="text-gray-200 dark:text-white">{item.nutritionalInfo.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">Protein:</span>
                <span className="text-gray-200 dark:text-white">{item.nutritionalInfo.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">Carbs:</span>
                <span className="text-gray-200 dark:text-white">{item.nutritionalInfo.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">Fat:</span>
                <span className="text-gray-200 dark:text-white">{item.nutritionalInfo.fat}g</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-400">
              <span className="font-medium">Preparation time:</span> {item.preparationTime} mins
            </div>
          </div>
        )}

        <div className="mt-2">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= Math.floor(item.popularity) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-400 dark:text-gray-400">{item.popularity.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};