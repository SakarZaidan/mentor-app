const { Badge, Achievement, UserAchievement, UserBadge, Level } = require('../models/Gamification');
const User = require('../models/User');

/**
 * @desc    Get user's gamification profile (level, XP, badges, achievements)
 * @route   GET /api/gamification/profile
 * @access  Private
 */
exports.getGamificationProfile = async (req, res) => {
  try {
    // Get user's badges
    const userBadges = await UserBadge.find({ user: req.user.id })
      .populate('badge')
      .sort({ dateEarned: -1 });
    
    // Get user's achievements
    const userAchievements = await UserAchievement.find({ user: req.user.id })
      .populate('achievement')
      .sort({ dateCompleted: -1 });
    
    // Get user's level and XP from user model
    const user = await User.findById(req.user.id).select('level xp');
    
    // Get next level XP requirement
    const nextLevel = await Level.findOne({ level: user.level + 1 });
    
    // Get user's rank on leaderboard
    // This is a simplified version - in a real app, this would be more optimized
    const allUsers = await User.find().sort({ xp: -1 });
    const userRank = allUsers.findIndex(u => u._id.toString() === req.user.id) + 1;
    
    res.status(200).json({
      success: true,
      data: {
        level: user.level,
        xp: user.xp,
        nextLevelXp: nextLevel ? nextLevel.xpRequired : null,
        badges: userBadges.map(ub => ({
          id: ub.badge._id,
          name: ub.badge.name,
          description: ub.badge.description,
          icon: ub.badge.icon,
          category: ub.badge.category,
          rarity: ub.badge.rarity,
          dateEarned: ub.dateEarned
        })),
        achievements: userAchievements.map(ua => ({
          id: ua.achievement._id,
          name: ua.achievement.name,
          description: ua.achievement.description,
          category: ua.achievement.category,
          progress: ua.progress,
          maxProgress: ua.achievement.maxProgress,
          completed: ua.completed,
          dateCompleted: ua.dateCompleted,
          xpReward: ua.achievement.xpReward
        })),
        rank: userRank
      }
    });
  } catch (err) {
    console.error('Get gamification profile error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get global leaderboard
 * @route   GET /api/gamification/leaderboard
 * @access  Public
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const { limit = 10, page = 1, timeframe = 'all-time' } = req.query;
    
    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query based on timeframe
    let query = {};
    if (timeframe === 'this-week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      query = { updatedAt: { $gte: oneWeekAgo } };
    } else if (timeframe === 'this-month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      query = { updatedAt: { $gte: oneMonthAgo } };
    }
    
    // Get users for leaderboard
    const users = await User.find(query)
      .select('name username profilePicture level xp')
      .sort({ xp: -1, updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    // Get badge and achievement counts for each user
    const leaderboardData = await Promise.all(users.map(async (user, index) => {
      const badgeCount = await UserBadge.countDocuments({ user: user._id });
      const achievementCount = await UserAchievement.countDocuments({ 
        user: user._id,
        completed: true
      });
      
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
        level: user.level,
        xp: user.xp,
        badges: badgeCount,
        achievements: achievementCount,
        rank: skip + index + 1
      };
    }));
    
    res.status(200).json({
      success: true,
      data: leaderboardData,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Get leaderboard error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get all badges
 * @route   GET /api/gamification/badges
 * @access  Public
 */
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().sort({ rarity: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges
    });
  } catch (err) {
    console.error('Get all badges error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get all achievements
 * @route   GET /api/gamification/achievements
 * @access  Public
 */
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ category: 1, xpReward: 1 });
    
    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (err) {
    console.error('Get all achievements error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Update achievement progress
 * @route   PUT /api/gamification/achievements/:id/progress
 * @access  Private
 */
exports.updateAchievementProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    
    if (progress === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Progress value is required'
      });
    }
    
    // Find the achievement
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        error: 'Achievement not found'
      });
    }
    
    // Find or create user achievement
    let userAchievement = await UserAchievement.findOne({
      user: req.user.id,
      achievement: req.params.id
    });
    
    if (!userAchievement) {
      userAchievement = new UserAchievement({
        user: req.user.id,
        achievement: req.params.id,
        progress: 0
      });
    }
    
    // Update progress
    userAchievement.progress = Math.min(progress, achievement.maxProgress);
    
    // Check if achievement is completed
    const wasCompleted = userAchievement.completed;
    const isNowCompleted = userAchievement.progress >= achievement.maxProgress;
    
    if (isNowCompleted && !wasCompleted) {
      userAchievement.completed = true;
      userAchievement.dateCompleted = Date.now();
      
      // Award XP to user
      const user = await User.findById(req.user.id);
      user.xp += achievement.xpReward;
      
      // Check if user leveled up
      const currentLevel = await Level.findOne({ level: user.level });
      const nextLevel = await Level.findOne({ level: user.level + 1 });
      
      if (nextLevel && user.xp >= nextLevel.xpRequired) {
        user.level += 1;
        
        // Check for any level-up rewards here
      }
      
      await user.save();
      
      // Check if achievement awards a badge
      if (achievement.badgeReward) {
        // Check if user already has this badge
        const existingBadge = await UserBadge.findOne({
          user: req.user.id,
          badge: achievement.badgeReward
        });
        
        if (!existingBadge) {
          // Award badge to user
          const userBadge = new UserBadge({
            user: req.user.id,
            badge: achievement.badgeReward
          });
          
          await userBadge.save();
        }
      }
    }
    
    await userAchievement.save();
    
    res.status(200).json({
      success: true,
      data: {
        id: userAchievement.achievement,
        progress: userAchievement.progress,
        completed: userAchievement.completed,
        dateCompleted: userAchievement.dateCompleted
      },
      levelUp: isNowCompleted && !wasCompleted && user.level > currentLevel.level,
      xpAwarded: isNowCompleted && !wasCompleted ? achievement.xpReward : 0
    });
  } catch (err) {
    console.error('Update achievement progress error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Award badge to user
 * @route   POST /api/gamification/badges/:id/award
 * @access  Private (Admin only)
 */
exports.awardBadge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to award badges'
      });
    }
    
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }
    
    // Find the badge
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({
        success: false,
        error: 'Badge not found'
      });
    }
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user already has this badge
    const existingBadge = await UserBadge.findOne({
      user: userId,
      badge: req.params.id
    });
    
    if (existingBadge) {
      return res.status(400).json({
        success: false,
        error: 'User already has this badge'
      });
    }
    
    // Award badge to user
    const userBadge = new UserBadge({
      user: userId,
      badge: req.params.id
    });
    
    await userBadge.save();
    
    // Award XP to user
    if (badge.xpReward > 0) {
      user.xp += badge.xpReward;
      
      // Check if user leveled up
      const currentLevel = await Level.findOne({ level: user.level });
      const nextLevel = await Level.findOne({ level: user.level + 1 });
      
      if (nextLevel && user.xp >= nextLevel.xpRequired) {
        user.level += 1;
      }
      
      await user.save();
    }
    
    res.status(201).json({
      success: true,
      data: {
        id: userBadge.badge,
        dateEarned: userBadge.dateEarned
      },
      xpAwarded: badge.xpReward
    });
  } catch (err) {
    console.error('Award badge error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get level information
 * @route   GET /api/gamification/levels
 * @access  Public
 */
exports.getLevels = async (req, res) => {
  try {
    const levels = await Level.find().sort({ level: 1 });
    
    res.status(200).json({
      success: true,
      count: levels.length,
      data: levels
    });
  } catch (err) {
    console.error('Get levels error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
const mockBadges = [
  { id: 1, name: "First Steps", description: "Complete your first task", icon: "🥉" },
  { id: 2, name: "Rising Star", description: "Reach level 5", icon: "🥈" },
  { id: 3, name: "Master", description: "Complete 100 tasks", icon: "🥇" }
];

const mockAchievements = [
  { id: 1, name: "Early Bird", description: "Log in 5 days in a row", progress: 0, maxProgress: 5 },
  { id: 2, name: "Task Master", description: "Complete 50 tasks", progress: 0, maxProgress: 50 },
  { id: 3, name: "Social Butterfly", description: "Connect 3 social accounts", progress: 0, maxProgress: 3 }
];

const mockLevels = [
  { level: 1, xpRequired: 0, title: "Beginner" },
  { level: 2, xpRequired: 100, title: "Novice" },
  { level: 3, xpRequired: 300, title: "Intermediate" },
  { level: 4, xpRequired: 600, title: "Advanced" },
  { level: 5, xpRequired: 1000, title: "Expert" }
];

// Controller methods
exports.getGamificationProfile = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      level: 2,
      xp: 150,
      nextLevelXp: 300,
      badges: [mockBadges[0]],
      achievements: mockAchievements.map(a => ({...a, progress: Math.floor(Math.random() * a.maxProgress)}))
    }
  });
};

exports.getLeaderboard = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { username: "user1", level: 5, xp: 1200 },
      { username: "user2", level: 4, xp: 800 },
      { username: "user3", level: 3, xp: 450 }
    ]
  });
};

exports.getAllBadges = (req, res) => {
  res.status(200).json({
    success: true,
    data: mockBadges
  });
};

exports.getAllAchievements = (req, res) => {
  res.status(200).json({
    success: true,
    data: mockAchievements
  });
};

exports.updateAchievementProgress = (req, res) => {
  const { id } = req.params;
  const achievement = mockAchievements.find(a => a.id === parseInt(id));
  
  if (!achievement) {
    return res.status(404).json({
      success: false,
      error: "Achievement not found"
    });
  }
  
  res.status(200).json({
    success: true,
    data: {
      ...achievement,
      progress: Math.min(achievement.progress + 1, achievement.maxProgress)
    }
  });
};

exports.awardBadge = (req, res) => {
  const { id } = req.params;
  const badge = mockBadges.find(b => b.id === parseInt(id));
  
  if (!badge) {
    return res.status(404).json({
      success: false,
      error: "Badge not found"
    });
  }
  
  res.status(200).json({
    success: true,
    message: `Badge "${badge.name}" awarded successfully`,
    data: badge
  });
};

exports.getLevels = (req, res) => {
  res.status(200).json({
    success: true,
    data: mockLevels
  });
};