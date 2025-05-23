import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import useUIStore from '../../store/uiStore';

const Layout = ({ children }) => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-[#212529] text-white">
      <Header />
      
      <div className="w-full px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <Sidebar />
          
          <main className={`
            flex-1 min-h-[85vh] transition-all duration-300 overflow-x-hidden
            ${sidebarOpen ? 'lg:w-5/6' : 'lg:w-full'}
          `}>
            <div className="w-full max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;