const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const { 
  register, 
  login, 
  getMe, 
  updateDetails, 
  updatePassword,
  oauthAuthentication 
} = require('../controllers/auth');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  getMe
);

/**
 * @route   PUT /api/auth/updatedetails
 * @desc    Update user details
 * @access  Private
 */
router.put(
  '/updatedetails',
  passport.authenticate('jwt', { session: false }),
  updateDetails
);

/**
 * @route   PUT /api/auth/updatepassword
 * @desc    Update user password
 * @access  Private
 */
router.put(
  '/updatepassword',
  passport.authenticate('jwt', { session: false }),
  updatePassword
);

/**
 * @route   POST /api/auth/oauth/:provider
 * @desc    Authenticate with OAuth provider
 * @access  Public
 */
router.post('/oauth/:provider', oauthAuthentication);

module.exports = router;
