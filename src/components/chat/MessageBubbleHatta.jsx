'use client';

import pakHatta from '../../assets/pakhatta.png';
import { User, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const MessageBubbleHatta = ({ message }) => {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx('flex mb-4', {
        'justify-end': isUser,
        'justify-start': !isUser,
      })}
    >
      <div
        className={clsx('flex items-start gap-3 max-w-[80%]', {
          'flex-row-reverse': isUser,
          'flex-row': !isUser,
        })}
      >
        {/* Avatar */}
        <div className='relative flex-shrink-0'>
          <div
            className={clsx(
              'w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg',
              {
                'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300':
                  isUser,
                'bg-gradient-to-br from-red-500 to-red-700 border-red-400':
                  !isUser && isError,
                'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300':
                  !isUser && !isError,
              }
            )}
          >
            {isUser ? (
              <User size={18} className='text-blue-900' />
            ) : (
              <img
                src={pakHatta || '/placeholder.svg'}
                alt='Mohammad Hatta'
                className='rounded-full w-full h-full object-cover'
              />
            )}
          </div>

          {/* Status indicator for Hatta */}
          {!isUser && !isError && (
            <div className='absolute bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
          )}
        </div>

        {/* Message Content */}
        <div className='flex flex-col'>
          {/* Sender name for bot */}
          {!isUser && (
            <div className='flex items-center gap-1 mb-1 px-1'>
              <span className='text-amber-200 text-xs font-medium'>
                Mohammad Hatta
              </span>
              {!isError && <Shield className='w-3 h-3 text-amber-400' />}
            </div>
          )}

          {/* Message Bubble */}
          <motion.div
            className={clsx(
              'relative px-4 py-3 rounded-2xl border-2 backdrop-blur-sm shadow-lg',
              {
                'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/50 text-blue-100 rounded-br-md':
                  isUser,
                'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/50 text-red-200 rounded-bl-md':
                  !isUser && isError,
                'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-400/50 text-amber-100 rounded-bl-md':
                  !isUser && !isError,
              }
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Message tail */}
            <div
              className={clsx('absolute top-3 w-3 h-3 rotate-45 border-2', {
                'right-[-7px] bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-r-blue-400/50 border-b-blue-400/50 border-l-transparent border-t-transparent':
                  isUser,
                'left-[-7px] bg-gradient-to-br from-red-500/20 to-red-600/20 border-l-red-400/50 border-t-red-400/50 border-r-transparent border-b-transparent':
                  !isUser && isError,
                'left-[-7px] bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-l-amber-400/50 border-t-amber-400/50 border-r-transparent border-b-transparent':
                  !isUser && !isError,
              })}
            />

            <p className='text-sm leading-relaxed'>{message.text}</p>

            {/* Timestamp */}
            <div
              className={clsx(
                'flex items-center gap-1 mt-2 text-xs opacity-70',
                {
                  'justify-end': isUser,
                  'justify-start': !isUser,
                }
              )}
            >
              <Clock size={12} />
              <span>{message.timestamp}</span>
              {isError && (
                <>
                  <Shield size={12} className='text-red-400 ml-1' />
                  <span className='text-red-400'>Error</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubbleHatta;
