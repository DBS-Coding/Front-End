import React from 'react';
import Layout from '../components/common/Layout';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ChatHattaView = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-full"
      >
        <div className="bg-transparent border border-[#ffffff34] rounded-lg p-6 h-full">
          <h2 className="text-2xl font-bold mb-4">Chat dengan Moh. Hatta</h2>
          <p className="text-gray-300">
            Sedang dikerjakan..
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ChatHattaView;