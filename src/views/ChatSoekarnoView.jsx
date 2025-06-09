import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Crown, X } from "lucide-react";
import { useChatSoekarnoPresenter } from "../presenters/ChatSoekarnoPresenter";
import pakKarno from "../assets/pakkarno.png";

import Layout from "../components/common/Layout";
import Achivement from "../components/chat/Achivement";
import Profile from "../components/chat/Profile";
import ModelSelect from "../components/chat/ModelSelect";
import ChatHeader from "../components/chat/ChatHeader";
import MessageArea from "../components/chat/MessageArea";
import InputArea from "../components/chat/InputArea";

const TOTAL_TAGS = 10;
const audioSelectModel = new Audio("/sounds/click-buttons-model.mp3");
const audioAchivement = new Audio("/sounds/game-bonus.mp3");

const ChatSoekarnoView = () => {
  // State variables remain the same
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [percentageAchived, setPercentageAchieved] = useState(0);
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("selectedModelSoekarno") || "tfjs";
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { messages, predictedTag, isLoading, error, sendMessage, setMessages } =
    useChatSoekarnoPresenter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateTags = (predictedTag) => {
    setTags((prevTags) => {
      if (!prevTags.includes(predictedTag)) {
        const newTags = [...prevTags, predictedTag];
        const percentage = Math.floor((newTags.length / TOTAL_TAGS) * 100);
        setPercentageAchieved(percentage);

        // Jalankan suara dari folder public/sounds/
        audioAchivement.play().catch((err) => {
          console.warn("audioAchivement failed:", err.message);
        });

        localStorage.setItem("achievement-soekarno", JSON.stringify(newTags));

        return newTags;
      }
      return prevTags;
    });
  };

  // Effects remain the same
  useEffect(() => {
    localStorage.setItem("selectedModelSoekarno", selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    scrollToBottom();
    if (predictedTag) {
      updateTags(predictedTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const savedTags = localStorage.getItem("achievement-soekarno");
    if (savedTags) {
      const parsed = JSON.parse(savedTags);
      setTags(parsed);
      setPercentageAchieved(Math.floor((parsed.length / TOTAL_TAGS) * 100));
    }

    const stored = localStorage.getItem("chat-soekarno");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeModel = (model) => {
    audioSelectModel.play().catch((err) => {
      console.error("audioSelectModel failed:", err.message);
    });
    setSelectedModel(model);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage, selectedModel);
    setInputMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const conversationStarters = [
    "Ceritakan tentang Proklamasi Kemerdekaan",
    "Apa visi Bapak untuk Indonesia?",
    "Bagaimana perjuangan melawan penjajah?",
    "Ceritakan tentang Pancasila",
  ];

  return (
    <Layout>
      {/* FIXED: Adjusted the height of the container to prevent overflow */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-4 lg:gap-6 sm:p-0">
        {/* Main Chat Area */}
        <div className="flex-1 overflow-clip relative lg:w-5/7 flex flex-col bg-black/20 border-2 border-amber-400/30 rounded-2xl shadow-2xl">
          {/* Chat Header */}
          <ChatHeader
            image={pakKarno}
            name="Ir. Soekarno"
            deskripsi="Proklamator Kemerdekaan Indonesia"
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          />

          {/* Messages Area - Add custom scrollbar styling */}
          <MessageArea
            messages={messages}
            conversationStarters={conversationStarters}
            setInputMessage={setInputMessage}
            messagesEndRef={messagesEndRef}
            scrollToBottom={scrollToBottom}
            isLoading={isLoading}
            text="perjuangan kemerdekaan, visi Indonesia, atau pengalaman beliau sebagai Presiden pertama Indonesia."
            image={pakKarno}
            name="Ir. Soekarno"
            Icon={Crown}
          />

          {/* Input Area */}
          <InputArea
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSubmit={handleSubmit}
            handleKeyPress={handleKeyPress}
            inputRef={inputRef}
            error={error}
            isLoading={isLoading}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-[80%] sm:w-80 bg-black/20 backdrop-blur-md border-l-2 border-amber-400/30 shadow-2xl overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Sidebar Header */}
                <div className="p-3 sm:p-4 border-b border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                      <h3 className="text-base sm:text-lg font-bold text-amber-100">
                        Profile & Settings
                      </h3>
                    </div>
                    <motion.button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1.5 sm:p-2 hover:bg-amber-500/20 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Mobile Sidebar Content - Same as desktop */}
                <Profile
                  image={pakKarno}
                  nama="Ir. Soekarno"
                  tahun="1901 - 1970"
                  Icon={Crown}
                />

                {/* MOBILE - Model Selection */}
                <ModelSelect
                  selectedModel={selectedModel}
                  handleChangeModel={handleChangeModel}
                />

                {/* Mobile Achievements Section */}
                <Achivement percentageAchived={percentageAchived} tags={tags} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FIXED: Desktop Sidebar - Removed min-h-screen, added flex-shrink-0 and proper overflow handling */}
        <div className="w-full lg:w-2/7 bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl shadow-2xl hidden lg:flex lg:flex-col flex-shrink-0 overflow-hidden">
          <Profile
            image={pakKarno}
            nama="Ir. Soekarno"
            tahun="1901 - 1970"
            Icon={Crown}
          />

          {/* DESKTOP - Model Selection */}
          <ModelSelect
            selectedModel={selectedModel}
            handleChangeModel={handleChangeModel}
          />

          {/* DESKTOP: Achievements Section */}
          <Achivement percentageAchived={percentageAchived} tags={tags} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatSoekarnoView;
