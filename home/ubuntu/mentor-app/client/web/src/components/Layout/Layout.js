// src/components/Layout/Layout.js
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-background-dark text-white' : 'bg-background-light text-gray-900'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <button
              onClick={toggleDarkMode}
              className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-primary-light dark:bg-primary-dark text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </button>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
