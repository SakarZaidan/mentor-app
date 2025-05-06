const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

// Mock user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  username: 'testuser'
};

// Token for authentication
let token;

// Before all tests, connect to the database
beforeAll(async () => {
  // Clear test user if exists
  await User.deleteOne({ email: testUser.email });
});

// After all tests, disconnect from the database
afterAll(async () => {
  await User.deleteOne({ email: testUser.email });
  await mongoose.connection.close();
});

// Auth routes tests
describe('Auth API', () => {
  // Test user registration
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name', testUser.name);
      expect(res.body.data).toHaveProperty('email', testUser.email);
      expect(res.body.data).toHaveProperty('username', testUser.username);
      
      // Save token for later tests
      token = res.body.token;
    });

    it('should not register a user with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test user login
  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name', testUser.name);
      expect(res.body.data).toHaveProperty('email', testUser.email);
      
      // Update token
      token = res.body.token;
    });

    it('should not login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });

    it('should not login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test get current user
  describe('GET /api/auth/me', () => {
    it('should get current user profile', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name', testUser.name);
      expect(res.body.data).toHaveProperty('email', testUser.email);
    });

    it('should not get profile without token', async () => {
      const res = await request(app)
        .get('/api/auth/me');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });

    it('should not get profile with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test update user
  describe('PUT /api/auth/me', () => {
    it('should update user profile', async () => {
      const updatedUser = {
        name: 'Updated Test User'
      };

      const res = await request(app)
        .put('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('name', updatedUser.name);
    });

    it('should not update user without token', async () => {
      const updatedUser = {
        name: 'Another Update'
      };

      const res = await request(app)
        .put('/api/auth/me')
        .send(updatedUser);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test update password
  describe('PUT /api/auth/password', () => {
    it('should update user password', async () => {
      const passwordUpdate = {
        currentPassword: testUser.password,
        newPassword: 'newpassword123'
      };

      const res = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordUpdate);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message');

      // Update test user password for future tests
      testUser.password = passwordUpdate.newPassword;
    });

    it('should not update password with incorrect current password', async () => {
      const passwordUpdate = {
        currentPassword: 'wrongpassword',
        newPassword: 'anothernewpassword'
      };

      const res = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordUpdate);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });
});
