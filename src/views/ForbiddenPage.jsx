import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Scroll, Crown, Sword, Shield, Lock } from 'lucide-react';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  const shieldVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-amber-800 to-amber-900'>
      {/* Background floating icons */}
      <div className='hidden sm:block'>
        <motion.div
          className='absolute top-[10%] left-[5%] text-red-300 opacity-30'
          variants={floatingVariants}
          animate='animate'
        >
          <Crown className='w-8 h-8 md:w-10 md:h-10' />
        </motion.div>

        <motion.div
          className='absolute top-[15%] right-[8%] text-amber-300 opacity-30'
          variants={floatingVariants}
          animate='animate'
          transition={{ delay: 1 }}
        >
          <Scroll className='w-7 h-7 md:w-9 md:h-9' />
        </motion.div>

        <motion.div
          className='absolute bottom-[20%] left-[10%] text-red-300 opacity-30'
          variants={floatingVariants}
          animate='animate'
          transition={{ delay: 2 }}
        >
          <Sword className='w-8 h-8 md:w-10 md:h-10' />
        </motion.div>

        <motion.div
          className='absolute bottom-[15%] right-[5%] text-amber-300 opacity-30'
          variants={floatingVariants}
          animate='animate'
          transition={{ delay: 3 }}
        >
          <Shield className='w-9 h-9 md:w-11 md:h-11' />
        </motion.div>
      </div>

      {/* Main content */}
      <div className='min-h-screen flex flex-col items-center justify-center text-white px-4 py-8 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10'>
        <motion.div
          className='text-center w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Shield icon with lock */}
          <motion.div
            className='mb-6 sm:mb-8 flex justify-center'
            variants={itemVariants}
          >
            <div className='relative'>
              <motion.div
                className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-300'
                variants={shieldVariants}
                animate='animate'
              >
                <div className='relative'>
                  <Shield className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-100' />
                  <Lock className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                </div>
              </motion.div>
              <div className='absolute -inset-2 bg-gradient-to-r from-red-400 to-amber-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>
          </motion.div>

          {/* 403 heading */}
          <motion.h1
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2 sm:mb-4 bg-gradient-to-r from-red-200 via-amber-200 to-red-300 bg-clip-text text-transparent'
            variants={itemVariants}
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
            }}
          >
            403
          </motion.h1>

          {/* Subtitle */}
          <motion.div className='mb-4 sm:mb-6' variants={itemVariants}>
            <p className='text-base sm:text-lg md:text-xl text-amber-100 font-medium italic'>
              "Akses Ditolak"
            </p>
          </motion.div>

          {/* Description text */}
          <motion.p
            className='text-sm sm:text-base md:text-lg text-amber-50 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0 max-w-2xl mx-auto'
            variants={itemVariants}
          >
            Maaf, Anda tidak memiliki izin untuk memasuki halaman manajemen data
            kami. Hanya user dengan role admin yang dapat mengakses halaman
            tersebut.
          </motion.p>

          {/* Info boxes */}
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 sm:mb-10 max-w-xl mx-auto'
            variants={itemVariants}
          >
            <div className='bg-red-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-red-400/30'>
              <Shield className='w-5 h-5 sm:w-6 sm:h-6 text-red-300 mx-auto mb-2' />
              <p className='text-xs sm:text-sm text-red-100'>
                Area Terlindungi
              </p>
            </div>
            <div className='bg-amber-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-amber-400/30'>
              <Crown className='w-5 h-5 sm:w-6 sm:h-6 text-amber-300 mx-auto mb-2' />
              <p className='text-xs sm:text-sm text-amber-100'>
                Akses Terbatas
              </p>
            </div>
            <div className='bg-red-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-red-400/30'>
              <Lock className='w-5 h-5 sm:w-6 sm:h-6 text-red-300 mx-auto mb-2' />
              <p className='text-xs sm:text-sm text-red-100'>Izin Diperlukan</p>
            </div>
          </motion.div>

          {/* Back button */}
          <motion.div className='flex justify-center' variants={itemVariants}>
            <motion.button
              onClick={() => navigate('/home')}
              className='group relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg md:text-xl rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300/50 border-2 border-amber-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className='relative z-10'
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowLeft className='w-5 h-5 sm:w-6 sm:h-6' />
              </motion.span>
              <span className='relative z-10'>Kembali</span>
              <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className='absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-amber-200/70 text-xs'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className='flex items-center justify-center gap-2 mb-2'>
            <div className='w-6 sm:w-8 h-0.5 bg-gradient-to-r from-transparent to-red-400'></div>
            <Shield className='w-3 h-3 sm:w-4 sm:h-4 text-red-400' />
            <div className='w-6 sm:w-8 h-0.5 bg-gradient-to-l from-transparent to-red-400'></div>
          </div>
        </motion.div>
      </div>

      {/* Background glow effect */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-red-500/10 rounded-full blur-3xl'></div>
    </div>
  );
};

export default ForbiddenPage;
