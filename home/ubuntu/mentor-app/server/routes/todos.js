const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import controllers
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todos');
const { optimizeTodos } = require('../controllers/ai');

/**
 * @route   GET /api/todos
 * @desc    Get all todos for a user
 * @access  Private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getTodos
);

/**
 * @route   GET /api/todos/:id
 * @desc    Get single todo
 * @access  Private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  getTodo
);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createTodo
);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update a todo
 * @access  Private
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateTodo
);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteTodo
);

/**
 * @route   POST /api/todos/optimize
 * @desc    Get AI optimization suggestions for todos
 * @access  Private
 */
router.post(
  '/optimize',
  passport.authenticate('jwt', { session: false }),
  optimizeTodos
);

module.exports = router;
