const Todo = require('../models/Todo');

/**
 * @desc    Get all todos for a user
 * @route   GET /api/todos
 * @access  Private
 */
exports.getTodos = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { completed, priority, tags } = req.query;
    
    // Build query object
    const query = { user: req.user.id };
    
    // Add completed filter if provided
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    // Add priority filter if provided
    if (priority) {
      query.priority = priority;
    }
    
    // Add tags filter if provided
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }
    
    // Find todos matching query
    const todos = await Todo.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    console.error('Get todos error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get single todo
 * @route   GET /api/todos/:id
 * @access  Private
 */
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this todo'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error('Get todo error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Create a new todo
 * @route   POST /api/todos
 * @access  Private
 */
exports.createTodo = async (req, res) => {
  try {
    // Add user to request body
    req.body.user = req.user.id;
    
    // Create todo
    const todo = await Todo.create(req.body);
    
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error('Create todo error:', err);
    
    // Validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Update a todo
 * @route   PUT /api/todos/:id
 * @access  Private
 */
exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this todo'
      });
    }
    
    // Update todo
    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error('Update todo error:', err);
    
    // Validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Delete a todo
 * @route   DELETE /api/todos/:id
 * @access  Private
 */
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this todo'
      });
    }
    
    await todo.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Delete todo error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
