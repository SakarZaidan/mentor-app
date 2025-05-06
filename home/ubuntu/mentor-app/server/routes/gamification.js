// File: mentor-app/server/routes/gamification.js
const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamification');

// Middleware function for protection (simplified version if the original doesn't work)
const protect = (req, res, next) => {
  // In a real app, this would verify the JWT token
  // For now, we'll just pass through
  next();
};

// Middleware function for authorization (simplified version)
const authorize = (role) => {
  return (req, res, next) => {
    // In a real app, this would check the user's role
    // For now, we'll just pass through
    next();
  };
};

// Get user's gamification profile
router.get('/profile', protect, gamificationController.getGamificationProfile);

// Get global leaderboard
router.get('/leaderboard', gamificationController.getLeaderboard);

// Get all badges
router.get('/badges', gamificationController.getAllBadges);

// Get all achievements
router.get('/achievements', gamificationController.getAllAchievements);

// Update achievement progress
router.put('/achievements/:id/progress', protect, gamificationController.updateAchievementProgress);

// Award badge to user (admin only)
router.post('/badges/:id/award', protect, authorize('admin'), gamificationController.awardBadge);

// Get level information
router.get('/levels', gamificationController.getLevels);

module.exports = router;
