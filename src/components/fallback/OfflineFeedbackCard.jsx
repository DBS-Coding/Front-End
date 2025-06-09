import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { WifiOff } from 'lucide-react'

const OfflineFeedbackCard = () => {
  return (
    <motion.div 
      className='bg-red-400 text-white px-5 py-3 fixed bottom-6 left-6 flex gap-2 z-[99] rounded-md shadow-lg'
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1 
      }}
      exit={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ 
          duration: 0.5, 
          delay: 0.2,
          repeat: 1 
        }}
      >
        <WifiOff />
      </motion.div>
      <p>Upss!! sepertinya internet Anda bermasalah</p>
    </motion.div>
  )
}

export default OfflineFeedbackCard