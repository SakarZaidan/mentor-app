const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const {
  getUserChatRooms,
  getChatRoom,
  createGroupChatRoom,
  createVoiceRoom,
  joinVoiceRoom,
  leaveVoiceRoom,
  addParticipants
} = require('../controllers/chatrooms');

/**
 * @route   GET /api/chatrooms
 * @desc    Get all chat rooms for a user
 * @access  Private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getUserChatRooms
);

/**
 * @route   GET /api/chatrooms/:id
 * @desc    Get a single chat room
 * @access  Private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  getChatRoom
);

/**
 * @route   POST /api/chatrooms/group
 * @desc    Create a new group chat room
 * @access  Private
 */
router.post(
  '/group',
  passport.authenticate('jwt', { session: false }),
  createGroupChatRoom
);

/**
 * @route   POST /api/chatrooms/voice
 * @desc    Create a new voice room
 * @access  Private
 */
router.post(
  '/voice',
  passport.authenticate('jwt', { session: false }),
  createVoiceRoom
);

/**
 * @route   PUT /api/chatrooms/voice/:id/join
 * @desc    Join a voice room
 * @access  Private
 */
router.put(
  '/voice/:id/join',
  passport.authenticate('jwt', { session: false }),
  joinVoiceRoom
);

/**
 * @route   PUT /api/chatrooms/voice/:id/leave
 * @desc    Leave a voice room
 * @access  Private
 */
router.put(
  '/voice/:id/leave',
  passport.authenticate('jwt', { session: false }),
  leaveVoiceRoom
);

/**
 * @route   PUT /api/chatrooms/:id/participants
 * @desc    Add participants to a chat room
 * @access  Private
 */
router.put(
  '/:id/participants',
  passport.authenticate('jwt', { session: false }),
  addParticipants
);

module.exports = router;
