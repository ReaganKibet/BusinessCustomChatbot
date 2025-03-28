import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Utensils, Menu as MenuIcon, MessageCircle, Home, Bot, Brain, X } from 'lucide-react';

const TopNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-emerald-800 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Utensils className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white neon-text">
                Smart Dining
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
            >
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </div>
            </Link>
            <Link
              to="/menu"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/menu')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
            >
              <MenuIcon className="h-4 w-4 mr-1" />
              Menu
            </Link>
            <Link
              to="/chat"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/chat')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
            >
              <Bot className="h-4 w-4 mr-1" />
              AI Assistant
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
              aria-expanded="false"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-700 dark:bg-emerald-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>
            <Link
              to="/menu"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/menu')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <MenuIcon className="h-5 w-5 mr-2" />
                Menu
              </div>
            </Link>
            <Link
              to="/chat"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/chat')
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
              } transition-colors duration-200`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Assistant
              </div>
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-5 w-5 mr-2" />
                  Switch to Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5 mr-2" />
                  Switch to Light Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;