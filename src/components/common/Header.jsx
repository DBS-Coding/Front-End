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
  const [selectedModelType, setSelectedModelType] = useState('tfjs');
  const { handleLogout, handleDeleteAccount, isLoading } =
    useNavigationPresenter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modelData, setModelData] = useState({
    classLabels: [],
    responsesSoekarno: {},
    responsesHatta: {},
  });
  const [isModelLoading, setIsModelLoading] = useState(true);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const loadModelData = async () => {
      try {
        setIsModelLoading(true);

        const [contentSoekarnoResponse, contentHattaResponse] =
          await Promise.all([
            fetch('/tfjs_saved_model/content_soekarno.json'),
            fetch('/tfjs_saved_model/content_hatta.json'),
          ]);

        const dataSoekarno = await contentSoekarnoResponse.json();
        const dataHatta = await contentHattaResponse.json();

        const responsesSoekarno = {};
        const labelSet = new Set();
        dataSoekarno.intents.forEach((intent) => {
          responsesSoekarno[intent.tag] = intent.responses;
          labelSet.add(intent.tag);
        });

        const responsesHatta = {};
        dataHatta.intents.forEach((intent) => {
          responsesHatta[intent.tag] = intent.responses;
        });

        const classLabels = Array.from(labelSet);

        setModelData({
          classLabels,
          responsesSoekarno,
          responsesHatta,
        });
      } catch (error) {
        console.error('Error loading model data:', error);
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModelData();
  }, []);

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

  const getAchievementsFromLocalStorage = (character) => {
    const key =
      character === 'soekarno' ? 'achievement-soekarno' : 'achievement-hatta';
    return JSON.parse(localStorage.getItem(key)) || [];
  };

  const renderConditionalInfo = () => {
    const path = location.pathname;

    const achievementsSoekarno = getAchievementsFromLocalStorage('soekarno');
    const achievementsHatta = getAchievementsFromLocalStorage('hatta');

    const renderAchievementSection = (character, data) => (
      <div className='py-3 border-b border-amber-400/30'>
        <div className='flex items-center justify-center gap-2 mb-2'>
          <div className='w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
            {character === 'Soekarno' ? (
              <Crown className='w-2 h-2 text-amber-900' />
            ) : (
              <Shield className='w-2 h-2 text-amber-900' />
            )}
          </div>
          <p className='text-amber-200 font-semibold text-sm'>
            Achievement {character}
          </p>
        </div>

        {isModelLoading ? (
          <div className='flex justify-center items-center py-2'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className='w-4 h-4 border-2 border-amber-600 border-t-amber-300 rounded-full'
            />
            <span className='ml-2 text-xs text-amber-300'>Loading...</span>
          </div>
        ) : data.length > 0 ? (
          <div className='grid grid-cols-2 gap-1.5 px-3 max-h-40 overflow-y-auto no-scrollbar'>
            {data.map((tag, i) => (
              <motion.div
                key={`${character}-${i}`}
                className='flex items-center gap-1.5 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className='w-3.5 h-3.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0'>
                  {character === 'Soekarno' ? (
                    <Crown className='w-2 h-2 text-amber-900' />
                  ) : (
                    <Shield className='w-2 h-2 text-amber-900' />
                  )}
                </div>
                <span className='text-xs text-amber-200 font-medium truncate capitalize'>
                  {tag.replace(/_/g, ' ')}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='py-2 flex flex-col items-center justify-center'>
            <Scroll className='w-5 h-5 text-amber-400/50 mb-1' />
            <p className='text-xs text-amber-200/60 text-center'>
              Belum ada achievements
            </p>
          </div>
        )}
      </div>
    );

    const renderNoAchievementMessage = () => (
      <div className='py-4 border-b border-amber-400/30'>
        <div className='flex flex-col items-center justify-center gap-1.5'>
          <Scroll className='w-5 h-5 text-amber-400/50' />
          <p className='text-xs text-amber-200/70 text-center'>
            Achievements tidak tersedia untuk model RAG
          </p>
        </div>
      </div>
    );

    return (
      <div>
        {/* Character Avatar */}
        {(path === '/chatsoekarno' || path === '/chathatta') && (
          <div className='py-3 border-b border-amber-400/30 flex justify-center'>
            <div className='relative'>
              <div className='w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400'>
                <img
                  src={path === '/chatsoekarno' ? pakKarno : pakHatta}
                  alt={path === '/chatsoekarno' ? 'Soekarno' : 'Hatta'}
                  className='w-full h-full object-cover object-center'
                />
              </div>
              <div className='absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                {path === '/chatsoekarno' ? (
                  <Crown className='w-3.5 h-3.5 text-amber-900' />
                ) : (
                  <Shield className='w-3.5 h-3.5 text-amber-900' />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Model Selection */}
        <div className='py-3 border-b border-amber-400/30'>
          <div className='flex items-center justify-center gap-1.5 mb-2'>
            <Scroll className='w-3.5 h-3.5 text-amber-400' />
            <p className='text-sm text-amber-200 font-medium'>Pilih Model</p>
          </div>

          <div className='flex gap-2 justify-center px-3'>
            <motion.button
              onClick={() => setSelectedModelType('tfjs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                selectedModelType === 'tfjs'
                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-200 border'
                  : 'bg-black/30 border border-amber-400/30 text-amber-200 hover:border-amber-400/60 hover:bg-black/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>⚙️</span>
              <span>Model TFJS</span>
            </motion.button>

            <motion.button
              onClick={() => setSelectedModelType('rag')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                selectedModelType === 'rag'
                  ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 border-teal-400 text-teal-200 border'
                  : 'bg-black/30 border border-amber-400/30 text-amber-200 hover:border-amber-400/60 hover:bg-black/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>🧠</span>
              <span>Model RAG</span>
            </motion.button>
          </div>
        </div>

        {/* Achievements */}
        {selectedModelType === 'tfjs' ? (
          path === '/chatsoekarno' ? (
            renderAchievementSection('Soekarno', achievementsSoekarno)
          ) : path === '/chathatta' ? (
            renderAchievementSection('Hatta', achievementsHatta)
          ) : (
            <>
              {renderAchievementSection('Soekarno', achievementsSoekarno)}
              {renderAchievementSection('Hatta', achievementsHatta)}
            </>
          )
        ) : (
          renderNoAchievementMessage()
        )}
      </div>
    );
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

        {/* Conditional Info - Model Selection & Achievements */}
        {renderConditionalInfo()}

        {/* Action Buttons */}
        <div className='p-1'>
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
            className='w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-300 hover:bg-red-900/40 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg mt-1'
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
    <header className='p-4 sm:p-3 mb-4 sm:mb-8 border-b border-amber-400/30 backdrop-blur-sm bg-black/10'>
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
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <Scroll className='w-4 h-4 sm:w-5 sm:h-5 text-amber-900' />
              </div>
              <div className='absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>

            <motion.h1
              className='text-xl sm:text-2xl lg:text-2xl font-bold truncate bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent'
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
                <div className='w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                  <User className='w-4 h-4 text-amber-900' />
                </div>
                <span className='text-amber-100 text-sm sm:text-base max-w-[100px] sm:max-w-[150px] truncate'>
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
