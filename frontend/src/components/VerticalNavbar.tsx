import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Utensils, Menu as MenuIcon, MessageCircle, Home, Bot, Brain } from 'lucide-react';

const VerticalNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-screen w-20 md:w-24 bg-gradient-to-b from-blue-900 to-purple-900 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center py-8 fixed left-0 top-0 z-50 shadow-xl">
      <Link to="/" className="mb-12">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-110 neon-border">
          <Brain className="h-6 w-6 text-white" />
        </div>
      </Link>

      <div className="flex flex-col items-center space-y-8 flex-1">
        <Link
          to="/"
          className={`p-3 rounded-xl transition-all duration-300 ${
            isActive('/')
              ? 'bg-white/10 shadow-lg text-white scale-110 neon-border'
              : 'text-blue-100 hover:bg-white/5 hover:scale-110'
          }`}
          title="Home"
        >
          <Home className="h-6 w-6" />
        </Link>
        
        <Link
          to="/menu"
          className={`p-3 rounded-xl transition-all duration-300 ${
            isActive('/menu')
              ? 'bg-white/10 shadow-lg text-white scale-110 neon-border'
              : 'text-blue-100 hover:bg-white/5 hover:scale-110'
          }`}
          title="Menu"
        >
          <MenuIcon className="h-6 w-6" />
        </Link>
        
        <Link
          to="/chat"
          className={`p-3 rounded-xl transition-all duration-300 relative ${
            isActive('/chat')
              ? 'bg-white/10 shadow-lg text-white scale-110 neon-border'
              : 'text-blue-100 hover:bg-white/5 hover:scale-110'
          }`}
          title="AI Assistant"
        >
          <Bot className="h-6 w-6" />
          {!isActive('/chat') && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          )}
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl text-blue-100 hover:bg-white/5 transition-all duration-300 hover:scale-110 mt-auto"
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="h-6 w-6" />
        ) : (
          <Sun className="h-6 w-6" />
        )}
      </button>
    </nav>
  );
};

export default VerticalNavbar;