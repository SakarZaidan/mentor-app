const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * @desc    Get current user's profile
 * @route   GET /api/profile/me
 * @access  Private
 */
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'username', 'profilePicture']);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Get current profile error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Create or update user profile
 * @route   POST /api/profile
 * @access  Private
 */
exports.createOrUpdateProfile = async (req, res) => {
  try {
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    
    // Basic fields
    if (req.body.role) profileFields.role = req.body.role;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.availability) profileFields.availability = req.body.availability;
    if (req.body.hourlyRate) profileFields.hourlyRate = req.body.hourlyRate;
    
    // Arrays
    if (req.body.skills) {
      profileFields.skills = req.body.skills;
    }
    if (req.body.majors) {
      profileFields.majors = req.body.majors.split(',').map(major => major.trim());
    }
    if (req.body.mentorshipAreas) {
      profileFields.mentorshipAreas = req.body.mentorshipAreas.split(',').map(area => area.trim());
    }
    if (req.body.coachingSpecialties) {
      profileFields.coachingSpecialties = req.body.coachingSpecialties.split(',').map(specialty => specialty.trim());
    }
    
    // Social links
    profileFields.socialLinks = {};
    if (req.body.website) profileFields.socialLinks.website = req.body.website;
    if (req.body.linkedin) profileFields.socialLinks.linkedin = req.body.linkedin;
    if (req.body.github) profileFields.socialLinks.github = req.body.github;
    if (req.body.twitter) profileFields.socialLinks.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.socialLinks.instagram = req.body.instagram;
    
    // Find profile
    let profile = await Profile.findOne({ user: req.user.id });
    
    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      
      return res.status(200).json({
        success: true,
        data: profile
      });
    }
    
    // Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    
    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Create/update profile error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get all profiles
 * @route   GET /api/profile
 * @access  Public
 */
exports.getAllProfiles = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { role, skill } = req.query;
    
    // Build query object
    const query = {};
    
    // Add role filter if provided
    if (role) {
      query.role = role;
    }
    
    // Add skill filter if provided
    if (skill) {
      query['skills.name'] = skill;
    }
    
    const profiles = await Profile.find(query).populate('user', ['name', 'email', 'username', 'profilePicture']);
    
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    console.error('Get all profiles error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Get profile by user ID
 * @route   GET /api/profile/user/:userId
 * @access  Public
 */
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email', 'username', 'profilePicture']);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Get profile by user ID error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Add education to profile
 * @route   PUT /api/profile/education
 * @access  Private
 */
exports.addEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Add education to beginning of array
    profile.education.unshift(req.body);
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Add education error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Add experience to profile
 * @route   PUT /api/profile/experience
 * @access  Private
 */
exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Add experience to beginning of array
    profile.experience.unshift(req.body);
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Add experience error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Add achievement to profile
 * @route   PUT /api/profile/achievement
 * @access  Private
 */
exports.addAchievement = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Add achievement to beginning of array
    profile.achievements.unshift(req.body);
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Add achievement error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Follow a user
 * @route   PUT /api/profile/follow/:userId
 * @access  Private
 */
exports.followUser = async (req, res) => {
  try {
    // Check if trying to follow self
    if (req.params.userId === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'You cannot follow yourself'
      });
    }
    
    // Get current user's profile
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Your profile not found'
      });
    }
    
    // Check if already following
    if (profile.following.includes(req.params.userId)) {
      return res.status(400).json({
        success: false,
        error: 'You are already following this user'
      });
    }
    
    // Get target user's profile
    const targetProfile = await Profile.findOne({ user: req.params.userId });
    
    if (!targetProfile) {
      return res.status(404).json({
        success: false,
        error: 'Target user profile not found'
      });
    }
    
    // Add to following list
    profile.following.push(req.params.userId);
    await profile.save();
    
    // Add to followers list of target user
    targetProfile.followers.push(req.user.id);
    await targetProfile.save();
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Follow user error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Target user not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc    Unfollow a user
 * @route   PUT /api/profile/unfollow/:userId
 * @access  Private
 */
exports.unfollowUser = async (req, res) => {
  try {
    // Get current user's profile
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Your profile not found'
      });
    }
    
    // Check if not following
    if (!profile.following.includes(req.params.userId)) {
      return res.status(400).json({
        success: false,
        error: 'You are not following this user'
      });
    }
    
    // Get target user's profile
    const targetProfile = await Profile.findOne({ user: req.params.userId });
    
    if (!targetProfile) {
      return res.status(404).json({
        success: false,
        error: 'Target user profile not found'
      });
    }
    
    // Remove from following list
    profile.following = profile.following.filter(
      userId => userId.toString() !== req.params.userId
    );
    await profile.save();
    
    // Remove from followers list of target user
    targetProfile.followers = targetProfile.followers.filter(
      userId => userId.toString() !== req.user.id
    );
    await targetProfile.save();
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error('Unfollow user error:', err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Target user not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
