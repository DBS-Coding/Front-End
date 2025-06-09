// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const TypingIndicator = ({image, name, Icon}) => {
  const dotVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: { scale: 1.2, opacity: 1 },
  };

  const dotTransition = {
    duration: 0.6,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='flex justify-start mb-4'
    >
      <div className='flex items-start gap-3 max-w-[80%]'>
        {/* Avatar */}
        <div className='relative flex-shrink-0'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-300 shadow-lg flex items-center justify-center'>
            <img
              src={image || '/placeholder.svg'}
              alt={name}
              className='rounded-full w-full h-full object-cover'
            />
          </div>

          {/* Status indicator */}
          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>

          {/* Crown badge */}
          <div className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border border-amber-300'>
            <Icon className='w-2.5 h-2.5 text-amber-900' />
          </div>
        </div>

        {/* Typing Content */}
        <div className='flex flex-col'>
          {/* Sender name */}
          <div className='flex items-center gap-1 mb-1 px-1'>
            <span className='text-amber-200 text-xs font-medium'>
              {name}
            </span>
            <Icon className='w-3 h-3 text-amber-400' />
          </div>

          {/* Typing Bubble */}
          <motion.div
            className='bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border-2 border-amber-400/50 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg relative'
            whileHover={{ scale: 1.01 }}
          >
            {/* Message tail */}
            <div className='absolute left-[-7px] top-3 w-3 h-3 rotate-45 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-l-amber-400/50 border-t-amber-400/50 border-r-transparent border-b-transparent border-2' />

            {/* Typing content */}
            <div className='flex items-center gap-2'>
              <MessageCircle className='w-4 h-4 text-amber-300' />
              <span className='text-amber-200 text-sm'>sedang mengetik</span>
              <div className='flex gap-1 ml-1'>
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className='w-2 h-2 bg-amber-400 rounded-full'
                    variants={dotVariants}
                    initial='initial'
                    animate='animate'
                    transition={{
                      ...dotTransition,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
