const SocialMediaPost = require('../models/SocialMediaPost');
const User = require('../models/User');

/**
 * @desc    Get unified social media feed
 * @route   GET /api/social/feed
 * @access  Private
 */
exports.getFeed = async (req, res) => {
  try {
    // Get query parameters for filtering and pagination
    const { platform, type, limit = 20, page = 1 } = req.query;
    
    // Build query object
    const query = { user: req.user.id };
    
    // Add platform filter if provided
    if (platform) {
      query.platform = platform;
    }
    
    // Add type filter if provided
    if (type) {
      query.type = type;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find posts matching query
    const posts = await SocialMediaPost.find(query)
      .sort({ originalCreatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await SocialMediaPost.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: posts
    });
  } catch (err) {
    console.error('Get feed error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get posts from specific platform
 * @route   GET /api/social/platform/:platform
 * @access  Private
 */
exports.getPostsByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const { limit = 20, page = 1 } = req.query;
    
    // Validate platform
    const validPlatforms = ['instagram', 'tiktok', 'pinterest', 'reddit', 'quora'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        success: false,
        error: `Invalid platform: ${platform}. Valid platforms are: ${validPlatforms.join(', ')}`
      });
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find posts for the specified platform
    const posts = await SocialMediaPost.find({
      user: req.user.id,
      platform
    })
      .sort({ originalCreatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await SocialMediaPost.countDocuments({
      user: req.user.id,
      platform
    });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: posts
    });
  } catch (err) {
    console.error('Get posts by platform error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get posts by type (posts, reels, threads)
 * @route   GET /api/social/type/:type
 * @access  Private
 */
exports.getPostsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 20, page = 1 } = req.query;
    
    // Validate type
    const validTypes = ['post', 'reel', 'thread'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid type: ${type}. Valid types are: ${validTypes.join(', ')}`
      });
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find posts of the specified type
    const posts = await SocialMediaPost.find({
      user: req.user.id,
      type
    })
      .sort({ originalCreatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await SocialMediaPost.countDocuments({
      user: req.user.id,
      type
    });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: posts
    });
  } catch (err) {
    console.error('Get posts by type error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Like a post
 * @route   POST /api/social/like/:id
 * @access  Private
 */
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find post
    const post = await SocialMediaPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    // Check if post belongs to user
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to interact with this post'
      });
    }
    
    // Update like status
    post.userInteraction.liked = !post.userInteraction.liked;
    
    // Update stats
    if (post.userInteraction.liked) {
      post.stats.likes += 1;
    } else {
      post.stats.likes = Math.max(0, post.stats.likes - 1);
    }
    
    await post.save();
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Like post error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Comment on a post
 * @route   POST /api/social/comment/:id
 * @access  Private
 */
exports.commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Please provide comment text'
      });
    }
    
    // Find post
    const post = await SocialMediaPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    // Check if post belongs to user
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to interact with this post'
      });
    }
    
    // Add comment
    const newComment = {
      originalId: `local_${Date.now()}`,
      author: {
        originalId: req.user.id,
        username: req.user.username,
        profilePicture: req.user.profilePicture
      },
      text,
      createdAt: Date.now()
    };
    
    post.comments.push(newComment);
    post.stats.comments += 1;
    post.userInteraction.commented = true;
    
    await post.save();
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Comment on post error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Save a post
 * @route   POST /api/social/save/:id
 * @access  Private
 */
exports.savePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find post
    const post = await SocialMediaPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    // Check if post belongs to user
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to interact with this post'
      });
    }
    
    // Update saved status
    post.userInteraction.saved = !post.userInteraction.saved;
    
    await post.save();
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Save post error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Link a social media account
 * @route   POST /api/social/link/:platform
 * @access  Private
 */
exports.linkSocialAccount = async (req, res) => {
  try {
    const { platform } = req.params;
    const { accessToken } = req.body;
    
    // Validate platform
    const validPlatforms = ['instagram', 'tiktok', 'pinterest', 'reddit', 'quora'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        success: false,
        error: `Invalid platform: ${platform}. Valid platforms are: ${validPlatforms.join(', ')}`
      });
    }
    
    if (!accessToken) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an access token'
      });
    }
    
    // Find user
    const user = await User.findById(req.user.id);
    
    // Update linked accounts
    user.linkedAccounts[platform] = true;
    
    await user.save();
    
    // In a real implementation, you would store the access token securely
    // and use it to fetch posts from the platform's API
    
    res.status(200).json({
      success: true,
      data: {
        platform,
        linked: true
      }
    });
  } catch (err) {
    console.error('Link social account error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Unlink a social media account
 * @route   DELETE /api/social/unlink/:platform
 * @access  Private
 */
exports.unlinkSocialAccount = async (req, res) => {
  try {
    const { platform } = req.params;
    
    // Validate platform
    const validPlatforms = ['instagram', 'tiktok', 'pinterest', 'reddit', 'quora'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        success: false,
        error: `Invalid platform: ${platform}. Valid platforms are: ${validPlatforms.join(', ')}`
      });
    }
    
    // Find user
    const user = await User.findById(req.user.id);
    
    // Update linked accounts
    user.linkedAccounts[platform] = false;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        platform,
        linked: false
      }
    });
  } catch (err) {
    console.error('Unlink social account error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
