// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

const ChatHeader = ({image, name, deskripsi, setIsMobileSidebarOpen}) => {
  return (
    <div className="sticky top-0 z-10 w-full p-2 border-b border-amber-400/30 backdrop-blur-sm bg-black/30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300">
            <img src={image} className="rounded-full" alt="Soekarno" />
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-amber-100">
            {name}
          </h2>
          <p className="text-amber-200 text-xs sm:text-sm">
            {deskripsi}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Mobile Sidebar Toggle */}
          <motion.button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-3 bg-black/30 border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
