import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, clearAuth } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 sm:p-6 border-b border-[#ffffff34] mb-4 sm:mb-8">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <motion.h1 
          className="text-xl sm:text-2xl lg:text-3xl font-bold truncate"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          HISTOTALK
        </motion.h1>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="text-gray-300 text-sm sm:text-base hidden sm:inline">
          Welcome, {user?.name}
        </span>
        <span className="text-gray-300 text-sm sm:hidden">
          {user?.name}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 lg:hover:cursor-pointer px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;