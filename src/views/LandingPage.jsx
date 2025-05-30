import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isTokenValid } = useAuthStore();

  const handleNext = async () => {
    if (isAuthenticated && isTokenValid) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#212529] text-white px-4 py-8 sm:px-6 md:px-12 lg:px-16 xl:px-20">
      <motion.div
        className="text-center w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight sm:tracking-tighter mb-6"
          variants={itemVariants}
        >
          HISTOTALK
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ADB5BD] mb-10 sm:mb-12 leading-relaxed px-2 sm:px-0"
          variants={itemVariants}
        >
          Ketika orang mati bercerita. Temui tokoh-tokoh sejarah dalam bentuk chatbot interaktif dan
          dengarkan kisah mereka dengan cara baru.
        </motion.p>

        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 text-base sm:text-lg md:text-xl rounded-lg bg-transparent text-white border border-white hover:ring-1 hover:ring-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Next
            <span>
              <ArrowRight />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 text-center text-gray-400 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>© 2025 HistoTalk. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
