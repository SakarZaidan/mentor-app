import React, { useState } from 'react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([
    { 
      id: 1, 
      title: 'First Steps', 
      description: 'Complete your first task', 
      icon: '🏆', 
      completed: true, 
      date: '2023-05-15',
      xp: 50
    },
    { 
      id: 2, 
      title: 'Streak Master', 
      description: 'Maintain a 7-day streak', 
      icon: '🔥', 
      completed: true, 
      date: '2023-06-02',
      xp: 100
    },
    { 
      id: 3, 
      title: 'Coding Ninja', 
      description: 'Complete 5 coding challenges', 
      icon: '👨‍💻', 
      completed: false, 
      progress: 3,
      total: 5,
      xp: 150
    },
    { 
      id: 4, 
      title: 'Social Butterfly', 
      description: 'Connect with 10 community members', 
      icon: '🦋', 
      completed: false, 
      progress: 4,
      total: 10,
      xp: 200
    },
    { 
      id: 5, 
      title: 'Knowledge Seeker', 
      description: 'Read 20 articles', 
      icon: '📚', 
      completed: false, 
      progress: 12,
      total: 20,
      xp: 250
    }
  ]);

  const [stats, setStats] = useState({
    totalAchievements: 12,
    completedAchievements: 5,
    currentLevel: 7,
    xpPoints: 750,
    nextLevelAt: 1000
  });

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Achievements</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your progress and unlock badges as you learn.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Level {stats.currentLevel}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {stats.completedAchievements} of {stats.totalAchievements} achievements unlocked
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-300">{stats.xpPoints} XP</span>
              <span className="text-gray-600 dark:text-gray-300">{stats.nextLevelAt} XP</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${(stats.xpPoints / stats.nextLevelAt) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievement Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow p-6 transition duration-300 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Learning</h3>
          <p className="mb-4">Achievements for completing courses and tutorials</p>
          <div className="flex justify-between">
            <span>4/10 Unlocked</span>
            <span>40%</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow p-6 transition duration-300 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p className="mb-4">Achievements for engaging with the community</p>
          <div className="flex justify-between">
            <span>2/8 Unlocked</span>
            <span>25%</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow p-6 transition duration-300 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Projects</h3>
          <p className="mb-4">Achievements for completing projects</p>
          <div className="flex justify-between">
            <span>3/6 Unlocked</span>
            <span>50%</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Achievement List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Achievements</h2>
        
        <div className="space-y-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border ${
                achievement.completed 
                  ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20' 
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/30'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl bg-white dark:bg-gray-800 rounded-full shadow">
                  {achievement.icon}
                </div>
                
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {achievement.title}
                      {achievement.completed && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </h3>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {achievement.xp} XP
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {achievement.description}
                  </p>
                  
                  {achievement.completed ? (
                    <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                      Unlocked on {achievement.date}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-300">
                          Progress: {achievement.progress}/{achievement.total}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {Math.round((achievement.progress / achievement.total) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white">Project Master</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Complete 10 projects</p>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-2">Reward: 300 XP</p>
          </div>
          
          <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white">Feedback Champion</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Give feedback on 20 community posts</p>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-2">Reward: 250 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
