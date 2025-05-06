const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Message Schema
const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'document', 'audio', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    name: String,
    size: Number,
    mimeType: String
  }],
  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure either recipient or chatRoom is provided
MessageSchema.pre('save', function(next) {
  if (!this.recipient && !this.chatRoom) {
    return next(new Error('Message must have either a recipient or a chat room'));
  }
  next();
});

module.exports = mongoose.model('Message', MessageSchema);
