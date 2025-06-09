"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import clsx from "clsx";
import { User, Clock, Shield } from "lucide-react";

const MessageBubble = ({ message, image, name }) => {
  const isUser = message.sender === "user";
  const isError = message.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx("flex mb-4", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={clsx("flex max-w-[90%]", {
          "items-end": isUser,
          "items-start": !isUser,
          "flex-col sm:flex-row-reverse": isUser,
          "flex-col sm:flex-row": !isUser,
        })}
      >
        {/* Avatar - Aligned to sides for mobile */}
        <div
          className={clsx(
            "relative flex space-x-1 md:block flex-shrink-0 mb-2 sm:mb-0",
            {
              "self-end md:self-start sm:ml-3": isUser,
              "self-start sm:mr-3": !isUser,
            }
          )}
        >
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg",
              {
                "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300":
                  isUser,
                "bg-gradient-to-br from-red-500 to-red-700 border-red-400":
                  !isUser && isError,
                "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300":
                  !isUser && !isError,
              }
            )}
          >
            {isUser ? (
              <User size={18} className="text-blue-900" />
            ) : (
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className="rounded-full w-full h-full object-cover"
              />
            )}
          </div>
          {!isUser && (
            <div className="flex md:hidden items-center gap-1 mb-1 px-1">
              <span className="text-amber-200 text-sm font-medium">
                {name}
              </span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex flex-col w-full">
          {/* Sender name for bot - desktop version */}
          {!isUser && (
            <div className="hidden md:flex items-center gap-1 mb-1 px-1">
              <span className="text-amber-200 text-xs font-medium">
                {name}
              </span>
            </div>
          )}

          {/* Message Bubble */}
          <motion.div
            className={clsx(
              "relative px-4 py-3 rounded-2xl border-2 backdrop-blur-sm shadow-lg",
              {
                "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/50 text-blue-100 rounded-br-md":
                  isUser,
                "bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/50 text-red-200 rounded-bl-md":
                  !isUser && isError,
                "bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-400/50 text-amber-100 rounded-bl-md":
                  !isUser && !isError,
              }
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Desktop message tail */}
            <div
              className={clsx(
                "absolute w-3 h-3 rotate-45 border-2 hidden sm:block",
                {
                  "right-[-7px] top-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-r-blue-400/50 border-b-blue-400/50 border-l-transparent border-t-transparent":
                    isUser,
                  "left-[-7px] top-3 bg-gradient-to-br from-red-500/20 to-red-600/20 border-l-red-400/50 border-t-red-400/50 border-r-transparent border-b-transparent":
                    !isUser && isError,
                  "left-[-7px] top-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-l-amber-400/50 border-t-amber-400/50 border-r-transparent border-b-transparent":
                    !isUser && !isError,
                }
              )}
            />

            {/* Mobile-only upper tail that points to the avatar above */}
            <div
              className={clsx(
                "absolute w-3 h-3 rotate-45 border-2 top-[-7px] sm:hidden",
                {
                  "right-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-t-blue-400/50 border-l-blue-400/50 border-r-transparent border-b-transparent":
                    isUser,
                  "left-3 bg-gradient-to-br from-red-500/20 to-red-600/20 border-t-red-400/50 border-l-red-400/50 border-r-transparent border-b-transparent":
                    !isUser && isError,
                  "left-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-t-amber-400/50 border-l-amber-400/50 border-r-transparent border-b-transparent":
                    !isUser && !isError,
                }
              )}
            />

            <p className="text-sm leading-relaxed">{message.text}</p>

            {/* Timestamp */}
            <div
              className={clsx(
                "flex items-center gap-1 mt-2 text-xs opacity-70",
                {
                  "justify-end": isUser,
                  "justify-start": !isUser,
                }
              )}
            >
              <Clock size={12} />
              <span>{message.timestamp}</span>
              {isError && (
                <>
                  <Shield size={12} className="text-red-400 ml-1" />
                  <span className="text-red-400">Error</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
