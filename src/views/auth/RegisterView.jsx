import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Scroll,
  Crown,
  Shield,
  Sword,
  User,
  Mail,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useRegisterPresenter } from '../../presenters/RegisterPresenter';

const RegisterView = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    registerSuccess,
    apiError,
  } = useRegisterPresenter();

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [registerSuccess, navigate]);

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
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-red-900 text-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className='absolute top-16 left-8 text-amber-300 opacity-20'
        variants={floatingVariants}
        animate='animate'
      >
        <Crown size={32} />
      </motion.div>

      <motion.div
        className='absolute top-32 right-12 text-amber-300 opacity-20'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 1 }}
      >
        <Shield size={28} />
      </motion.div>

      <motion.div
        className='absolute bottom-24 left-16 text-amber-300 opacity-20'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 2 }}
      >
        <Sword size={30} />
      </motion.div>

      <motion.div
        className='absolute top-1/2 right-8 text-amber-300 opacity-20'
        variants={floatingVariants}
        animate='animate'
        transition={{ delay: 0.5 }}
      >
        <Scroll size={26} />
      </motion.div>

      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='hidden lg:flex lg:w-[40%] flex-col justify-center items-center border-b md:border-b-0 md:border-r border-amber-400/30 px-8 py-6 relative'
      >
        {/* Logo */}
        <motion.div
          className='mb-8 flex justify-center'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='relative'>
            <div className='w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-300'>
              <Scroll className='w-10 h-10 text-amber-900' />
            </div>
            <div className='absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-4xl lg:text-6xl font-bold tracking-wide text-center bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-4'
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          }}
        >
          HISTOTALK
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-center mb-6'
        >
          <p className='text-lg text-amber-100 font-medium italic'>
            "Bergabunglah dengan Sejarah"
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='text-amber-50 text-center text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg leading-relaxed'
        >
          Bergabunglah dengan komunitas pecinta sejarah dan temukan masa lalu
          Indonesia melalui percakapan yang menginspirasi dengan para pahlawan
          bangsa.
        </motion.p>

        {/* Features */}
        <motion.div
          className='mt-8 grid grid-cols-2 gap-4 max-w-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className='bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30 text-center'>
            <Crown className='w-5 h-5 text-amber-300 mx-auto mb-1' />
            <p className='text-xs text-amber-100'>Chat Interaktif</p>
          </div>
          <div className='bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30 text-center'>
            <Shield className='w-5 h-5 text-amber-300 mx-auto mb-1' />
            <p className='text-xs text-amber-100'>Aman & Terpercaya</p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className='mt-8 flex items-center gap-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className='w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
          <Crown className='w-5 h-5 text-amber-400' />
          <div className='w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
        </motion.div>
      </motion.div>

      {/* Right Panel - Register Form */}
      <div className='w-full h-screen lg:w-[60%] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10 relative'>
        {/* Mobile Logo */}
        <motion.div
          className='lg:hidden absolute top-8 left-1/2 transform -translate-x-1/2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
              <Scroll className='w-5 h-5 text-amber-900' />
            </div>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent'>
              HISTOTALK
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-sm sm:max-w-md'
        >
          {/* Form Container */}
          <div className='bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-400/30 shadow-2xl'>
            <motion.h2
              className='text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Bergabung dengan HistoTalk
            </motion.h2>

            <motion.p
              className='text-center text-amber-100 text-sm mb-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Mulai perjalanan sejarah Anda bersama para pahlawan Indonesia
            </motion.p>

            {registerSuccess && (
              <motion.div
                className='mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-200 backdrop-blur-sm'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4' />
                  Pendaftaran berhasil! Mengalihkan ke halaman login...
                </div>
              </motion.div>
            )}

            {apiError && (
              <motion.div
                className='mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 backdrop-blur-sm'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className='flex items-center gap-2'>
                  <Shield className='w-4 h-4' />
                  {apiError}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor='name'
                  className='block text-sm font-medium mb-2 text-amber-100'
                >
                  Nama Lengkap
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300' />
                  <input
                    {...register('name')}
                    type='text'
                    id='name'
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 text-white placeholder-amber-200/50 ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-amber-400/30 hover:border-amber-400/50'
                    }`}
                    placeholder='Masukkan nama lengkap Anda'
                  />
                </div>
                {errors.name && (
                  <p className='mt-2 text-sm text-red-400 flex items-center gap-1'>
                    <Shield className='w-3 h-3' />
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-2 text-amber-100'
                >
                  Email
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300' />
                  <input
                    {...register('email')}
                    type='email'
                    id='email'
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 text-white placeholder-amber-200/50 ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-amber-400/30 hover:border-amber-400/50'
                    }`}
                    placeholder='Masukkan email Anda'
                  />
                </div>
                {errors.email && (
                  <p className='mt-2 text-sm text-red-400 flex items-center gap-1'>
                    <Shield className='w-3 h-3' />
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-2 text-amber-100'
                >
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300' />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    className={`w-full pl-10 pr-12 py-3 rounded-lg bg-black/30 backdrop-blur-sm border-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 text-white placeholder-amber-200/50 ${
                      errors.password
                        ? 'border-red-500'
                        : 'border-amber-400/30 hover:border-amber-400/50'
                    }`}
                    placeholder='Buat password yang kuat'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-amber-300 hover:text-amber-200 transition-colors'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className='mt-2 text-sm text-red-400 flex items-center gap-1'>
                    <Shield className='w-3 h-3' />
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                type='submit'
                disabled={isLoading}
                className='w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 hover:from-amber-400 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300 font-bold'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-amber-900 border-t-transparent rounded-full animate-spin'></div>
                    Mendaftar...
                  </div>
                ) : (
                  'Daftar ke HistoTalk'
                )}
              </motion.button>
            </form>

            <motion.div
              className='mt-6 text-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className='flex items-center gap-2 justify-center mb-4'>
                <div className='w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
                <Scroll className='w-4 h-4 text-amber-400' />
                <div className='w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
              </div>

              <p className='text-sm text-amber-100'>
                Sudah memiliki akun?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className='text-amber-300 hover:text-amber-200 font-medium hover:underline transition-colors'
                >
                  Masuk Sekarang
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Ambient Light Effect */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none'></div>
      </div>
    </div>
  );
};

export default RegisterView;
