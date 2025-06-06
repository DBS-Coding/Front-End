import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { ArrowRight, Scroll, Crown, Sword } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isTokenValid } = useAuthStore();

  const handleNext = async () => {
    if (isAuthenticated && isTokenValid) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

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

  return (
    <div className='h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-red-900 flex flex-col'>
      {/* Decorative Elements */}
      <motion.div
        className='absolute top-20 left-10 text-amber-300 opacity-30'
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
        className='absolute bottom-32 left-20 text-amber-300 opacity-30'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 2 }}
      >
        <Sword size={38} />
      </motion.div>

      {/* Main Content */}
      <div className='flex-grow flex flex-col items-center justify-center text-white px-4 py-4 sm:py-6 md:py-8 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10'>
        <motion.div
          className='text-center w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Logo/Icon */}
          <motion.div
            className='mb-4 sm:mb-6 flex justify-center'
            variants={itemVariants}
          >
            <div className='relative'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-300'>
                <Scroll className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-900' />
              </div>
              <div className='absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight sm:tracking-tighter mb-2 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent'
            variants={itemVariants}
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
            }}
          >
            HISTOTALK
          </motion.h1>

          {/* Subtitle */}
          <motion.div className='mb-3 sm:mb-4' variants={itemVariants}>
            <p className='text-base sm:text-lg md:text-xl text-amber-100 font-medium italic'>
              "Berbicara dengan Masa Lalu"
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className='text-sm sm:text-base md:text-lg lg:text-xl text-amber-50 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0 max-w-3xl mx-auto'
            variants={itemVariants}
          >
            Ketika orang mati bercerita. Temui tokoh-tokoh sejarah Indonesia
            dalam bentuk chatbot interaktif dan dengarkan kisah heroik mereka
            dengan cara yang revolusioner.
          </motion.p>

          {/* Features */}
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8 max-w-2xl mx-auto'
            variants={itemVariants}
          >
            <div className='bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30'>
              <Crown className='w-5 h-5 text-amber-300 mx-auto mb-1' />
              <p className='text-sm text-amber-100'>Chat dengan Pahlawan</p>
            </div>
            <div className='bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30'>
              <Scroll className='w-5 h-5 text-amber-300 mx-auto mb-1' />
              <p className='text-sm text-amber-100'>Pelajari Sejarah</p>
            </div>
            <div className='bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30'>
              <Sword className='w-5 h-5 text-amber-300 mx-auto mb-1' />
              <p className='text-sm text-amber-100'>Interaktif & Menarik</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div className='flex justify-center' variants={itemVariants}>
            <motion.button
              onClick={handleNext}
              className='group relative flex items-center gap-3 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-xl rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300/50 border-2 border-amber-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='relative z-10'>Mulai Petualangan</span>
              <motion.span
                className='relative z-10'
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className='w-5 h-5 sm:w-6 sm:h-6' />
              </motion.span>
              <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className='py-2 mx-auto text-center text-amber-200/70 text-xs sm:text-sm mb-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className='flex items-center justify-center gap-2'>
          <div className='w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
          <Scroll className='w-4 h-4 text-amber-400' />
          <div className='w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
        </div>
      </motion.div>

      {/* Ambient Light Effect */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl'></div>
    </div>
  );
};

export default LandingPage;
