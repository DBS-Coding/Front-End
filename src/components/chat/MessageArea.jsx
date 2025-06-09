// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Crown, MessageCircle, ChevronDown } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useState, useRef, useEffect } from "react";

const MessageArea = ({
  messages,
  conversationStarters,
  setInputMessage,
  messagesEndRef,
  scrollToBottom,
  isLoading,
  text,
  image,
  name,
  Icon,
}) => {
  const containerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;
      setShowScrollToBottom(!nearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 no-scrollbar"
    >
      {messages.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300 shadow-xl">
              <MessageCircle size={28} className="text-amber-900" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse"></div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-2 sm:mb-3">
            Mulai Percakapan dengan {name}
          </h3>
          <p className="text-amber-200 max-w-md mb-6 sm:mb-8 leading-relaxed text-sm">
            Tanyakan tentang {text}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl">
            {conversationStarters.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="px-3 py-2 sm:px-4 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl text-amber-100 hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300 text-xs sm:text-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Crown className="w-4 h-4 text-amber-400 mx-auto mb-2" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                image={image}
                name={name}
              />
            ))}
          </AnimatePresence>
          {isLoading && (
            <TypingIndicator image={image} name={name} Icon={Icon} />
          )}
        </>
      )}

      <div ref={messagesEndRef} />

      {showScrollToBottom && (
        <motion.button
          onClick={scrollToBottom}
          className="fixed bottom-30 right-1/2 z-50 p-2 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 transition-all shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-5 h-5 text-amber-300" />
        </motion.button>
      )}
    </div>
  );
};

export default MessageArea;
