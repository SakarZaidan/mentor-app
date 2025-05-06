const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const { Badge, Achievement, UserAchievement, UserBadge } = require('../models/Gamification');

// Mock user data
const testUser = {
  name: 'Gamification Test User',
  email: 'gamification-test@example.com',
  password: 'password123',
  username: 'gamificationtestuser'
};

// Token for authentication
let token;
let userId;

// Before all tests, connect to the database and create a test user
beforeAll(async () => {
  // Clear test user if exists
  await User.deleteOne({ email: testUser.email });
  
  // Register test user
  const res = await request(app)
    .post('/api/auth/register')
    .send(testUser);
  
  token = res.body.token;
  userId = res.body.data.id;
});

// After all tests, clean up and disconnect
afterAll(async () => {
  await UserAchievement.deleteMany({ user: userId });
  await UserBadge.deleteMany({ user: userId });
  await User.deleteOne({ email: testUser.email });
  await mongoose.connection.close();
});

// Gamification routes tests
describe('Gamification API', () => {
  // Test get gamification profile
  describe('GET /api/gamification/profile', () => {
    it('should get user gamification profile', async () => {
      const res = await request(app)
        .get('/api/gamification/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('level');
      expect(res.body.data).toHaveProperty('xp');
      expect(res.body.data).toHaveProperty('badges');
      expect(res.body.data).toHaveProperty('achievements');
    });

    it('should not get profile without authentication', async () => {
      const res = await request(app)
        .get('/api/gamification/profile');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test get leaderboard
  describe('GET /api/gamification/leaderboard', () => {
    it('should get global leaderboard', async () => {
      const res = await request(app)
        .get('/api/gamification/leaderboard');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    it('should get leaderboard with pagination', async () => {
      const res = await request(app)
        .get('/api/gamification/leaderboard?limit=5&page=1');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data.length).toBeLessThanOrEqual(5);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('page', 1);
      expect(res.body.pagination).toHaveProperty('limit', 5);
    });

    it('should get leaderboard with timeframe filter', async () => {
      const res = await request(app)
        .get('/api/gamification/leaderboard?timeframe=this-week');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });

  // Test get all badges
  describe('GET /api/gamification/badges', () => {
    it('should get all badges', async () => {
      const res = await request(app)
        .get('/api/gamification/badges');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });

  // Test get all achievements
  describe('GET /api/gamification/achievements', () => {
    it('should get all achievements', async () => {
      const res = await request(app)
        .get('/api/gamification/achievements');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });

  // Test update achievement progress
  describe('PUT /api/gamification/achievements/:id/progress', () => {
    let achievementId;

    // First, get an achievement ID to use for testing
    beforeAll(async () => {
      const res = await request(app)
        .get('/api/gamification/achievements');
      
      if (res.body.data && res.body.data.length > 0) {
        achievementId = res.body.data[0]._id;
      } else {
        // Create a test achievement if none exists
        const testAchievement = new Achievement({
          name: 'Test Achievement',
          description: 'Achievement for testing',
          category: 'beginner',
          maxProgress: 5,
          xpReward: 50
        });
        
        const savedAchievement = await testAchievement.save();
        achievementId = savedAchievement._id;
      }
    });

    it('should update achievement progress', async () => {
      if (!achievementId) {
        // Skip test if no achievement ID is available
        return;
      }

      const res = await request(app)
        .put(`/api/gamification/achievements/${achievementId}/progress`)
        .set('Authorization', `Bearer ${token}`)
        .send({ progress: 3 });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('progress', 3);
    });

    it('should not update progress without authentication', async () => {
      if (!achievementId) {
        // Skip test if no achievement ID is available
        return;
      }

      const res = await request(app)
        .put(`/api/gamification/achievements/${achievementId}/progress`)
        .send({ progress: 4 });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should complete achievement when progress reaches max', async () => {
      if (!achievementId) {
        // Skip test if no achievement ID is available
        return;
      }

      // Get the achievement to check maxProgress
      const achievementRes = await request(app)
        .get('/api/gamification/achievements');
      
      const achievement = achievementRes.body.data.find(a => a._id === achievementId);
      
      if (!achievement) {
        // Skip test if achievement not found
        return;
      }

      const res = await request(app)
        .put(`/api/gamification/achievements/${achievementId}/progress`)
        .set('Authorization', `Bearer ${token}`)
        .send({ progress: achievement.maxProgress });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('completed', true);
      expect(res.body.data).toHaveProperty('dateCompleted');
      expect(res.body).toHaveProperty('xpAwarded');
    });
  });

  // Test get levels
  describe('GET /api/gamification/levels', () => {
    it('should get all levels', async () => {
      const res = await request(app)
        .get('/api/gamification/levels');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });
});
