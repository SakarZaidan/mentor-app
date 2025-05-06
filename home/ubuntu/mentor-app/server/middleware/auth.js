const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

// Load environment variables
require('dotenv').config();

// JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// Export Passport middleware
module.exports = () => {
  // JWT Strategy
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find user by ID from JWT payload
        const user = await User.findById(jwt_payload.id);
        
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
      } catch (err) {
        console.error('Error in JWT strategy:', err);
        return done(err, false);
      }
    })
  );
};
