// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star, Settings } from "lucide-react";

const ModelSelect = ({ selectedModel, handleChangeModel }) => {
  return (
    <div className="p-2 sm:p-4 border-b border-amber-400/30">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        <h3 className="text-base sm:text-lg font-semibold text-amber-100">
          Pilih Model AI
        </h3>
      </div>

      <div className="flex space-x-2">
        <motion.button
          onClick={() => handleChangeModel("tfjs")}
          className={`w-full p-2 rounded-xl transition-all duration-300 text-xs font-medium border-2 ${
            selectedModel === "tfjs"
              ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-200"
              : "bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span>⚙️</span>
            <span>TFJS</span>
            {selectedModel === "tfjs" && (
              <Star className="w-3 h-3 fill-current" />
            )}
          </div>
        </motion.button>

        <motion.button
          onClick={() => handleChangeModel("rag")}
          className={`w-full p-2 rounded-xl transition-all duration-300 text-xs font-medium border-2 ${
            selectedModel === "rag"
              ? "bg-gradient-to-r from-teal-500/20 to-teal-600/20 border-teal-400 text-teal-200"
              : "bg-black/30 border-amber-400/30 text-amber-200 hover:border-amber-400/50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span>🧠</span>
            <span>RAG</span>
            {selectedModel === "rag" && (
              <Star className="w-3 h-3 fill-current" />
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default ModelSelect;
