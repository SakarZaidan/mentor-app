// src/components/LoadingScreen.js
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="w-16 h-16 bg-gradient-to-r from-primary-light to-secondary-light rounded-lg flex items-center justify-center text-white font-bold text-2xl"
      >
        M
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
