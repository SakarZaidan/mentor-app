const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const { 
  getFeed, getPostsByPlatform, getPostsByType, likePost, commentOnPost, 
  savePost, linkSocialAccount, unlinkSocialAccount 
} = require('../controllers/social');

/**
 * @route   GET /api/social/feed
 * @desc    Get unified social media feed
 * @access  Private
 */
router.get(
  '/feed',
  passport.authenticate('jwt', { session: false }),
  getFeed
);

/**
 * @route   GET /api/social/platform/:platform
 * @desc    Get posts from specific platform
 * @access  Private
 */
router.get(
  '/platform/:platform',
  passport.authenticate('jwt', { session: false }),
  getPostsByPlatform
);

/**
 * @route   GET /api/social/type/:type
 * @desc    Get posts by type (posts, reels, threads)
 * @access  Private
 */
router.get(
  '/type/:type',
  passport.authenticate('jwt', { session: false }),
  getPostsByType
);

/**
 * @route   POST /api/social/like/:id
 * @desc    Like a post
 * @access  Private
 */
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  likePost
);

/**
 * @route   POST /api/social/comment/:id
 * @desc    Comment on a post
 * @access  Private
 */
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  commentOnPost
);

/**
 * @route   POST /api/social/save/:id
 * @desc    Save a post
 * @access  Private
 */
router.post(
  '/save/:id',
  passport.authenticate('jwt', { session: false }),
  savePost
);

/**
 * @route   POST /api/social/link/:platform
 * @desc    Link a social media account
 * @access  Private
 */
router.post(
  '/link/:platform',
  passport.authenticate('jwt', { session: false }),
  linkSocialAccount
);

/**
 * @route   DELETE /api/social/unlink/:platform
 * @desc    Unlink a social media account
 * @access  Private
 */
router.delete(
  '/unlink/:platform',
  passport.authenticate('jwt', { session: false }),
  unlinkSocialAccount
);

module.exports = router;
