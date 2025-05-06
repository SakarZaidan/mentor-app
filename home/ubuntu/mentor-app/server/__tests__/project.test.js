const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { Project } = require('../models/Project');
const User = require('../models/User');

// Mock user data
const testUser = {
  name: 'Project Test User',
  email: 'project-test@example.com',
  password: 'password123',
  username: 'projecttestuser'
};

// Token for authentication
let token;
let userId;
let projectId;

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
  await Project.deleteMany({ owner: userId });
  await User.deleteOne({ email: testUser.email });
  await mongoose.connection.close();
});

// Project routes tests
describe('Project API', () => {
  // Test create project
  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const newProject = {
        title: 'Test Project',
        description: 'This is a test project',
        category: 'development',
        tags: ['react', 'nodejs'],
        deadline: new Date(Date.now() + 7 * 86400000).toISOString() // One week from now
      };

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(newProject);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('title', newProject.title);
      expect(res.body.data).toHaveProperty('description', newProject.description);
      expect(res.body.data).toHaveProperty('owner', userId);
      
      // Save project ID for later tests
      projectId = res.body.data.id;
    });

    it('should not create project without authentication', async () => {
      const newProject = {
        title: 'Unauthorized Project',
        description: 'This should not be created'
      };

      const res = await request(app)
        .post('/api/projects')
        .send(newProject);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should not create project without required fields', async () => {
      const invalidProject = {
        description: 'Missing title'
      };

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidProject);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test get all projects
  describe('GET /api/projects', () => {
    it('should get all projects for the user', async () => {
      const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should not get projects without authentication', async () => {
      const res = await request(app)
        .get('/api/projects');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test get single project
  describe('GET /api/projects/:id', () => {
    it('should get a single project by ID', async () => {
      const res = await request(app)
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id', projectId);
      expect(res.body.data).toHaveProperty('title');
      expect(res.body.data).toHaveProperty('owner', userId);
    });

    it('should not get project with invalid ID', async () => {
      const res = await request(app)
        .get('/api/projects/invalidid')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test add milestone
  describe('POST /api/projects/:id/milestones', () => {
    it('should add a milestone to a project', async () => {
      const newMilestone = {
        title: 'Test Milestone',
        description: 'This is a test milestone',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString() // Three days from now
      };

      const res = await request(app)
        .post(`/api/projects/${projectId}/milestones`)
        .set('Authorization', `Bearer ${token}`)
        .send(newMilestone);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data.milestones).toBeInstanceOf(Array);
      expect(res.body.data.milestones.length).toBeGreaterThan(0);
      expect(res.body.data.milestones[0]).toHaveProperty('title', newMilestone.title);
    });

    it('should not add milestone without authentication', async () => {
      const newMilestone = {
        title: 'Unauthorized Milestone',
        description: 'This should not be added'
      };

      const res = await request(app)
        .post(`/api/projects/${projectId}/milestones`)
        .send(newMilestone);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test update project
  describe('PUT /api/projects/:id', () => {
    it('should update a project', async () => {
      const updatedProject = {
        title: 'Updated Test Project',
        progress: 50
      };

      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedProject);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('title', updatedProject.title);
      expect(res.body.data).toHaveProperty('progress', updatedProject.progress);
    });

    it('should not update project without authentication', async () => {
      const updatedProject = {
        title: 'Unauthorized Update'
      };

      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .send(updatedProject);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test delete project
  describe('DELETE /api/projects/:id', () => {
    it('should delete a project', async () => {
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should not delete project without authentication', async () => {
      const res = await request(app)
        .delete(`/api/projects/${projectId}`);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
