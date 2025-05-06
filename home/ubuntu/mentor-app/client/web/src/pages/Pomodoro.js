import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [sessions, setSessions] = useState(0);

  const timerConfigs = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const [settings, setSettings] = useState({
    notifications: true,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    darkMode: false
  });

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    if (timerType === 'pomodoro') {
      setSessions(sessions + 1);
      if (settings.notifications) {
        new Notification('Pomodoro Complete!', {
          body: 'Time for a break!',
        });
      }
    }
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(timerConfigs[timerType]);
    setIsRunning(false);
  };

  const switchTimerType = (type) => {
    setTimerType(type);
    setTimeLeft(timerConfigs[type]);
    setIsRunning(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pomodoro Timer</h1>
        <p className="text-gray-600 dark:text-gray-300">Stay focused with the Pomodoro technique.</p>
      </div>

      {/* Timer Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        {/* Timer Type Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => switchTimerType('pomodoro')}
            className={`px-4 py-2 rounded-full ${
              timerType === 'pomodoro'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => switchTimerType('shortBreak')}
            className={`px-4 py-2 rounded-full ${
              timerType === 'shortBreak'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => switchTimerType('longBreak')}
            className={`px-4 py-2 rounded-full ${
              timerType === 'longBreak'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-900 dark:text-white mb-8">
            {formatTime(timeLeft)}
          </div>
          <div className="space-x-4">
            <button
              onClick={handleStartStop}
              className={`px-8 py-3 rounded-lg text-white font-medium ${
                isRunning
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Session Counter */}
        <div className="text-gray-600 dark:text-gray-400">
          Sessions completed today: {sessions}
        </div>
      </div>

      {/* Stats and Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today's Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Focus Time</span>
              <span className="text-gray-900 dark:text-white font-medium">{sessions * 25} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Sessions</span>
              <span className="text-gray-900 dark:text-white font-medium">{sessions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Breaks</span>
              <span className="text-gray-900 dark:text-white font-medium">{sessions}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Timer Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Notifications</span>
              <button
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  settings.notifications ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Auto-start Breaks</span>
              <button
                onClick={() => setSettings({ ...settings, autoStartBreaks: !settings.autoStartBreaks })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  settings.autoStartBreaks ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    settings.autoStartBreaks ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Auto-start Pomodoros</span>
              <button
                onClick={() => setSettings({ ...settings, autoStartPomodoros: !settings.autoStartPomodoros })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  settings.autoStartPomodoros ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    settings.autoStartPomodoros ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
