// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    darkMode: false,
    primaryColor: 'indigo',
    fontSize: 'medium',
    reducedMotion: false,
    borderRadius: 'medium',
    customColors: {
      primary: {
        light: '#6366f1',
        DEFAULT: '#4f46e5',
        dark: '#4338ca',
      },
      secondary: {
        light: '#f43f5e',
        DEFAULT: '#e11d48',
        dark: '#be123c',
      }
    }
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
      if (JSON.parse(savedTheme).darkMode) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(prev => ({ ...prev, darkMode: true }));
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Save theme changes to localStorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(prev => {
      const newDarkMode = !prev.darkMode;
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...prev, darkMode: newDarkMode };
    });
  };

  const updateTheme = (updates) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const getThemeClass = (element) => {
    switch (element) {
      case 'button':
        return `rounded-${theme.borderRadius} text-${theme.fontSize} bg-${theme.primaryColor}-600 hover:bg-${theme.primaryColor}-700`;
      case 'card':
        return `rounded-${theme.borderRadius} shadow-lg bg-white dark:bg-gray-800`;
      case 'input':
        return `rounded-${theme.borderRadius} border-gray-300 focus:border-${theme.primaryColor}-500 focus:ring-${theme.primaryColor}-500`;
      default:
        return '';
    }
  };

  const value = {
    theme,
    toggleDarkMode,
    updateTheme,
    getThemeClass,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${theme.reducedMotion ? 'motion-reduce' : ''} text-${theme.fontSize}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
