const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const {
  getChatRoomMessages,
  getDirectMessages,
  sendChatRoomMessage,
  sendDirectMessage,
  markMessagesAsRead
} = require('../controllers/messages');

/**
 * @route   GET /api/messages/room/:roomId
 * @desc    Get all messages for a chat room
 * @access  Private
 */
router.get(
  '/room/:roomId',
  passport.authenticate('jwt', { session: false }),
  getChatRoomMessages
);

/**
 * @route   GET /api/messages/direct/:userId
 * @desc    Get direct messages between two users
 * @access  Private
 */
router.get(
  '/direct/:userId',
  passport.authenticate('jwt', { session: false }),
  getDirectMessages
);

/**
 * @route   POST /api/messages/room/:roomId
 * @desc    Send a message to a chat room
 * @access  Private
 */
router.post(
  '/room/:roomId',
  passport.authenticate('jwt', { session: false }),
  sendChatRoomMessage
);

/**
 * @route   POST /api/messages/direct/:userId
 * @desc    Send a direct message to a user
 * @access  Private
 */
router.post(
  '/direct/:userId',
  passport.authenticate('jwt', { session: false }),
  sendDirectMessage
);

/**
 * @route   PUT /api/messages/read
 * @desc    Mark messages as read
 * @access  Private
 */
router.put(
  '/read',
  passport.authenticate('jwt', { session: false }),
  markMessagesAsRead
);

module.exports = router;
