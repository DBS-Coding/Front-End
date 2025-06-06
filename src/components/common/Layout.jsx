import Header from './Header';
import Sidebar from './Sidebar';
import useUIStore from '../../store/uiStore';
import { Crown, Scroll, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const { sidebarOpen } = useUIStore();

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className='bg-gradient-to-br from-amber-900 via-amber-800 to-red-900 text-white relative h-full'>
      {/* Decorative Elements */}
      <motion.div
        className='absolute top-20 left-10 text-amber-300 opacity-20 pointer-events-none'
        variants={floatingVariants}
        animate='animate'
      >
        <Crown size={32} />
      </motion.div>
      <motion.div
        className='absolute top-40 right-16 text-amber-300 opacity-20 pointer-events-none'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 1 }}
      >
        <Scroll size={28} />
      </motion.div>
      <motion.div
        className='absolute bottom-32 left-20 text-amber-300 opacity-20 pointer-events-none'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 2 }}
      >
        <Sparkles size={30} />
      </motion.div>
      {/* Ambient Light Effect */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none'></div>
      <div className='relative 2xl:max-w-7xl mx-auto'>
        <Header />

        <div className='w-full px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
            <Sidebar />

            <main
              className={`
                 transition-all duration-300 overflow-x-hidden
                ${sidebarOpen ? 'lg:w-5/6' : 'lg:w-full'}
              `}
            >
              <div className='w-full max-w-full pb-6'>{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
