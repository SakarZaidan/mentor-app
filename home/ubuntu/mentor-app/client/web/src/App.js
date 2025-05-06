import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SocialFeed from './pages/SocialFeed';
import TodoList from './pages/TodoList';
import Projects from './pages/Projects';
import Pomodoro from './pages/Pomodoro';
import Community from './pages/Community';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import './App.css';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}

// Separate the main content to use theme context
const AppContent = () => {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${theme.darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Router>
        <div className="flex flex-col h-screen">
          {/* Navigation */}
          <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Mentor</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link to="/" className="border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/social" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Social Feed
                    </Link>
                    <Link to="/todos" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Todo List
                    </Link>
                    <Link to="/projects" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Projects
                    </Link>
                    <Link to="/pomodoro" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Pomodoro
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                  >
                    {theme.darkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )  : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) }
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="bg-white dark:bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                          U
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="sm:hidden bg-white dark:bg-gray-800 shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Dashboard
              </Link>
              <Link to="/social" className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Social Feed
              </Link>
              <Link to="/todos" className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Todo List
              </Link>
              <Link to="/projects" className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Projects
              </Link>
              <Link to="/pomodoro" className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Pomodoro
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/social" element={<SocialFeed />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/community" element={<Community />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
