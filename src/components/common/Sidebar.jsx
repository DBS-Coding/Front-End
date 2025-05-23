import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import useUIStore from '../../store/uiStore';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen } = useUIStore();

  const menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/chatsoekarno', label: 'Chat Soekarno' },
    { path: '/chathatta', label: 'Chat Hatta' },
    { path: '/crudsoekarno', label: 'CRUD Soekarno' },
    { path: '/crudhatta', label: 'CRUD Hatta' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      useUIStore.getState().setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}

      <motion.aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          lg:w-1/6 w-64 sm:w-72 h-full space-y-4 pt-4 lg:pt-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${!sidebarOpen ? 'lg:w-0 lg:overflow-hidden' : ''}
        `}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-[#212529] lg:bg-transparent border-r border-t lg:border border-[#ffffff34] lg:h-[85vh] h-full w-full rounded-lg p-4 sm:p-6 lg:p-6">
          <nav className="space-y-2 sm:space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full text-center px-3 py-2 sm:px-4 sm:py-3 border border-[#ffffff34] rounded-lg 
                  hover:cursor-pointer hover:ring-white hover:ring-1 
                  transition-all duration-300 transform hover:scale-101 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                  text-sm sm:text-base
                  ${isActive(item.path) 
                    ? 'bg-transparent text-white ring-1 ring-white' 
                    : 'bg-transparent text-neutral-300 hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;