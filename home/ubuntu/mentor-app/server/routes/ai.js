const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const { 
  optimizeTodos, 
  getLearningPathSuggestions, 
  getProjectSuggestions,
  analyzeLearningProgress
} = require('../controllers/ai');

/**
 * @route   POST /api/ai/optimize-todos
 * @desc    Get AI-optimized to-do suggestions
 * @access  Private
 */
router.post(
  '/optimize-todos',
  passport.authenticate('jwt', { session: false }),
  optimizeTodos
);

/**
 * @route   GET /api/ai/learning-suggestions
 * @desc    Get personalized learning suggestions
 * @access  Private
 */
router.get(
  '/learning-suggestions',
  passport.authenticate('jwt', { session: false }),
  getLearningPathSuggestions
);

/**
 * @route   GET /api/ai/project-suggestions
 * @desc    Get personalized project suggestions
 * @access  Private
 */
router.get(
  '/project-suggestions',
  passport.authenticate('jwt', { session: false }),
  getProjectSuggestions
);

/**
 * @route   GET /api/ai/learning-analysis
 * @desc    Analyze user's learning progress
 * @access  Private
 */
router.get(
  '/learning-analysis',
  passport.authenticate('jwt', { session: false }),
  analyzeLearningProgress
);

module.exports = router;
