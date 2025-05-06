const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const {
  getCurrentProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
  addEducation,
  addExperience,
  addAchievement,
  followUser,
  unfollowUser
} = require('../controllers/profile');

/**
 * @route   GET /api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  getCurrentProfile
);

/**
 * @route   POST /api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createOrUpdateProfile
);

/**
 * @route   GET /api/profile
 * @desc    Get all profiles
 * @access  Public
 */
router.get('/', getAllProfiles);

/**
 * @route   GET /api/profile/user/:userId
 * @desc    Get profile by user ID
 * @access  Public
 */
router.get('/user/:userId', getProfileByUserId);

/**
 * @route   PUT /api/profile/education
 * @desc    Add education to profile
 * @access  Private
 */
router.put(
  '/education',
  passport.authenticate('jwt', { session: false }),
  addEducation
);

/**
 * @route   PUT /api/profile/experience
 * @desc    Add experience to profile
 * @access  Private
 */
router.put(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  addExperience
);

/**
 * @route   PUT /api/profile/achievement
 * @desc    Add achievement to profile
 * @access  Private
 */
router.put(
  '/achievement',
  passport.authenticate('jwt', { session: false }),
  addAchievement
);

/**
 * @route   PUT /api/profile/follow/:userId
 * @desc    Follow a user
 * @access  Private
 */
router.put(
  '/follow/:userId',
  passport.authenticate('jwt', { session: false }),
  followUser
);

/**
 * @route   PUT /api/profile/unfollow/:userId
 * @desc    Unfollow a user
 * @access  Private
 */
router.put(
  '/unfollow/:userId',
  passport.authenticate('jwt', { session: false }),
  unfollowUser
);

module.exports = router;
