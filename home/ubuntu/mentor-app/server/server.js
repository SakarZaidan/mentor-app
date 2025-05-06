const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/social', require('./routes/social'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/chatrooms', require('./routes/chatrooms'));
app.use('/api/gamification', require('./routes/gamification'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// Add this near your other route definitions in server.js
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

module.exports = app;
