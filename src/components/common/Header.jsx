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
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { useNavigationPresenter } from '../../hooks/navigationutils';
import { useLocation } from "react-router-dom";
import pakKarno from "../../assets/pakkarno.png";
import pakHatta from "../../assets/pakhatta.png";

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
    responsesHatta: {}
  });
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const loadModelData = async () => {
      try {
        setIsModelLoading(true);
        
        const [contentSoekarnoResponse, contentHattaResponse] = await Promise.all([
          fetch("/tfjs_saved_model/content_soekarno.json"),
          fetch("/tfjs_saved_model/content_hatta.json")
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
          responsesHatta
        });
      } catch (error) {
        console.error("Error loading model data:", error);
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
   const key = character === 'soekarno' ? 'achievement-soekarno' : 'achievement-hatta';
    return JSON.parse(localStorage.getItem(key)) || [];
  };


const renderConditionalInfo = () => {
  const path = location.pathname;

  const achievementsSoekarno = getAchievementsFromLocalStorage('soekarno');
  const achievementsHatta = getAchievementsFromLocalStorage('hatta');

  const renderAchievementSection = (character, data) => (
    <div>
      <p className='text-amber-300 text-center'>Achievement {character}</p>
      <div className='my-2 flex flex-wrap gap-2 items-center text-center mx-5'>
        {isModelLoading ? (
          <p className="text-xs text-amber-200 w-full text-center py-2">
            Loading achievement...
          </p>
        ) : data.length > 0 ? (
          data.map((tag, i) => (
            <p key={`${character}-${i}`} className="text-xs text-amber-200 w-[48%] border border-amber-200 rounded-md py-1.5 px-3 hover:cursor-default capitalize">
              {tag.replace(/_/g, ' ')}
            </p>
          ))
        ) : (
          <p className="text-xs text-amber-200 w-full text-center py-2">
            No Achievements Unlocked
          </p>
        )}
      </div>
    </div>
  );

  const renderNoAchievementMessage = () => (
    <div className='my-2 flex flex-wrap gap-2 items-center text-center mx-5'>
      <p className="text-xs text-amber-200 w-full text-center py-2">
        No Achievement for RAG Model
      </p>
    </div>
  );

  return (
    <div className="border-b border-amber-400/30">
      <div className='flex justify-center mt-4 rounded-md'>
        <img
          src={path === '/chatsoekarno' ? pakKarno : path === '/chathatta' ? pakHatta : pakKarno}
          alt='avatar'
          className='w-48 h-48'
        />
      </div>

      <div className='flex flex-col my-3 gap-1'>
        <p className='text-amber-300 text-center'>Pilih Model</p>
        <div className='flex gap-3 justify-center items-center'>
          <button
            onClick={() => setSelectedModelType('tfjs')}
            className={`text-xs text-amber-300 border rounded-md py-1.5 px-3 hover:cursor-pointer ${
              selectedModelType === 'tfjs'
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-amber-200'
            }`}
          >
            ⚙️ Model TFJS
          </button>
          <button
            onClick={() => setSelectedModelType('rag')}
            className={`text-xs text-amber-300 border rounded-md py-1.5 px-3 hover:cursor-pointer ${
              selectedModelType === 'rag'
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-amber-200'
            }`}
          >
            🧠 Model RAG
          </button>
        </div>
      </div>

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
        className='fixed w-64 bg-black/90 backdrop-blur-md border-2 border-amber-400/30 rounded-xl shadow-2xl z-[99999]'
        style={{
          top: position.top + 'px',
          right: position.right + 'px',
        }}
      >
        <div className='py-2'>
          <div className='px-4 py-3 border-b border-amber-400/30'>
            <div className='flex items-center gap-2 mb-1'>
              <Crown className='w-3 h-3 text-amber-400' />
              <p className='text-xs text-amber-300'>Masuk sebagai</p>
            </div>
            <p className='text-sm font-medium text-amber-100 truncate'>
              {user?.data?.name || 'User'}
            </p>
             <p className="text-xs text-amber-300">Email: {user?.data?.email}</p>
          </div>

          {renderConditionalInfo()}

          <div className='py-2'>
            <motion.button
              onClick={() => handleDropdownAction(handleDeleteAccount)}
              disabled={isLoading}
              className='w-full flex items-center space-x-3 px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/40 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
              whileHover={{ x: 3 }}
            >
              <Trash2 className='w-4 h-4' />
              <span>{isLoading ? 'Menghapus...' : 'Hapus Akun'}</span>
            </motion.button>

            <motion.button
              onClick={() => handleDropdownAction(handleLogout)}
              disabled={isLoading}
              className='w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-300 hover:bg-red-900/40 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
              whileHover={{ x: 3 }}
            >
              <LogOut className='w-4 h-4' />
              <span>{isLoading ? 'Keluar...' : 'Keluar'}</span>
            </motion.button>
          </div>
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