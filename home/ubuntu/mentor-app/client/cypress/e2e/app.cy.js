describe('Mentor App E2E Tests', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000');
  });

  describe('Authentication', () => {
    it('should allow a user to register', () => {
      // Click on register link
      cy.contains('Register').click();
      
      // Fill out registration form
      cy.get('input[name="name"]').type('E2E Test User');
      cy.get('input[name="email"]').type(`e2e-test-${Date.now()}@example.com`);
      cy.get('input[name="username"]').type(`e2e-test-user-${Date.now()}`);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Verify successful registration
      cy.contains('Dashboard').should('be.visible');
      cy.contains('E2E Test User').should('be.visible');
    });

    it('should allow a user to login', () => {
      // Click on login link
      cy.contains('Login').click();
      
      // Fill out login form
      cy.get('input[name="email"]').type('e2e-test@example.com');
      cy.get('input[name="password"]').type('password123');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Verify successful login
      cy.contains('Dashboard').should('be.visible');
    });

    it('should show error for invalid login', () => {
      // Click on login link
      cy.contains('Login').click();
      
      // Fill out login form with invalid credentials
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Verify error message
      cy.contains('Invalid credentials').should('be.visible');
    });
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      // Login before each dashboard test
      cy.login('e2e-test@example.com', 'password123');
    });

    it('should display user profile information', () => {
      // Navigate to profile
      cy.contains('Profile').click();
      
      // Verify profile information
      cy.contains('E2E Test User').should('be.visible');
      cy.contains('e2e-test@example.com').should('be.visible');
    });

    it('should allow creating a new todo', () => {
      // Navigate to todos
      cy.contains('To-Do List').click();
      
      // Click add todo button
      cy.contains('Add Task').click();
      
      // Fill out todo form
      cy.get('input[name="title"]').type('E2E Test Todo');
      cy.get('textarea[name="description"]').type('This is a test todo created by Cypress');
      cy.get('select[name="priority"]').select('High');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Verify todo was created
      cy.contains('E2E Test Todo').should('be.visible');
      cy.contains('High').should('be.visible');
    });

    it('should allow creating a new project', () => {
      // Navigate to projects
      cy.contains('Projects').click();
      
      // Click add project button
      cy.contains('New Project').click();
      
      // Fill out project form
      cy.get('input[name="title"]').type('E2E Test Project');
      cy.get('textarea[name="description"]').type('This is a test project created by Cypress');
      cy.get('select[name="category"]').select('Development');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Verify project was created
      cy.contains('E2E Test Project').should('be.visible');
      cy.contains('Development').should('be.visible');
    });
  });

  describe('Social Media Integration', () => {
    beforeEach(() => {
      // Login before each social media test
      cy.login('e2e-test@example.com', 'password123');
    });

    it('should display social media feed', () => {
      // Navigate to feed
      cy.contains('Feed').click();
      
      // Verify feed components
      cy.contains('Posts').should('be.visible');
      cy.contains('Reels').should('be.visible');
      cy.contains('Threads').should('be.visible');
    });

    it('should allow filtering by platform', () => {
      // Navigate to feed
      cy.contains('Feed').click();
      
      // Select Instagram filter
      cy.contains('Instagram').click();
      
      // Verify filter applied
      cy.get('.active-filter').contains('Instagram').should('be.visible');
    });
  });

  describe('Gamification', () => {
    beforeEach(() => {
      // Login before each gamification test
      cy.login('e2e-test@example.com', 'password123');
    });

    it('should display user level and XP', () => {
      // Navigate to gamification
      cy.contains('Gamification').click();
      
      // Verify level information
      cy.contains('Level').should('be.visible');
      cy.contains('XP').should('be.visible');
    });

    it('should display badges', () => {
      // Navigate to gamification
      cy.contains('Gamification').click();
      
      // Go to badges tab
      cy.contains('Badges').click();
      
      // Verify badges section
      cy.contains('Your Badges').should('be.visible');
    });

    it('should display leaderboard', () => {
      // Navigate to gamification
      cy.contains('Gamification').click();
      
      // Go to leaderboard tab
      cy.contains('Leaderboard').click();
      
      // Verify leaderboard
      cy.contains('Global Leaderboard').should('be.visible');
      cy.get('.leaderboard-item').should('have.length.at.least', 1);
    });
  });
});

// Custom command for login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains('Dashboard').should('be.visible');
});
