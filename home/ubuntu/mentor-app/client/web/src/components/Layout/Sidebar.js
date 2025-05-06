// src/components/Layout/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Explore, 
  CheckCircle, 
  Assignment, 
  Timer, 
  People, 
  EmojiEvents, 
  Settings,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: <Home />, label: 'Dashboard', path: '/' },
    { icon: <Explore />, label: 'Social Feed', path: '/social' },
    { icon: <CheckCircle />, label: 'Todo List', path: '/todos' },
    { icon: <Assignment />, label: 'Projects', path: '/projects' },
    { icon: <Timer />, label: 'Pomodoro', path: '/pomodoro' },
    { icon: <People />, label: 'Community', path: '/community' },
    { icon: <EmojiEvents />, label: 'Achievements', path: '/achievements' },
    { icon: <Settings />, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.div 
      initial={{ width: 250 }}
      animate={{ width: collapsed ? 80 : 250 }}
      className="h-screen sticky top-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 pt-6"
    >
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-900 rounded-full p-1 shadow-md dark:shadow-gray-800"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
      
      <div className="px-4 space-y-6">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <motion.div
              whileHover={{ x: 10, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
              className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light"
            >
              <div className="text-primary-light dark:text-primary-light">
                {item.icon}
              </div>
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
