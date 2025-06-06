import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageCircle,
  Star,
  Scroll,
  Sparkles,
  Award,
  Settings,
  Shield,
  X,
  ChevronDown,
} from 'lucide-react';
import { useChatHattaPresenter } from '../presenters/ChatHattaPresenter';
import Layout from '../components/common/Layout';
import MessageBubbleHatta from '../components/chat/MessageBubbleHatta';
import TypingIndicatorHatta from '../components/chat/TypingIndicatorHatta';
import { clsx } from 'clsx';
import pakHatta from '../assets/pakhatta.png';

const TOTAL_TAGS = 10;

const ChatHattaView = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [percentageAchived, setPercentageAchieved] = useState(0);
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('selectedModelHatta') || 'tfjs';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const { messages, predictedTag, isLoading, error, sendMessage, setMessages } =
    useChatHattaPresenter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateTags = (predictedTag) => {
    setTags((prevTags) => {
      if (!prevTags.includes(predictedTag)) {
        const newTags = [...prevTags, predictedTag];
        const percentage = Math.floor((newTags.length / TOTAL_TAGS) * 100);
        setPercentageAchieved(percentage);

        localStorage.setItem('achievement-hatta', JSON.stringify(newTags));

        return newTags;
      }
      return prevTags;
    });
  };

  useEffect(() => {
    localStorage.setItem('selectedModelHatta', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    scrollToBottom();
    if (predictedTag) {
      updateTags(predictedTag);
    }
  }, [messages]);

  useEffect(() => {
    const savedTags = localStorage.getItem('achievement-hatta');
    if (savedTags) {
      const parsed = JSON.parse(savedTags);
      setTags(parsed);
      setPercentageAchieved(Math.floor((parsed.length / TOTAL_TAGS) * 100));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('chat-hatta');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse chat-hatta from localStorage', e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage, selectedModel);
    setInputMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const conversationStarters = [
    'Ceritakan tentang peristiwa Rengasdengklok',
    'Apa pemikiran Bapak tentang ekonomi Indonesia?',
    'Bagaimana pengalaman Bapak saat dibuang ke Boven Digoel?',
    'Ceritakan tentang koperasi dan ekonomi kerakyatan',
  ];

  return (
    <Layout>
      <div className='flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-4 lg:gap-6 p-2 sm:p-0'>
        {/* Main Chat Area */}
        <div className='flex-1 lg:w-5/7 flex flex-col bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl shadow-2xl'>
          {/* Chat Header */}
          <div className='p-3 sm:p-4 border-b border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-t-2xl'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                  <Shield className='w-5 h-5 sm:w-6 sm:h-6 text-amber-900' />
                </div>
                <div className='absolute bottom-0 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-amber-300'></div>
              </div>
              <div>
                <h2 className='text-lg sm:text-xl font-bold text-amber-100'>
                  Mohammad Hatta
                </h2>
                <p className='text-amber-200 text-xs sm:text-sm'>
                  Bapak Koperasi Indonesia
                </p>
              </div>
              <div className='ml-auto flex items-center gap-2 sm:gap-3'>
                <Star className='w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400' />
                {/* Mobile Sidebar Toggle */}
                <motion.button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className='lg:hidden p-1.5 sm:p-2 bg-black/30 border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-lg transition-all duration-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className='w-4 h-4 sm:w-5 sm:h-5 text-amber-300' />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className='flex-1 overflow-y-auto no-scrollbar p-3 sm:p-4 space-y-3 sm:space-y-4'>
            {messages.length === 0 ? (
              <motion.div
                className='flex flex-col items-center justify-center h-full text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className='relative mb-4 sm:mb-6'>
                  <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300 shadow-xl'>
                    <MessageCircle size={28} className='text-amber-900' />
                  </div>
                  <div className='absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
                </div>

                <h3 className='text-xl sm:text-2xl font-bold text-amber-100 mb-2 sm:mb-3'>
                  Mulai Percakapan dengan Mohammad Hatta
                </h3>
                <p className='text-amber-200 max-w-md mb-6 sm:mb-8 leading-relaxed text-sm'>
                  Tanyakan tentang perjuangan kemerdekaan, pemikiran ekonomi,
                  atau pengalaman beliau sebagai Wakil Presiden pertama
                  Indonesia.
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl'>
                  {conversationStarters.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className='px-3 py-2 sm:px-4 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl text-amber-100 hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300 text-xs sm:text-sm'
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Shield className='w-4 h-4 text-amber-400 mx-auto mb-2' />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubbleHatta key={message.id} message={message} />
                  ))}
                </AnimatePresence>
                {isLoading && <TypingIndicatorHatta />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='p-3 sm:p-4 border-t border-amber-400/30 bg-gradient-to-r from-amber-500/5 to-amber-600/5'>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 p-2 sm:p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-red-200 text-xs sm:text-sm backdrop-blur-sm'
              >
                <div className='flex items-center gap-2'>
                  <Sparkles className='w-3 h-3 sm:w-4 sm:h-4' />
                  {error}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='flex gap-2 sm:gap-3'>
              <div className='flex-1 relative'>
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder='Tanyakan sesuatu kepada Mohammad Hatta...'
                  className='w-full py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl text-amber-100 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300'
                  rows='1'
                  style={{
                    minHeight: '45px',
                    maxHeight: '100px',
                    height: 'auto',
                  }}
                  onInput={(e) => {
                    e.target.style.height = '45px';
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 100) + 'px';
                  }}
                  disabled={isLoading}
                />
              </div>

              <motion.button
                type='submit'
                disabled={!inputMessage.trim() || isLoading}
                className={clsx(
                  'px-3 py-2 sm:px-4 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[40px] sm:min-w-[50px] border-2',
                  {
                    'bg-black/20 border-amber-400/20 text-amber-300/50 cursor-not-allowed':
                      !inputMessage.trim() || isLoading,
                    'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-300 text-amber-900 hover:from-amber-400 hover:to-amber-500 shadow-lg hover:shadow-amber-500/25':
                      inputMessage.trim() && !isLoading,
                  }
                )}
                whileHover={
                  inputMessage.trim() && !isLoading ? { scale: 1.05 } : {}
                }
                whileTap={
                  inputMessage.trim() && !isLoading ? { scale: 0.95 } : {}
                }
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                    className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-600 border-t-amber-300 rounded-full'
                  />
                ) : (
                  <Send size={16} className='sm:w-[18px] sm:h-[18px]' />
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden'
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className='absolute right-0 top-0 h-full w-[80%] sm:w-80 bg-black/40 backdrop-blur-md border-l-2 border-amber-400/30 shadow-2xl overflow-auto'
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Sidebar Header */}
                <div className='p-3 sm:p-4 border-b border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-4 h-4 sm:w-5 sm:h-5 text-amber-400' />
                      <h3 className='text-base sm:text-lg font-bold text-amber-100'>
                        Profile & Settings
                      </h3>
                    </div>
                    <motion.button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className='p-1.5 sm:p-2 hover:bg-amber-500/20 rounded-lg transition-colors'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className='w-4 h-4 sm:w-5 sm:h-5 text-amber-300' />
                    </motion.button>
                  </div>
                </div>

                {/* Mobile Sidebar Content - Same as desktop */}
                <div className='p-4 sm:p-6 text-center border-b border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent'>
                  <div className='relative inline-block mb-3 sm:mb-4'>
                    <img
                      src={pakHatta || '/placeholder.svg'}
                      alt='Mohammad Hatta'
                      className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl sm:rounded-2xl border-4 border-amber-300 shadow-xl'
                    />
                    <div className='absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                      <Shield className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-900' />
                    </div>
                  </div>

                  <h2 className='text-lg sm:text-xl font-bold text-amber-100 mb-1'>
                    Mohammad Hatta
                  </h2>
                  <p className='text-amber-200 text-xs sm:text-sm mb-2'>
                    Bapak Koperasi Indonesia
                  </p>
                  <p className='text-amber-300 text-xs'>1902 - 1980</p>

                  <div className='flex items-center justify-center gap-2 mt-3 sm:mt-4'>
                    <div className='w-6 sm:w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
                    <Star className='w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400' />
                    <div className='w-6 sm:w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
                  </div>
                </div>

                {/* Model Selection */}
                <div className='p-4 sm:p-6 border-b border-amber-400/30'>
                  <div className='flex items-center gap-2 mb-3 sm:mb-4'>
                    <Settings className='w-4 h-4 sm:w-5 sm:h-5 text-amber-400' />
                    <h3 className='text-base sm:text-lg font-semibold text-amber-100'>
                      Pilih Model AI
                    </h3>
                  </div>

                  <div className='flex space-x-2'>
                    <motion.button
                      onClick={() => setSelectedModel('tfjs')}
                      className={`w-full p-2 sm:p-3 rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium border-2 ${
                        selectedModel === 'tfjs'
                          ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-200'
                          : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='flex items-center justify-center gap-2'>
                        <span>⚙️</span>
                        <span>TFJS</span>
                        {selectedModel === 'tfjs' && (
                          <Star className='w-3 h-3 sm:w-4 sm:h-4 fill-current' />
                        )}
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => setSelectedModel('rag')}
                      className={`w-full p-2 sm:p-3 rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium border-2 ${
                        selectedModel === 'rag'
                          ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 border-teal-400 text-teal-200'
                          : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='flex items-center justify-center gap-2'>
                        <span>🧠</span>
                        <span>RAG</span>
                        {selectedModel === 'rag' && (
                          <Star className='w-3 h-3 sm:w-4 sm:h-4 fill-current' />
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Mobile Achievements Section - No scrolling */}
                <div className='p-4 sm:p-6'>
                  <div className='mb-4'>
                    <div className='bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-1 shadow-lg'>
                      <div className='bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-center'>
                        <div className='flex items-center justify-center gap-2 mb-1'>
                          <Award className='w-4 h-4 sm:w-5 sm:h-5 text-amber-300' />
                          <span className='text-amber-100 text-sm font-semibold'>
                            Dialog Achievements
                          </span>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <div className='flex-1 bg-black/40 rounded-full h-1.5 sm:h-2'>
                            <motion.div
                              className='bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 sm:h-2 rounded-full'
                              initial={{ width: 0 }}
                              animate={{ width: `${percentageAchived}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className='text-amber-300 text-xs font-medium'>
                            {percentageAchived}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=''>
                    <div className='grid grid-cols-1 gap-2'>
                      {tags.length > 0 ? (
                        showAllAchievements ? (
                          tags.map((tag, idx) => (
                            <motion.div
                              key={idx}
                              className='flex items-center gap-2 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className='w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                                <Shield className='w-2.5 h-2.5 text-amber-900' />
                              </div>
                              <span className='text-amber-200 text-xs font-medium flex-1 truncate'>
                                {tag}
                              </span>
                            </motion.div>
                          ))
                        ) : (
                          <>
                            {tags.slice(0, 4).map((tag, idx) => (
                              <motion.div
                                key={idx}
                                className='flex items-center gap-2 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className='w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                                  <Shield className='w-2.5 h-2.5 text-amber-900' />
                                </div>
                                <span className='text-amber-200 text-xs font-medium flex-1 truncate'>
                                  {tag}
                                </span>
                              </motion.div>
                            ))}
                            {tags.length > 4 && (
                              <motion.button
                                onClick={() => setShowAllAchievements(true)}
                                className='flex items-center justify-center gap-1 mt-1 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:bg-black/40 hover:border-amber-400/50 transition-all duration-300'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className='text-xs'>
                                  Lihat semua ({tags.length})
                                </span>
                                <ChevronDown className='w-3 h-3' />
                              </motion.button>
                            )}
                          </>
                        )
                      ) : (
                        <div className='text-center py-6'>
                          <Scroll className='w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50 mx-auto mb-2' />
                          <p className='text-amber-200/50 text-xs sm:text-sm'>
                            Mulai percakapan untuk mendapatkan achievement
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div className='w-full lg:w-2/7 bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl shadow-2xl hidden lg:flex lg:flex-col'>
          {/* Profile Section */}
          <div className='p-5 text-center border-b border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent'>
            <div className='relative inline-block mb-4'>
              <img
                src={pakHatta || '/placeholder.svg'}
                alt='Mohammad Hatta'
                className='w-28 h-28 object-cover rounded-2xl border-4 border-amber-300 shadow-xl'
              />
              <div className='absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <Shield className='w-3.5 h-3.5 text-amber-900' />
              </div>
            </div>

            <h2 className='text-xl font-bold text-amber-100 mb-1'>
              Mohammad Hatta
            </h2>
            <p className='text-amber-200 text-sm mb-2'>
              Bapak Koperasi Indonesia
            </p>
            <p className='text-amber-300 text-xs'>1902 - 1980</p>

            <div className='flex items-center justify-center gap-2 mt-4'>
              <div className='w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
              <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
              <div className='w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
            </div>
          </div>

          {/* Model Selection */}
          <div className='p-5 border-b border-amber-400/30'>
            <div className='flex items-center gap-2 mb-4'>
              <Settings className='w-5 h-5 text-amber-400' />
              <h3 className='text-base font-semibold text-amber-100'>
                Pilih Model AI
              </h3>
            </div>

            <div className='flex space-x-2'>
              <motion.button
                onClick={() => setSelectedModel('tfjs')}
                className={`w-full p-2.5 rounded-xl transition-all duration-300 text-sm font-medium border-2 ${
                  selectedModel === 'tfjs'
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-200'
                    : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center justify-center gap-2'>
                  <span>⚙️</span>
                  <span>TFJS</span>
                  {selectedModel === 'tfjs' && (
                    <Star className='w-4 h-4 fill-current' />
                  )}
                </div>
              </motion.button>

              <motion.button
                onClick={() => setSelectedModel('rag')}
                className={`w-full p-2.5 rounded-xl transition-all duration-300 text-sm font-medium border-2 ${
                  selectedModel === 'rag'
                    ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 border-teal-400 text-teal-200'
                    : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center justify-center gap-2'>
                  <span>🧠</span>
                  <span>RAG</span>
                  {selectedModel === 'rag' && (
                    <Star className='w-4 h-4 fill-current' />
                  )}
                </div>
              </motion.button>
            </div>
          </div>

          {/* Achievements Section - No scrolling */}
          <div className='p-5 flex-grow'>
            <div className='mb-4'>
              <div className='bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-1 shadow-lg'>
                <div className='bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 text-center'>
                  <div className='flex items-center justify-center gap-2 mb-1'>
                    <Award className='w-5 h-5 text-amber-300' />
                    <span className='text-amber-100 font-semibold'>
                      Dialog Achievements
                    </span>
                  </div>
                  <div className='flex items-center justify-center gap-2'>
                    <div className='flex-1 bg-black/40 rounded-full h-2'>
                      <motion.div
                        className='bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full'
                        initial={{ width: 0 }}
                        animate={{ width: `${percentageAchived}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className='text-amber-300 text-sm font-medium'>
                      {percentageAchived}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className=''>
              <div className='grid grid-cols-2 gap-2'>
                {tags.length > 0 ? (
                  showAllAchievements ? (
                    <>
                      {tags.map((tag, idx) => (
                        <motion.div
                          key={idx}
                          className='flex items-center gap-2 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className='w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                            <Shield className='w-2.5 h-2.5 text-amber-900' />
                          </div>
                          <span className='text-amber-200 text-xs font-medium flex-1 truncate'>
                            {tag}
                          </span>
                        </motion.div>
                      ))}
                      {tags.length > 6 && (
                        <motion.button
                          onClick={() => setShowAllAchievements(false)}
                          className='col-span-2 flex items-center justify-center gap-1 mt-1 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:bg-black/40 hover:border-amber-400/50 transition-all duration-300'
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className='text-xs'>Sembunyikan</span>
                          <ChevronDown className='w-3 h-3 transform rotate-180' />
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <>
                      {tags.slice(0, 6).map((tag, idx) => (
                        <motion.div
                          key={idx}
                          className='flex items-center gap-2 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className='w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                            <Shield className='w-2.5 h-2.5 text-amber-900' />
                          </div>
                          <span className='text-amber-200 text-xs font-medium flex-1 truncate'>
                            {tag}
                          </span>
                        </motion.div>
                      ))}
                      {tags.length > 6 && (
                        <motion.button
                          onClick={() => setShowAllAchievements(true)}
                          className='col-span-2 flex items-center justify-center gap-1 mt-1 px-2 py-1.5 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:bg-black/40 hover:border-amber-400/50 transition-all duration-300'
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className='text-xs'>
                            Lihat semua ({tags.length})
                          </span>
                          <ChevronDown className='w-3 h-3' />
                        </motion.button>
                      )}
                    </>
                  )
                ) : (
                  <div className='text-center py-6 col-span-2'>
                    <Scroll className='w-8 h-8 text-amber-400/50 mx-auto mb-2' />
                    <p className='text-amber-200/50 text-sm'>
                      Mulai percakapan untuk mendapatkan achievement
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatHattaView;
