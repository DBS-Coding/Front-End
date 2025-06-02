import pakKarno from "../../assets/pakhatta.png";
import { User, Clock } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import clsx from 'clsx';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <motion.div
      className={clsx("flex mb-4", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={clsx("flex items-start gap-3 max-w-[80%]", {
          "flex-row-reverse": isUser,
          "flex-row": !isUser,
        })}
      >
        <div
          className={clsx(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            {
              "bg-[#222831] border border-white": isUser,
              "bg-red-600": !isUser && isError,
              "bg-amber-700": !isUser && !isError,
            }
          )}
        >
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <img
              src={pakKarno}
              alt="irsoekarno"
              className="rounded-full w-full h-full object-cover"
            />
          )}
        </div>

        <div
          className={clsx(
            "relative px-4 py-3 rounded-2xl border",
            {
              "bg-[#222831] text-white border-[#ffffff34] rounded-br-sm": isUser,
              "bg-red-900/40 border-red-600/40 text-red-300 rounded-bl-sm": !isUser && isError,
              "bg-[#222831] text-white backdrop-blur-sm border-[#ffffff34] rounded-bl-sm": !isUser && !isError,
            }
          )}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
          <div
            className={clsx("flex items-center gap-1 mt-1 text-xs opacity-70", {
              "justify-end": isUser,
              "justify-start": !isUser,
            })}
          >
            <Clock size={10} />
            <span>{message.timestamp}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
