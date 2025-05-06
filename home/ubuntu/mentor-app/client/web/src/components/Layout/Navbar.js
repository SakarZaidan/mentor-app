// src/components/Layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Person, Notifications, Search } from '@mui/icons-material';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 bg-gradient-to-r from-primary-light to-secondary-light rounded-lg flex items-center justify-center text-white font-bold text-xl"
          >
            M
          </motion.div>
          <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Mentor
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Notifications className="text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Person className="text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
