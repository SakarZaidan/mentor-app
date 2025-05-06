const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Badge schema
const BadgeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['skill', 'engagement', 'social', 'achievement'],
    required: true
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  requirements: {
    type: Object,
    required: true
  },
  xpReward: {
    type: Number,
    default: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Achievement schema
const AchievementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['beginner', 'productivity', 'social', 'learning', 'skill'],
    required: true
  },
  maxProgress: {
    type: Number,
    required: true
  },
  xpReward: {
    type: Number,
    required: true
  },
  badgeReward: {
    type: Schema.Types.ObjectId,
    ref: 'Badge'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Achievement schema (tracks user progress on achievements)
const UserAchievementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievement: {
    type: Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  dateCompleted: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Badge schema (tracks badges earned by users)
const UserBadgeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge: {
    type: Schema.Types.ObjectId,
    ref: 'Badge',
    required: true
  },
  dateEarned: {
    type: Date,
    default: Date.now
  }
});

// Level schema (defines XP requirements for each level)
const LevelSchema = new Schema({
  level: {
    type: Number,
    required: true,
    unique: true
  },
  xpRequired: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  rewards: {
    type: Object
  }
});

// Create models
const Badge = mongoose.model('Badge', BadgeSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);
const UserAchievement = mongoose.model('UserAchievement', UserAchievementSchema);
const UserBadge = mongoose.model('UserBadge', UserBadgeSchema);
const Level = mongoose.model('Level', LevelSchema);

module.exports = {
  Badge,
  Achievement,
  UserAchievement,
  UserBadge,
  Level
};
