const Message = require('../models/Message');
const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

/**
 * @desc    Get all messages for a chat room
 * @route   GET /api/messages/room/:roomId
 * @access  Private
 */
exports.getChatRoomMessages = async (req, res) => {
  try {
    // Check if user is a participant in the chat room
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    
    if (!chatRoom) {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    // Verify user is a participant
    const isParticipant = chatRoom.participants.some(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this chat room'
      });
    }
    
    // Get messages for the chat room
    const messages = await Message.find({ chatRoom: req.params.roomId })
      .sort({ createdAt: 1 })
      .populate('sender', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    console.error('Get chat room messages error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get direct messages between two users
 * @route   GET /api/messages/direct/:userId
 * @access  Private
 */
exports.getDirectMessages = async (req, res) => {
  try {
    // Find or create direct chat room between users
    let chatRoom = await ChatRoom.findOne({
      type: 'direct',
      participants: {
        $all: [
          { $elemMatch: { user: req.user.id } },
          { $elemMatch: { user: req.params.userId } }
        ]
      }
    });
    
    if (!chatRoom) {
      // Create new direct chat room
      const targetUser = await User.findById(req.params.userId);
      
      if (!targetUser) {
        return res.status(404).json({
          success: false,
          error: 'Target user not found'
        });
      }
      
      chatRoom = new ChatRoom({
        name: `${req.user.name} & ${targetUser.name}`,
        type: 'direct',
        participants: [
          { user: req.user.id, role: 'member' },
          { user: req.params.userId, role: 'member' }
        ],
        createdBy: req.user.id
      });
      
      await chatRoom.save();
    }
    
    // Get messages for the chat room
    const messages = await Message.find({ chatRoom: chatRoom._id })
      .sort({ createdAt: 1 })
      .populate('sender', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: {
        chatRoom,
        messages
      }
    });
  } catch (err) {
    console.error('Get direct messages error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Send a message to a chat room
 * @route   POST /api/messages/room/:roomId
 * @access  Private
 */
exports.sendChatRoomMessage = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    
    // Validate content
    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'Message content or attachments are required'
      });
    }
    
    // Check if user is a participant in the chat room
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    
    if (!chatRoom) {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    // Verify user is a participant
    const isParticipant = chatRoom.participants.some(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to send messages to this chat room'
      });
    }
    
    // Create new message
    const message = new Message({
      sender: req.user.id,
      chatRoom: req.params.roomId,
      content,
      attachments: attachments || []
    });
    
    await message.save();
    
    // Update chat room's last message and activity
    chatRoom.lastMessage = message._id;
    chatRoom.lastActivity = Date.now();
    
    // Update participant's last seen
    const participantIndex = chatRoom.participants.findIndex(
      participant => participant.user.toString() === req.user.id
    );
    
    if (participantIndex !== -1) {
      chatRoom.participants[participantIndex].lastSeen = Date.now();
    }
    
    await chatRoom.save();
    
    // Populate sender info
    await message.populate('sender', ['name', 'username', 'profilePicture']);
    
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (err) {
    console.error('Send chat room message error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Send a direct message to a user
 * @route   POST /api/messages/direct/:userId
 * @access  Private
 */
exports.sendDirectMessage = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    
    // Validate content
    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'Message content or attachments are required'
      });
    }
    
    // Find or create direct chat room between users
    let chatRoom = await ChatRoom.findOne({
      type: 'direct',
      participants: {
        $all: [
          { $elemMatch: { user: req.user.id } },
          { $elemMatch: { user: req.params.userId } }
        ]
      }
    });
    
    if (!chatRoom) {
      // Create new direct chat room
      const targetUser = await User.findById(req.params.userId);
      
      if (!targetUser) {
        return res.status(404).json({
          success: false,
          error: 'Target user not found'
        });
      }
      
      chatRoom = new ChatRoom({
        name: `${req.user.name} & ${targetUser.name}`,
        type: 'direct',
        participants: [
          { user: req.user.id, role: 'member' },
          { user: req.params.userId, role: 'member' }
        ],
        createdBy: req.user.id
      });
      
      await chatRoom.save();
    }
    
    // Create new message
    const message = new Message({
      sender: req.user.id,
      recipient: req.params.userId,
      chatRoom: chatRoom._id,
      content,
      attachments: attachments || []
    });
    
    await message.save();
    
    // Update chat room's last message and activity
    chatRoom.lastMessage = message._id;
    chatRoom.lastActivity = Date.now();
    
    // Update participant's last seen
    const participantIndex = chatRoom.participants.findIndex(
      participant => participant.user.toString() === req.user.id
    );
    
    if (participantIndex !== -1) {
      chatRoom.participants[participantIndex].lastSeen = Date.now();
    }
    
    await chatRoom.save();
    
    // Populate sender info
    await message.populate('sender', ['name', 'username', 'profilePicture']);
    
    res.status(201).json({
      success: true,
      data: {
        chatRoom,
        message
      }
    });
  } catch (err) {
    console.error('Send direct message error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Mark messages as read
 * @route   PUT /api/messages/read
 * @access  Private
 */
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body;
    
    if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message IDs are required'
      });
    }
    
    // Update messages
    const result = await Message.updateMany(
      {
        _id: { $in: messageIds },
        recipient: req.user.id,
        read: false
      },
      {
        $set: {
          read: true,
          readAt: Date.now()
        }
      }
    );
    
    res.status(200).json({
      success: true,
      data: {
        modifiedCount: result.modifiedCount
      }
    });
  } catch (err) {
    console.error('Mark messages as read error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
