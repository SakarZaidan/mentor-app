import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the Pomodoro timer functionality
const PomodoroTimer = () => {
  // Timer states
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes in seconds
  
  // Timer settings
  const [settings, setSettings] = useState({
    workDuration: 25, // minutes
    shortBreakDuration: 5, // minutes
    longBreakDuration: 15, // minutes
    sessionsBeforeLongBreak: 4
  });
  
  // Session tracking
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  // Timer history
  const [history, setHistory] = useState([]);
  
  // Effect for timer countdown
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => {
          if (secondsLeft <= 1) {
            clearInterval(interval);
            handleTimerComplete();
            return 0;
          }
          return secondsLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, secondsLeft]);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    // Play sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Show notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${mode.charAt(0).toUpperCase() + mode.slice(1)} session completed!`);
    }
    
    // Update history
    const newHistoryItem = {
      id: Date.now(),
      mode,
      duration: getModeDuration(mode),
      completedAt: new Date().toISOString()
    };
    
    setHistory([newHistoryItem, ...history]);
    
    // Determine next mode
    if (mode === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  };
  
  // Get duration based on mode
  const getModeDuration = (currentMode) => {
    switch (currentMode) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
      default:
        return settings.workDuration;
    }
  };
  
  // Switch timer mode
  const switchMode = (newMode) => {
    setMode(newMode);
    setSecondsLeft(getModeDuration(newMode) * 60);
    setIsActive(true);
    setIsPaused(true);
  };
  
  // Start or resume timer
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  // Pause timer
  const pauseTimer = () => {
    setIsPaused(true);
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(true);
    setSecondsLeft(getModeDuration(mode) * 60);
  };
  
  // Skip to next session
  const skipSession = () => {
    if (mode === 'work') {
      if ((completedSessions + 1) % settings.sessionsBeforeLongBreak === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  };
  
  // Update settings
  const updateSettings = (e) => {
    e.preventDefault();
    
    // Reset timer with new settings
    setIsActive(false);
    setIsPaused(true);
    setSecondsLeft(settings.workDuration * 60);
    setShowSettings(false);
  };
  
  // Handle settings input change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseInt(value, 10)
    });
  };
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="pomodoro-container">
      <div className="pomodoro-header">
        <h2>Pomodoro Timer</h2>
        <p>Stay focused and productive with timed work sessions</p>
      </div>
      
      <div className="pomodoro-timer">
        <div className="timer-modes">
          <button 
            className={`mode-button ${mode === 'work' ? 'active' : ''}`}
            onClick={() => switchMode('work')}
          >
            Work
          </button>
          <button 
            className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchMode('shortBreak')}
          >
            Short Break
          </button>
          <button 
            className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchMode('longBreak')}
          >
            Long Break
          </button>
        </div>
        
        <div className="timer-display">
          <div className="time">{formatTime(secondsLeft)}</div>
          <div className="session-count">
            Session {completedSessions + 1} • {mode === 'work' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </div>
        </div>
        
        <div className="timer-controls">
          {isPaused ? (
            <button 
              className="start-button"
              onClick={startTimer}
            >
              {isActive ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button 
              className="pause-button"
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}
          
          <button 
            className="reset-button"
            onClick={resetTimer}
          >
            Reset
          </button>
          
          <button 
            className="skip-button"
            onClick={skipSession}
          >
            Skip
          </button>
        </div>
      </div>
      
      <div className="pomodoro-settings">
        <button 
          className="settings-toggle"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
        
        {showSettings && (
          <form className="settings-form" onSubmit={updateSettings}>
            <div className="settings-group">
              <label htmlFor="workDuration">Work Duration (minutes)</label>
              <input
                type="number"
                id="workDuration"
                name="workDuration"
                min="1"
                max="60"
                value={settings.workDuration}
                onChange={handleSettingsChange}
              />
            </div>
            
            <div className="settings-group">
              <label htmlFor="shortBreakDuration">Short Break Duration (minutes)</label>
              <input
                type="number"
                id="shortBreakDuration"
                name="shortBreakDuration"
                min="1"
                max="30"
                value={settings.shortBreakDuration}
                onChange={handleSettingsChange}
              />
            </div>
            
            <div className="settings-group">
              <label htmlFor="longBreakDuration">Long Break Duration (minutes)</label>
              <input
                type="number"
                id="longBreakDuration"
                name="longBreakDuration"
                min="1"
                max="60"
                value={settings.longBreakDuration}
                onChange={handleSettingsChange}
              />
            </div>
            
            <div className="settings-group">
              <label htmlFor="sessionsBeforeLongBreak">Sessions Before Long Break</label>
              <input
                type="number"
                id="sessionsBeforeLongBreak"
                name="sessionsBeforeLongBreak"
                min="1"
                max="10"
                value={settings.sessionsBeforeLongBreak}
                onChange={handleSettingsChange}
              />
            </div>
            
            <button type="submit" className="save-settings-button">
              Save Settings
            </button>
          </form>
        )}
      </div>
      
      {history.length > 0 && (
        <div className="pomodoro-history">
          <h3>Session History</h3>
          <div className="history-list">
            {history.slice(0, 10).map(session => (
              <div key={session.id} className="history-item">
                <span className={`history-mode mode-${session.mode}`}>
                  {session.mode === 'work' ? 'Work' : 
                   session.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                </span>
                <span className="history-duration">
                  {session.duration} minutes
                </span>
                <span className="history-time">
                  {new Date(session.completedAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="pomodoro-info">
        <h3>About the Pomodoro Technique</h3>
        <p>
          The Pomodoro Technique is a time management method that uses a timer to break work
          into intervals, traditionally 25 minutes in length, separated by short breaks.
        </p>
        <ul>
          <li>Work for 25 minutes (one "Pomodoro")</li>
          <li>Take a short 5-minute break</li>
          <li>After 4 Pomodoros, take a longer 15-30 minute break</li>
          <li>Repeat the cycle</li>
        </ul>
        <p>
          This technique helps improve focus and productivity by working with your brain's
          natural attention span and need for breaks.
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
