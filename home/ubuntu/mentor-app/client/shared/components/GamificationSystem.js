import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the gamification features
const GamificationSystem = () => {
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(100);
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Fetch user gamification data on component mount
  useEffect(() => {
    const fetchGamificationData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user level data
        setUserLevel(3);
        setUserXp(275);
        setNextLevelXp(400);
        
        // Mock badges
        const mockBadges = [
          {
            id: '1',
            name: 'JavaScript Enthusiast',
            description: 'Completed 5 JavaScript-related tasks',
            icon: '🔰',
            dateEarned: '2025-02-15T10:30:00Z',
            category: 'skill',
            rarity: 'common'
          },
          {
            id: '2',
            name: 'React Apprentice',
            description: 'Built your first React component',
            icon: '⚛️',
            dateEarned: '2025-02-20T14:45:00Z',
            category: 'skill',
            rarity: 'common'
          },
          {
            id: '3',
            name: 'Consistent Learner',
            description: 'Logged in for 7 consecutive days',
            icon: '🔄',
            dateEarned: '2025-03-01T09:15:00Z',
            category: 'engagement',
            rarity: 'uncommon'
          },
          {
            id: '4',
            name: 'Helpful Mentor',
            description: 'Received 5 positive reviews from mentees',
            icon: '🌟',
            dateEarned: '2025-03-10T16:20:00Z',
            category: 'social',
            rarity: 'rare'
          }
        ];
        
        // Mock achievements
        const mockAchievements = [
          {
            id: '1',
            name: 'First Steps',
            description: 'Complete your first task',
            progress: 100,
            maxProgress: 100,
            completed: true,
            dateCompleted: '2025-02-10T11:30:00Z',
            xpReward: 50,
            category: 'beginner'
          },
          {
            id: '2',
            name: 'Task Master',
            description: 'Complete 10 tasks',
            progress: 7,
            maxProgress: 10,
            completed: false,
            dateCompleted: null,
            xpReward: 100,
            category: 'productivity'
          },
          {
            id: '3',
            name: 'Social Butterfly',
            description: 'Connect with 5 other users',
            progress: 3,
            maxProgress: 5,
            completed: false,
            dateCompleted: null,
            xpReward: 75,
            category: 'social'
          },
          {
            id: '4',
            name: 'Focus Champion',
            description: 'Complete 5 Pomodoro sessions',
            progress: 5,
            maxProgress: 5,
            completed: true,
            dateCompleted: '2025-03-05T15:45:00Z',
            xpReward: 75,
            category: 'productivity'
          },
          {
            id: '5',
            name: 'Knowledge Seeker',
            description: 'Read 10 articles from your feed',
            progress: 8,
            maxProgress: 10,
            completed: false,
            dateCompleted: null,
            xpReward: 100,
            category: 'learning'
          }
        ];
        
        // Mock leaderboard
        const mockLeaderboard = [
          {
            id: '1',
            name: 'Emily Chen',
            username: 'emilyc',
            profilePicture: 'https://via.placeholder.com/40',
            level: 8,
            xp: 2450,
            badges: 12,
            achievements: 15,
            rank: 1
          },
          {
            id: '2',
            name: 'David Wilson',
            username: 'davidw',
            profilePicture: 'https://via.placeholder.com/40',
            level: 7,
            xp: 2100,
            badges: 10,
            achievements: 14,
            rank: 2
          },
          {
            id: '3',
            name: 'Sarah Smith',
            username: 'sarahsmith',
            profilePicture: 'https://via.placeholder.com/40',
            level: 6,
            xp: 1850,
            badges: 9,
            achievements: 12,
            rank: 3
          },
          {
            id: 'current-user-id',
            name: 'John Doe',
            username: 'johndoe',
            profilePicture: 'https://via.placeholder.com/40',
            level: 3,
            xp: 275,
            badges: 4,
            achievements: 2,
            rank: 15
          },
          {
            id: '4',
            name: 'Mike Johnson',
            username: 'mikej',
            profilePicture: 'https://via.placeholder.com/40',
            level: 2,
            xp: 180,
            badges: 3,
            achievements: 1,
            rank: 24
          }
        ];
        
        setBadges(mockBadges);
        setAchievements(mockAchievements);
        setLeaderboard(mockLeaderboard);
      } catch (err) {
        setError('Failed to load gamification data. Please try again.');
        console.error('Fetch gamification data error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGamificationData();
  }, []);
  
  // Calculate XP progress percentage
  const calculateXpProgress = () => {
    const prevLevelXp = nextLevelXp - (nextLevelXp / 2); // Simplified calculation
    const levelProgress = userXp - prevLevelXp;
    const levelTotalXp = nextLevelXp - prevLevelXp;
    return Math.floor((levelProgress / levelTotalXp) * 100);
  };
  
  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  // Render loading state
  if (loading) {
    return <div className="gamification-loading">Loading gamification data...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="gamification-error">Error: {error}</div>;
  }
  
  return (
    <div className="gamification-container">
      <div className="gamification-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          My Progress
        </button>
        <button
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
        <button
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      
      <div className="gamification-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="level-card">
              <div className="level-header">
                <h3>Level {userLevel}</h3>
                <div className="xp-counter">{userXp} / {nextLevelXp} XP</div>
              </div>
              
              <div className="level-progress-bar">
                <div 
                  className="level-progress-fill"
                  style={{ width: `${calculateXpProgress()}%` }}
                ></div>
              </div>
              
              <div className="level-info">
                <p>{nextLevelXp - userXp} XP needed for Level {userLevel + 1}</p>
              </div>
            </div>
            
            <div className="stats-section">
              <h3>Your Stats</h3>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{badges.length}</div>
                  <div className="stat-label">Badges Earned</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-value">
                    {achievements.filter(a => a.completed).length}
                  </div>
                  <div className="stat-label">Achievements Completed</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-value">
                    {leaderboard.find(user => user.id === 'current-user-id')?.rank || 'N/A'}
                  </div>
                  <div className="stat-label">Leaderboard Rank</div>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">🏆</div>
                  <div className="activity-content">
                    <div className="activity-title">Achievement Completed</div>
                    <div className="activity-description">Focus Champion</div>
                    <div className="activity-date">{formatDate('2025-03-05T15:45:00Z')}</div>
                  </div>
                  <div className="activity-reward">+75 XP</div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">🔰</div>
                  <div className="activity-content">
                    <div className="activity-title">Badge Earned</div>
                    <div className="activity-description">Helpful Mentor</div>
                    <div className="activity-date">{formatDate('2025-03-10T16:20:00Z')}</div>
                  </div>
                  <div className="activity-reward">+50 XP</div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">📈</div>
                  <div className="activity-content">
                    <div className="activity-title">Level Up</div>
                    <div className="activity-description">Reached Level 3</div>
                    <div className="activity-date">{formatDate('2025-03-12T10:15:00Z')}</div>
                  </div>
                  <div className="activity-reward"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="badges-tab">
            <h3>Your Badges</h3>
            
            <div className="badges-grid">
              {badges.map(badge => (
                <div key={badge.id} className={`badge-card rarity-${badge.rarity}`}>
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-content">
                    <h4 className="badge-name">{badge.name}</h4>
                    <p className="badge-description">{badge.description}</p>
                    <div className="badge-meta">
                      <span className="badge-category">{badge.category}</span>
                      <span className="badge-date">Earned on {formatDate(badge.dateEarned)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="badge-card locked">
                <div className="badge-icon">?</div>
                <div className="badge-content">
                  <h4 className="badge-name">???</h4>
                  <p className="badge-description">Keep learning to unlock more badges!</p>
                </div>
              </div>
            </div>
            
            <div className="badges-categories">
              <h4>Badge Categories</h4>
              <div className="category-list">
                <div className="category-item">
                  <span className="category-name">Skill</span>
                  <span className="category-count">{badges.filter(b => b.category === 'skill').length}</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Engagement</span>
                  <span className="category-count">{badges.filter(b => b.category === 'engagement').length}</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Social</span>
                  <span className="category-count">{badges.filter(b => b.category === 'social').length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h3>Achievements</h3>
            
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.completed ? 'completed' : 'in-progress'}`}
                >
                  <div className="achievement-header">
                    <h4 className="achievement-name">{achievement.name}</h4>
                    <div className="achievement-reward">+{achievement.xpReward} XP</div>
                  </div>
                  
                  <p className="achievement-description">{achievement.description}</p>
                  
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {achievement.progress} / {achievement.maxProgress}
                    </div>
                  </div>
                  
                  <div className="achievement-meta">
                    <span className="achievement-category">{achievement.category}</span>
                    {achievement.completed && (
                      <span className="achievement-date">
                        Completed on {formatDate(achievement.dateCompleted)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'leaderboard' && (
          <div className="leaderboard-tab">
            <h3>Global Leaderboard</h3>
            
            <div className="leaderboard-filters">
              <select className="filter-select">
                <option value="global">Global</option>
                <option value="friends">Friends</option>
                <option value="skill-javascript">JavaScript Skill</option>
                <option value="skill-react">React Skill</option>
              </select>
              
              <select className="time-select">
                <option value="all-time">All Time</option>
                <option value="this-month">This Month</option>
                <option value="this-week">This Week</option>
              <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>