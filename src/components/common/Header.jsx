import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  Trash2,
  Scroll,
  Crown,
  Shield,
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { useNavigationPresenter } from '../../hooks/navigationutils';
import { useLocation } from 'react-router-dom';
import pakKarno from '../../assets/pakkarno.png';
import pakHatta from '../../assets/pakhatta.png';

const Header = () => {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { handleLogout, handleDeleteAccount, isLoading } =
    useNavigationPresenter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !document.getElementById('user-dropdown')?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDropdownPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };

    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 8,
      right: window.innerWidth - rect.right,
    };
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownAction = (action) => {
    setIsDropdownOpen(false);
    action();
  };

  // Dropdown component to be rendered via Portal
  const DropdownMenu = () => {
    const position = getDropdownPosition();

    return createPortal(
      <motion.div
        id='user-dropdown'
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className='fixed w-72 bg-black/90 backdrop-blur-md border-2 border-amber-400/30 rounded-xl shadow-2xl z-[99999] max-h-[85vh] overflow-y-auto no-scrollbar'
        style={{
          top: position.top + 'px',
          right: position.right + 'px',
        }}
      >
        {/* User Profile Section */}
        <div className='p-3 border-b border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent'>
          <div className='flex items-center gap-3 mb-1'>
            <div className='relative'>
              <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <User className='w-6 h-6 text-amber-900' />
              </div>
              <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-amber-300'></div>
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-1.5 mb-0.5'>
                <Crown className='w-3 h-3 text-amber-400' />
                <p className='text-xs text-amber-300'>Masuk sebagai</p>
              </div>
              <p className='text-sm font-bold text-amber-100 truncate'>
                {user?.data?.name || 'User'}
              </p>
              <p className='text-xs text-amber-300/80 truncate'>
                {user?.data?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='p-3 pt-2'>
          <motion.button
            onClick={() => handleDropdownAction(handleDeleteAccount)}
            disabled={isLoading}
            className='w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-200 hover:bg-amber-900/40 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'
            whileHover={{ x: 3, backgroundColor: 'rgba(217, 119, 6, 0.2)' }}
          >
            <Trash2 className='w-4 h-4 flex-shrink-0' />
            <span className='font-medium'>
              {isLoading ? 'Menghapus...' : 'Hapus Akun'}
            </span>
          </motion.button>

          <motion.button
            onClick={() => handleDropdownAction(handleLogout)}
            disabled={isLoading}
            className='w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-300 hover:bg-red-900/40 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg mt-2'
            whileHover={{ x: 3, backgroundColor: 'rgba(185, 28, 28, 0.2)' }}
          >
            <LogOut className='w-4 h-4 flex-shrink-0' />
            <span className='font-medium'>
              {isLoading ? 'Keluar...' : 'Keluar'}
            </span>
          </motion.button>
        </div>
      </motion.div>,
      document.body
    );
  };

  return (
    <header className='p-4 sm:p-1.5 mb-3 border-b border-amber-400/30 backdrop-blur-sm bg-black/10'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-3 sm:space-x-4'>
          <motion.button
            onClick={toggleSidebar}
            className='lg:hidden p-2 bg-black/30 border border-amber-400/30 rounded-lg hover:bg-black/40 hover:border-amber-400/50 transition-all duration-300'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className='w-5 h-5 sm:w-6 sm:h-6 text-amber-300' />
          </motion.button>

          <div className='flex items-center gap-3'>
            <div className='relative'>
              <div className='w-8 h-8 sm:w-7 sm:h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <Scroll className='w-4 h-4 text-amber-900' />
              </div>
              <div className='absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>

            <motion.h1
              className='text-xl sm:text-2xl lg:text-xl font-bold truncate bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              HISTOTALK
            </motion.h1>
          </div>
        </div>

        <div className='flex items-center space-x-2 sm:space-x-4'>
          <div className='relative' ref={dropdownRef}>
            <motion.button
              ref={buttonRef}
              onClick={toggleDropdown}
              className='flex items-center space-x-2 px-3 py-2 bg-black/30 border-2 border-amber-400/30 hover:border-amber-400/50 rounded-lg transition-all duration-300'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center space-x-2'>
                <div className='w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                  <User className='w-3 h-3 text-amber-900' />
                </div>
                <span className='text-amber-100 text-sm max-w-[100px] sm:max-w-[150px] truncate'>
                  <span className='sm:hidden'>
                    {user?.data?.name ? user.data.name.split(' ')[0] : 'User'}
                  </span>
                  <span className='hidden sm:inline'>
                    {user?.data?.name || 'User'}
                  </span>
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-amber-300 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && <DropdownMenu />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
