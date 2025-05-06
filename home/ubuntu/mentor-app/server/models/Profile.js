const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'coach'],
    default: 'student'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    yearsOfExperience: {
      type: Number,
      default: 0
    }
  }],
  majors: [String],
  education: [{
    institution: String,
    degree: String,
    field: String,
    from: Date,
    to: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: String
  }],
  experience: [{
    title: String,
    company: String,
    location: String,
    from: Date,
    to: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  socialLinks: {
    website: String,
    linkedin: String,
    github: String,
    twitter: String,
    instagram: String
  },
  mentorshipAreas: [String],
  coachingSpecialties: [String],
  availability: {
    type: String,
    enum: ['available', 'limited', 'unavailable'],
    default: 'limited'
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  profilePicture: {
    type: String,
    default: 'default-profile.jpg'
  },
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  badges: [{
    name: String,
    icon: String,
    description: String,
    dateEarned: {
      type: Date,
      default: Date.now
    }
  }],
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
ProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
