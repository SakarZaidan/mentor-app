const mongoose = require('mongoose');

const SocialMediaPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['instagram', 'tiktok', 'pinterest', 'reddit', 'quora'],
    required: true
  },
  type: {
    type: String,
    enum: ['post', 'reel', 'thread'],
    required: true
  },
  originalId: {
    type: String,
    required: true
  },
  content: {
    text: String,
    media: [{
      type: String,
      url: String
    }]
  },
  author: {
    originalId: String,
    username: String,
    profilePicture: String
  },
  stats: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  userInteraction: {
    liked: {
      type: Boolean,
      default: false
    },
    saved: {
      type: Boolean,
      default: false
    },
    commented: {
      type: Boolean,
      default: false
    }
  },
  comments: [{
    originalId: String,
    author: {
      originalId: String,
      username: String,
      profilePicture: String
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  originalCreatedAt: Date,
  fetchedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SocialMediaPost', SocialMediaPostSchema);
