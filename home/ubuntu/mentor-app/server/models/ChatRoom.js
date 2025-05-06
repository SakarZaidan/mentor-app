const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Chat Room Schema
const ChatRoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['direct', 'group', 'voice'],
    default: 'direct'
  },
  participants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    lastSeen: {
      type: Date,
      default: Date.now
    }
  }],
  avatar: {
    type: String,
    default: 'default-group.jpg'
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  // Voice room specific fields
  isVoiceActive: {
    type: Boolean,
    default: false
  },
  activeParticipants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  topic: String,
  scheduledFor: Date,
  duration: Number, // in minutes
  recordingUrl: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ChatRoomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
