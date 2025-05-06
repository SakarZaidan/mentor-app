const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Todo = require('../models/Todo');
const User = require('../models/User');

// Mock user data
const testUser = {
  name: 'Todo Test User',
  email: 'todo-test@example.com',
  password: 'password123',
  username: 'todotestuser'
};

// Token for authentication
let token;
let userId;
let todoId;

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
  await Todo.deleteMany({ user: userId });
  await User.deleteOne({ email: testUser.email });
  await mongoose.connection.close();
});

// Todo routes tests
describe('Todo API', () => {
  // Test create todo
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        description: 'This is a test todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        tags: ['test', 'api']
      };

      const res = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send(newTodo);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('title', newTodo.title);
      expect(res.body.data).toHaveProperty('description', newTodo.description);
      expect(res.body.data).toHaveProperty('priority', newTodo.priority);
      expect(res.body.data).toHaveProperty('user', userId);
      
      // Save todo ID for later tests
      todoId = res.body.data.id;
    });

    it('should not create todo without authentication', async () => {
      const newTodo = {
        title: 'Unauthorized Todo',
        description: 'This should not be created'
      };

      const res = await request(app)
        .post('/api/todos')
        .send(newTodo);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should not create todo without required fields', async () => {
      const invalidTodo = {
        description: 'Missing title'
      };

      const res = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidTodo);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test get all todos
  describe('GET /api/todos', () => {
    it('should get all todos for the user', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should not get todos without authentication', async () => {
      const res = await request(app)
        .get('/api/todos');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test get single todo
  describe('GET /api/todos/:id', () => {
    it('should get a single todo by ID', async () => {
      const res = await request(app)
        .get(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id', todoId);
      expect(res.body.data).toHaveProperty('title');
      expect(res.body.data).toHaveProperty('user', userId);
    });

    it('should not get todo with invalid ID', async () => {
      const res = await request(app)
        .get('/api/todos/invalidid')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test update todo
  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const updatedTodo = {
        title: 'Updated Test Todo',
        completed: true
      };

      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTodo);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('title', updatedTodo.title);
      expect(res.body.data).toHaveProperty('completed', updatedTodo.completed);
    });

    it('should not update todo without authentication', async () => {
      const updatedTodo = {
        title: 'Unauthorized Update'
      };

      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updatedTodo);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test delete todo
  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const res = await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should not delete todo without authentication', async () => {
      const res = await request(app)
        .delete(`/api/todos/${todoId}`);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
