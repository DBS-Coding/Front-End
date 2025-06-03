import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageCircle,
  Crown,
  Star,
  Scroll,
  Sparkles,
  Award,
  Settings,
} from 'lucide-react';
import { useChatSoekarnoPresenter } from '../presenters/ChatSoekarnoPresenter';
import Layout from '../components/common/Layout';
import MessageBubble from '../components/chat/MessageBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import { clsx } from 'clsx';
import pakKarno from '../assets/pakkarno.png';

const TOTAL_TAGS = 10;

const ChatSoekarnoView = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [percentageAchived, setPercentageAchieved] = useState(0);
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('selectedModelSoekarno') || 'tfjs';
  });

  const { messages, predictedTag, isLoading, error, sendMessage } =
    useChatSoekarnoPresenter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateTags = (predictedTag) => {
    setTags((prevTags) => {
      if (!prevTags.includes(predictedTag)) {
        const newTags = [...prevTags, predictedTag];
        const percentage = Math.floor((newTags.length / TOTAL_TAGS) * 100);
        setPercentageAchieved(percentage);
        return newTags;
      }
      return prevTags;
    });
  };

  useEffect(() => {
    localStorage.setItem('selectedModelSoekarno', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    scrollToBottom();
    if (predictedTag) {
      updateTags(predictedTag);
    }
  }, [messages]);

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
    'Ceritakan tentang Proklamasi Kemerdekaan',
    'Apa visi Bapak untuk Indonesia?',
    'Bagaimana perjuangan melawan penjajah?',
    'Ceritakan tentang Pancasila',
  ];

  return (
    <Layout>
      <div className='flex flex-col lg:flex-row h-[85vh] gap-6'>
        {/* Main Chat Area */}
        <div className='flex-1 lg:w-5/7 flex flex-col bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl shadow-2xl'>
          {/* Chat Header */}
          <div className='p-4 border-b border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-t-2xl'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                  <Crown className='w-6 h-6 text-amber-900' />
                </div>
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-amber-300'></div>
              </div>
              <div>
                <h2 className='text-xl font-bold text-amber-100'>
                  IR. Soekarno
                </h2>
                <p className='text-amber-200 text-sm'>
                  Proklamator Kemerdekaan Indonesia
                </p>
              </div>
              <div className='ml-auto'>
                <Star className='w-5 h-5 text-amber-400 fill-amber-400' />
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className='flex-1 overflow-y-auto no-scrollbar p-4 space-y-4'>
            {messages.length === 0 ? (
              <motion.div
                className='flex flex-col items-center justify-center h-full text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300 shadow-xl'>
                    <MessageCircle size={32} className='text-amber-900' />
                  </div>
                  <div className='absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
                </div>

                <h3 className='text-2xl font-bold text-amber-100 mb-3'>
                  Mulai Percakapan dengan IR. Soekarno
                </h3>
                <p className='text-amber-200 max-w-md mb-8 leading-relaxed'>
                  Tanyakan tentang perjuangan kemerdekaan, visi Indonesia, atau
                  pengalaman beliau sebagai Presiden pertama Indonesia.
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl'>
                  {conversationStarters.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className='px-4 py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl text-amber-100 hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300 text-sm'
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Crown className='w-4 h-4 text-amber-400 mx-auto mb-2' />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>
                {isLoading && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='p-4 border-t border-amber-400/30 bg-gradient-to-r from-amber-500/5 to-amber-600/5'>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-red-200 text-sm backdrop-blur-sm'
              >
                <div className='flex items-center gap-2'>
                  <Sparkles className='w-4 h-4' />
                  {error}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='flex gap-3'>
              <div className='flex-1 relative'>
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder='Tanyakan sesuatu kepada IR. Soekarno...'
                  className='w-full py-3 px-4 text-sm sm:text-base bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl text-amber-100 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300'
                  rows='1'
                  style={{
                    minHeight: '50px',
                    maxHeight: '120px',
                    height: 'auto',
                  }}
                  onInput={(e) => {
                    e.target.style.height = '50px';
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  disabled={isLoading}
                />
              </div>

              <motion.button
                type='submit'
                disabled={!inputMessage.trim() || isLoading}
                className={clsx(
                  'px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[50px] border-2',
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
                    className='w-5 h-5 border-2 border-amber-600 border-t-amber-300 rounded-full'
                  />
                ) : (
                  <Send size={18} />
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className='w-full lg:w-2/7 bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl shadow-2xl hidden lg:block overflow-auto'>
          {/* Profile Section */}
          <div className='p-6 text-center border-b border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent'>
            <div className='relative inline-block mb-4'>
              <img
                src={pakKarno || '/placeholder.svg'}
                alt='IR. Soekarno'
                className='w-32 h-32 object-cover rounded-2xl border-4 border-amber-300 shadow-xl'
              />
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <Crown className='w-4 h-4 text-amber-900' />
              </div>
            </div>

            <h2 className='text-2xl font-bold text-amber-100 mb-1'>
              IR. Soekarno
            </h2>
            <p className='text-amber-200 text-sm mb-2'>
              Proklamator Kemerdekaan
            </p>
            <p className='text-amber-300 text-xs'>1901 - 1970</p>

            <div className='flex items-center justify-center gap-2 mt-4'>
              <div className='w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
              <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
              <div className='w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
            </div>
          </div>

          {/* Model Selection */}
          <div className='p-6 border-b border-amber-400/30'>
            <div className='flex items-center gap-2 mb-4'>
              <Settings className='w-5 h-5 text-amber-400' />
              <h3 className='text-lg font-semibold text-amber-100'>
                Pilih Model AI
              </h3>
            </div>

            <div className='space-y-3'>
              <motion.button
                onClick={() => setSelectedModel('tfjs')}
                className={`w-full p-3 rounded-xl transition-all duration-300 text-sm font-medium border-2 ${
                  selectedModel === 'tfjs'
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-200'
                    : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center justify-center gap-2'>
                  <span>⚙️</span>
                  <span>Model TFJS</span>
                  {selectedModel === 'tfjs' && (
                    <Star className='w-4 h-4 fill-current' />
                  )}
                </div>
              </motion.button>

              <motion.button
                onClick={() => setSelectedModel('rag')}
                className={`w-full p-3 rounded-xl transition-all duration-300 text-sm font-medium border-2 ${
                  selectedModel === 'rag'
                    ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 border-teal-400 text-teal-200'
                    : 'bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center justify-center gap-2'>
                  <span>🧠</span>
                  <span>Model RAG</span>
                  {selectedModel === 'rag' && (
                    <Star className='w-4 h-4 fill-current' />
                  )}
                </div>
              </motion.button>
            </div>
          </div>

          {/* Achievements Section */}
          <div className='p-6'>
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

            <div className='max-h-64 overflow-y-auto no-scrollbar'>
              <div className='grid grid-cols-2 gap-3'>
                {tags.length > 0 ? (
                  tags.map((tag, idx) => (
                    <motion.div
                      key={idx}
                      className='flex items-center gap-3 px-3 py-2 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className='w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center'>
                        <Crown className='w-3 h-3 text-amber-900' />
                      </div>
                      <span className='text-amber-200 text-sm font-medium flex-1'>
                        {tag}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className='text-center py-8'>
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

export default ChatSoekarnoView;
