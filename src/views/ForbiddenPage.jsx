import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Scroll, Crown, Sword, Shield, Lock } from "lucide-react";

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
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className='absolute top-20 left-10 text-red-300 opacity-30'
        variants={floatingVariants}
        animate='animate'
      >
        <Crown size={40} />
      </motion.div>

      <motion.div
        className='absolute top-32 right-16 text-amber-300 opacity-30'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 1 }}
      >
        <Scroll size={35} />
      </motion.div>

      <motion.div
        className='absolute bottom-32 left-20 text-red-300 opacity-30'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 2 }}
      >
        <Sword size={38} />
      </motion.div>

      <motion.div
        className='absolute bottom-20 right-10 text-amber-300 opacity-30'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 3 }}
      >
        <Shield size={42} />
      </motion.div>

      <div className='min-h-screen flex flex-col items-center justify-center text-white px-4 py-8 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10'>
        <motion.div
          className='text-center w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='mb-8 flex justify-center'
            variants={itemVariants}
          >
            <div className='relative'>
              <motion.div 
                className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-300'
                variants={shieldVariants}
                animate='animate'
              >
                <div className='relative'>
                  <Shield className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-red-100' />
                  <Lock className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                </div>
              </motion.div>
              <div className='absolute -inset-2 bg-gradient-to-r from-red-400 to-amber-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>
          </motion.div>

          <motion.h1
            className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight mb-4 bg-gradient-to-r from-red-200 via-amber-200 to-red-300 bg-clip-text text-transparent'
            variants={itemVariants}
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
            }}
          >
            403
          </motion.h1>

          <motion.div className='mb-6' variants={itemVariants}>
            <p className='text-lg sm:text-xl md:text-2xl text-amber-100 font-medium italic'>
              "Akses Ditolak"
            </p>
          </motion.div>

          <motion.p
            className='text-base sm:text-lg md:text-xl lg:text-2xl text-amber-50 mb-10 sm:mb-12 leading-relaxed px-2 sm:px-0 max-w-3xl mx-auto'
            variants={itemVariants}
          >
            Maaf, Anda tidak memiliki izin untuk memasuki halaman manajemen data kami. Hanya user dengan role admin yang dapat mengakses halaman tersebut.
          </motion.p>

          <motion.div
            className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto'
            variants={itemVariants}
          >
            <div className='bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-400/30'>
              <Shield className='w-6 h-6 text-red-300 mx-auto mb-2' />
              <p className='text-sm text-red-100'>Area Terlindungi</p>
            </div>
            <div className='bg-amber-900/30 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30'>
              <Crown className='w-6 h-6 text-amber-300 mx-auto mb-2' />
              <p className='text-sm text-amber-100'>Akses Terbatas</p>
            </div>
            <div className='bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-400/30'>
              <Lock className='w-6 h-6 text-red-300 mx-auto mb-2' />
              <p className='text-sm text-red-100'>Izin Diperlukan</p>
            </div>
          </motion.div>

          <motion.div className='flex justify-center' variants={itemVariants}>
            <motion.button
              onClick={() => navigate("/home")}
              className='group relative flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300/50 border-2 border-amber-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className='relative z-10'
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowLeft className='w-6 h-6' />
              </motion.span>
              <span className='relative z-10'>Kembali</span>
              <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className='absolute bottom-4 sm:bottom-6 lg:bottom-5 left-0 right-0 text-center text-amber-200/70 text-xs sm:text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className='flex items-center justify-center gap-2 mb-2'>
            <div className='w-8 h-0.5 bg-gradient-to-r from-transparent to-red-400'></div>
            <Shield className='w-4 h-4 text-red-400' />
            <div className='w-8 h-0.5 bg-gradient-to-l from-transparent to-red-400'></div>
          </div>
        </motion.div>
      </div>

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl'></div>
    </div>
  );
};

export default ForbiddenPage;