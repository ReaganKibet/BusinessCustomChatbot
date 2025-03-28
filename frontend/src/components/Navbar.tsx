import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Utensils, Menu, MessageCircle, Brain } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white dark:text-white neon-text">
                Smart Dining
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-blue-900 dark:bg-blue-900 text-blue-200 dark:text-blue-200 neon-border'
                  : 'text-gray-300 dark:text-gray-300 hover:bg-blue-900/50 dark:hover:bg-blue-900/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/menu')
                  ? 'bg-blue-900 dark:bg-blue-900 text-blue-200 dark:text-blue-200 neon-border'
                  : 'text-gray-300 dark:text-gray-300 hover:bg-blue-900/50 dark:hover:bg-blue-900/50'
              }`}
            >
              <Menu className="h-4 w-4 mr-1" />
              Menu
            </Link>
            <Link
              to="/chat"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/chat')
                  ? 'bg-blue-900 dark:bg-blue-900 text-blue-200 dark:text-blue-200 neon-border'
                  : 'text-gray-300 dark:text-gray-300 hover:bg-blue-900/50 dark:hover:bg-blue-900/50'
              }`}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Assistant
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;