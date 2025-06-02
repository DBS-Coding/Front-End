import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { useChatHattaPresenter } from '../presenters/ChatHattaPresenter';
import pakHatta from "../assets/pakhatta.png";
import Layout from "../components/common/Layout";
import MessageBubble from '../components/chat/MessageBubbleHatta';
import TypingIndicator from '../components/chat/TypingIndicator';
import { clsx } from 'clsx';

const ChatHattaView = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
  } = useChatHattaPresenter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage);
    setInputMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-[85vh] bg-transparent gap-4">
        <div className="flex-1 lg:w-5/7 flex flex-col border border-[#ffffff34] rounded-lg bg-transparent">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center m-0">
                <div className="w-16 h-16 rounded-full bg-transparent border border-[#ffffff34] flex items-center justify-center mb-4">
                  <MessageCircle size={32} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Mulai Percakapan dengan Mohammad Hatta
                </h3>
                <p className="text-gray-400 max-w-md">
                  Tanyakan tentang perjuangan kemerdekaan, pemikiran ekonomi, atau pengalaman beliau sebagai Wakil Presiden pertama Indonesia.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {["Ceritakan tentang peristiwa Rengasdengklok", "Apa pemikiran Bapak tentang ekonomi Indonesia?", "Bagaimana pengalaman Bapak saat dibuang ke Boven Digoel?"].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-3 py-2 text-sm bg-transparent hover:bg-gray-700/80 border border-[#ffffff34] rounded-lg text-white transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
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

          <div className="p-4 border-t border-[#ffffff34]">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 p-3 bg-red-900/40 border border-red-600/40 rounded-lg text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tanyakan sesuatu kepada Mohammad Hatta..."
                  className="w-full sm:py-3 sm:px-4 px-2 py-2 text-sm sm:text-base 
             bg-transparent border border-[#ffffff34] rounded-lg text-white 
             placeholder-gray-400 resize-none focus:outline-none focus:ring-2 
             focus:ring-neutral-600 focus:border-transparent backdrop-blur-sm 
             transition-colors duration-200"
                  rows="1"
                  style={{ minHeight: '50px', maxHeight: '120px', height: 'auto' }}
                  onInput={(e) => {
                    e.target.style.height = '50px';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className={clsx(
                  "px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[50px] border border-[#ffffff34]",
                  {
                    'text-neutral-500 cursor-not-allowed': !inputMessage.trim() || isLoading,
                    'text-white hover:ring-1 hover:ring-neutral-400': inputMessage.trim() && !isLoading
                  }
                )}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-gray-600 border-t-white rounded-full"
                  />
                ) : (
                  <Send size={15} />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/7 border border-[#ffffff34] rounded-lg bg-transparent hidden lg:block">
          <div className="py-6 w-full text-center text-base px-6">
            <div className="border-b border-[#ffffff34] pb-4">
              <h2 className="text-2xl lg:text-3xl font-bold mb-0 text-white">Mohammad Hatta</h2>
              <p className="mt-1 text-gray-300">1902 - 1980</p>
            </div>
          </div>

          <div className="flex justify-center px-6 mb-4">
            <img 
              src={pakHatta} 
              alt="Mohammad Hatta" 
              className="object-cover w-48 h-48 lg:w-64 lg:h-64 rounded-lg border-2 border-[#ffffff34]"
            />
          </div>

          <div className="w-full flex flex-col items-center px-6 pb-6">
            <p className="px-12 py-2 border border-[#ffffff34] rounded-lg text-center text-sm mb-4 text-gray-300 bg-transparent">
              Fakta yang diketahui saat ini
            </p>

            <div className="space-y-3 text-center text-sm">
              <p className="text-gray-300">Wakil Presiden pertama Indonesia</p>
              <p className="text-gray-300">Bapak Koperasi Indonesia</p>
              <p className="text-gray-300">Ahli ekonomi dan pemikir demokrasi</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatHattaView;