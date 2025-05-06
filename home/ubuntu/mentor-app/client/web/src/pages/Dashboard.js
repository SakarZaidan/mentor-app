import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    tasksCompleted: 12,
    currentStreak: 5,
    skillsInProgress: 3,
    level: 7
  });
  
  const [recommendations, setRecommendations] = useState([
    { id: 1, title: 'Complete React Hooks Tutorial', category: 'Learning', priority: 'High' },
    { id: 2, title: 'Review Project Feedback', category: 'Project', priority: 'Medium' },
    { id: 3, title: 'Join Community Discussion', category: 'Community', priority: 'Low' }
  ]);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-300">Here's your learning progress</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tasks Completed</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.tasksCompleted}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Current Streak</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.currentStreak} days</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Skills In Progress</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.skillsInProgress}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Current Level</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.level}</p>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today's Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
              </div>
              <div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  item.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/todos" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow p-6 transition duration-300">
          <h3 className="text-xl font-bold mb-2">Todo List</h3>
          <p>Manage your tasks and get AI suggestions</p>
        </Link>
        
        <Link to="/social" className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow p-6 transition duration-300">
          <h3 className="text-xl font-bold mb-2">Social Feed</h3>
          <p>Check updates from your connected platforms</p>
        </Link>
        
        <Link to="/community" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow p-6 transition duration-300">
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p>Connect with mentors and peers</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
