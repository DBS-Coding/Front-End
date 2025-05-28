  import pakKarno from "../../assets/pakkarno.png";
  // eslint-disable-next-line no-unused-vars
  import { motion } from "framer-motion";
  
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center">
          <img src={pakKarno} alt='irsoekarno' className='rounded-full w-full h-full object-cover'/>
        </div>
        <div className="bg-transparent backdrop-blur-sm border border-[#ffffff34] px-4 py-3 rounded-2xl rounded-bl-sm">
          <div className="flex gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  export default TypingIndicator;