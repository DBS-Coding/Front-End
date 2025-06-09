// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { clsx } from "clsx";

const InputArea = ({ inputMessage, setInputMessage, handleSubmit, handleKeyPress, inputRef, error, isLoading }) => {
  return (
    <div className="p-2 sticky bottom-0 z-20">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-2 sm:p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-red-200 text-xs sm:text-sm backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            {error}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <div className="w-full">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tanyakan sesuatu kepada Ir. Soekarno..."
            className="w-full py-2 px-3 sm:px-4 text-xs sm:text-sm 
                    bg-black/40 backdrop-blur-sm
                    border-2 border-amber-400/30 
                    rounded-xl text-amber-100 
                    placeholder-amber-200 
                    resize-none focus:outline-none 
                    focus:ring-2 focus:ring-amber-400/60 
                    focus:border-amber-400/70 
                    transition-all duration-300 no-scrollbar"
            rows="1"
            style={{
              minHeight: "45px",
              maxHeight: "100px",
              height: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "45px";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 100) + "px";
            }}
            disabled={isLoading}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className={clsx(
            "px-3 py-2 sm:px-4 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[40px] sm:min-w-[50px] border-2",
            {
              "bg-black/20 border-amber-400/20 text-amber-300/50 cursor-not-allowed":
                !inputMessage.trim() || isLoading,
              "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-300 text-amber-900 hover:from-amber-400 hover:to-amber-500 shadow-lg hover:shadow-amber-500/25":
                inputMessage.trim() && !isLoading,
            }
          )}
          whileHover={inputMessage.trim() && !isLoading ? { scale: 1.05 } : {}}
          whileTap={inputMessage.trim() && !isLoading ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-600 border-t-amber-300 rounded-full"
            />
          ) : (
            <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default InputArea;
