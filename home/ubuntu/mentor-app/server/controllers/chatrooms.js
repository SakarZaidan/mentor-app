const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

/**
 * @desc    Get all chat rooms for a user
 * @route   GET /api/chatrooms
 * @access  Private
 */
exports.getUserChatRooms = async (req, res) => {
  try {
    // Find all chat rooms where user is a participant
    const chatRooms = await ChatRoom.find({
      'participants.user': req.user.id
    })
      .sort({ lastActivity: -1 })
      .populate('lastMessage')
      .populate('participants.user', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      count: chatRooms.length,
      data: chatRooms
    });
  } catch (err) {
    console.error('Get user chat rooms error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get a single chat room
 * @route   GET /api/chatrooms/:id
 * @access  Private
 */
exports.getChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id)
      .populate('lastMessage')
      .populate('participants.user', ['name', 'username', 'profilePicture'])
      .populate('createdBy', ['name', 'username', 'profilePicture']);
    
    if (!chatRoom) {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    // Verify user is a participant
    const isParticipant = chatRoom.participants.some(
      participant => participant.user._id.toString() === req.user.id
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this chat room'
      });
    }
    
    res.status(200).json({
      success: true,
      data: chatRoom
    });
  } catch (err) {
    console.error('Get chat room error:', err);
    
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
 * @desc    Create a new group chat room
 * @route   POST /api/chatrooms/group
 * @access  Private
 */
exports.createGroupChatRoom = async (req, res) => {
  try {
    const { name, description, participants } = req.body;
    
    // Validate input
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Chat room name is required'
      });
    }
    
    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one participant is required'
      });
    }
    
    // Add current user to participants if not already included
    if (!participants.includes(req.user.id)) {
      participants.push(req.user.id);
    }
    
    // Verify all participants exist
    const users = await User.find({ _id: { $in: participants } });
    
    if (users.length !== participants.length) {
      return res.status(400).json({
        success: false,
        error: 'One or more participants do not exist'
      });
    }
    
    // Format participants for chat room
    const formattedParticipants = participants.map(userId => ({
      user: userId,
      role: userId === req.user.id ? 'admin' : 'member'
    }));
    
    // Create new chat room
    const chatRoom = new ChatRoom({
      name,
      description,
      type: 'group',
      participants: formattedParticipants,
      createdBy: req.user.id
    });
    
    await chatRoom.save();
    
    // Populate participant info
    await chatRoom.populate('participants.user', ['name', 'username', 'profilePicture']);
    await chatRoom.populate('createdBy', ['name', 'username', 'profilePicture']);
    
    res.status(201).json({
      success: true,
      data: chatRoom
    });
  } catch (err) {
    console.error('Create group chat room error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Create a new voice room
 * @route   POST /api/chatrooms/voice
 * @access  Private
 */
exports.createVoiceRoom = async (req, res) => {
  try {
    const { name, topic, scheduledFor, duration, participants } = req.body;
    
    // Validate input
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Voice room name is required'
      });
    }
    
    // Format participants for chat room
    let formattedParticipants = [{ user: req.user.id, role: 'admin' }];
    
    if (participants && Array.isArray(participants) && participants.length > 0) {
      // Verify all participants exist
      const users = await User.find({ _id: { $in: participants } });
      
      if (users.length !== participants.length) {
        return res.status(400).json({
          success: false,
          error: 'One or more participants do not exist'
        });
      }
      
      // Add other participants
      const otherParticipants = participants
        .filter(userId => userId !== req.user.id)
        .map(userId => ({
          user: userId,
          role: 'member'
        }));
      
      formattedParticipants = [...formattedParticipants, ...otherParticipants];
    }
    
    // Create new voice room
    const voiceRoom = new ChatRoom({
      name,
      topic,
      type: 'voice',
      participants: formattedParticipants,
      isVoiceActive: true,
      activeParticipants: [req.user.id],
      scheduledFor: scheduledFor || Date.now(),
      duration,
      createdBy: req.user.id
    });
    
    await voiceRoom.save();
    
    // Populate participant info
    await voiceRoom.populate('participants.user', ['name', 'username', 'profilePicture']);
    await voiceRoom.populate('createdBy', ['name', 'username', 'profilePicture']);
    await voiceRoom.populate('activeParticipants', ['name', 'username', 'profilePicture']);
    
    res.status(201).json({
      success: true,
      data: voiceRoom
    });
  } catch (err) {
    console.error('Create voice room error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Join a voice room
 * @route   PUT /api/chatrooms/voice/:id/join
 * @access  Private
 */
exports.joinVoiceRoom = async (req, res) => {
  try {
    const voiceRoom = await ChatRoom.findById(req.params.id);
    
    if (!voiceRoom) {
      return res.status(404).json({
        success: false,
        error: 'Voice room not found'
      });
    }
    
    if (voiceRoom.type !== 'voice') {
      return res.status(400).json({
        success: false,
        error: 'This is not a voice room'
      });
    }
    
    // Check if voice room is active
    if (!voiceRoom.isVoiceActive) {
      return res.status(400).json({
        success: false,
        error: 'This voice room is not active'
      });
    }
    
    // Check if user is already in active participants
    if (voiceRoom.activeParticipants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        error: 'You are already in this voice room'
      });
    }
    
    // Check if user is a participant
    const isParticipant = voiceRoom.participants.some(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!isParticipant) {
      // Add user as participant
      voiceRoom.participants.push({
        user: req.user.id,
        role: 'member',
        joinedAt: Date.now()
      });
    }
    
    // Add user to active participants
    voiceRoom.activeParticipants.push(req.user.id);
    
    // Update last activity
    voiceRoom.lastActivity = Date.now();
    
    await voiceRoom.save();
    
    // Populate participant info
    await voiceRoom.populate('participants.user', ['name', 'username', 'profilePicture']);
    await voiceRoom.populate('activeParticipants', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      data: voiceRoom
    });
  } catch (err) {
    console.error('Join voice room error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Voice room not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Leave a voice room
 * @route   PUT /api/chatrooms/voice/:id/leave
 * @access  Private
 */
exports.leaveVoiceRoom = async (req, res) => {
  try {
    const voiceRoom = await ChatRoom.findById(req.params.id);
    
    if (!voiceRoom) {
      return res.status(404).json({
        success: false,
        error: 'Voice room not found'
      });
    }
    
    if (voiceRoom.type !== 'voice') {
      return res.status(400).json({
        success: false,
        error: 'This is not a voice room'
      });
    }
    
    // Check if user is in active participants
    if (!voiceRoom.activeParticipants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        error: 'You are not in this voice room'
      });
    }
    
    // Remove user from active participants
    voiceRoom.activeParticipants = voiceRoom.activeParticipants.filter(
      userId => userId.toString() !== req.user.id
    );
    
    // If no active participants left, deactivate voice room
    if (voiceRoom.activeParticipants.length === 0) {
      voiceRoom.isVoiceActive = false;
    }
    
    // Update last activity
    voiceRoom.lastActivity = Date.now();
    
    await voiceRoom.save();
    
    // Populate participant info
    await voiceRoom.populate('participants.user', ['name', 'username', 'profilePicture']);
    await voiceRoom.populate('activeParticipants', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      data: voiceRoom
    });
  } catch (err) {
    console.error('Leave voice room error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Voice room not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Add participants to a chat room
 * @route   PUT /api/chatrooms/:id/participants
 * @access  Private
 */
exports.addParticipants = async (req, res) => {
  try {
    const { participants } = req.body;
    
    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Participants are required'
      });
    }
    
    const chatRoom = await ChatRoom.findById(req.params.id);
    
    if (!chatRoom) {
      return res.status(404).json({
        success: false,
        error: 'Chat room not found'
      });
    }
    
    // Check if user is admin
    const userParticipant = chatRoom.participants.find(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!userParticipant || userParticipant.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Only admins can add participants'
      });
    }
    
    // Verify all participants exist
    const users = await User.find({ _id: { $in: participants } });
    
    if (users.length !== participants.length) {
      return res.status(400).json({
        success: false,
        error: 'One or more participants do not exist'
      });
    }
    
    // Add new participants
    for (const userId of participants) {
      // Check if already a participant
      const existingParticipant = chatRoom.participants.find(
        participant => participant.user.toString() === userId
      );
      
      if (!existingParticipant) {
        chatRoom.participants.push({
          user: userId,
          role: 'member',
          joinedAt: Date.now()
        });
      }
    }
    
    await chatRoom.save();
    
    // Populate participant info
    await chatRoom.populate('participants.user', ['name', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      data: chatRoom
    });
  } catch (err) {
    console.error('Add participants error:', err);
    
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
