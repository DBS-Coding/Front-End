import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, User, LogOut, Trash2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { useNavigationPresenter } from '../../utils/navigationutils';

const Header = () => {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { handleLogout, handleDeleteAccount, isLoading } = useNavigationPresenter();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownAction = (action) => {
    setIsDropdownOpen(false);
    action();
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-3 py-2 border border-[#ffffff34] hover:ring-1 hover:ring-neutral-600 hover:cursor-pointer rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-neutral-600"
          >
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-white" />
              <span className="text-white text-sm sm:text-base max-w-[100px] sm:max-w-[150px] truncate">
                {user?.data?.name || 'User'}
              </span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-48 bg-[#212529] border border-neutral-600 rounded-lg shadow-xl z-50"
              >
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-neutral-600">
                    <p className="text-sm text-neutral-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">
                      {user?.data?.name || 'User'}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => handleDropdownAction(handleDeleteAccount)}
                      disabled={isLoading}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:cursor-pointer text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isLoading ? 'Deleting...' : 'Delete Account'}</span>
                    </button>
                    
                    <button
                      onClick={() => handleDropdownAction(handleLogout)}
                      disabled={isLoading}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:cursor-pointer text-sm text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;