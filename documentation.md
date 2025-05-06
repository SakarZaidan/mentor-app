# Mentor App Documentation

## Overview

Mentor is a comprehensive application designed to help users master hobbies, skills, and interests by aggregating social media content, providing AI-driven guidance, and fostering a community of learners, mentors, and collaborators.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Usage Guide](#usage-guide)
5. [API Documentation](#api-documentation)
6. [Development Guide](#development-guide)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Features

### Social Media Integration
- Unified feed of posts (Instagram/Facebook), reels (TikTok), and threads (Reddit/Quora)
- Account linking via OAuth for multiple platforms
- Auto-like/comment functionality on linked platforms
- Separate tabs for different content types

### AI Assistance
- Personalized task and project suggestions based on user goals
- Skill/hobby learning paths with recommendations
- AI-optimized to-do lists and project milestones
- Learning progress analysis and recommendations

### Productivity Tools
- To-Do List with user editing and AI optimization
- Project Section with milestones, file sharing, and deadlines
- Pomodoro Timer with focus sessions and analytics
- Habit tracking with streaks and reminders

### Community & Networking
- Role-based profiles (Student, Mentor, Coach)
- Direct messaging and group chats
- Voice rooms for audio discussions
- Follow system to connect with peers and mentors

### Gamification
- Levels and badges to track skill mastery
- Achievements for completing projects and maintaining streaks
- Leaderboards for global and skill-specific rankings

## Architecture

### Frontend
- **Web**: React.js with Redux for state management
- **Mobile**: React Native with Expo
- **Shared**: Common components, Redux store, and utilities

### Backend
- **Server**: Node.js/Express.js REST API
- **Authentication**: Passport.js with JWT
- **Database**: MongoDB for user data, posts, tasks
- **Real-time**: Firebase Firestore for chat and notifications

### AI Services
- OpenAI integration for personalized recommendations
- TensorFlow/PyTorch for learning path suggestions

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Firebase account
- OpenAI API key

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/mentor-app.git
cd mentor-app/server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start
```

### Web App Setup
```bash
cd mentor-app/client/web

# Install dependencies
npm install

# Start development server
npm start
```

### Mobile App Setup
```bash
cd mentor-app/client/mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

## Usage Guide

### Account Creation and Setup
1. Register with email or social media account
2. Complete profile with skills, interests, and learning goals
3. Link social media accounts for content aggregation
4. Set preferences for AI recommendations

### Dashboard Navigation
- **Feed**: View aggregated social media content
- **Learn**: Access AI-recommended learning paths
- **Tasks**: Manage to-do lists and projects
- **Community**: Connect with mentors and peers
- **Profile**: View achievements and progress

### Social Media Integration
1. Navigate to Account Settings > Linked Accounts
2. Select platforms to connect (Instagram, TikTok, etc.)
3. Authorize the app through OAuth
4. Customize content preferences and interaction settings

### AI Assistance
1. Complete the initial skill assessment
2. Review personalized learning path recommendations
3. Accept or modify suggested tasks and projects
4. Track progress and receive adaptive recommendations

### Productivity Tools
1. **To-Do List**: Create, prioritize, and complete tasks
2. **Projects**: Set up projects with milestones and deadlines
3. **Pomodoro Timer**: Start focus sessions with customizable durations
4. **Habit Tracker**: Create habits and maintain streaks

### Community Features
1. Update profile with skills and learning goals
2. Search for mentors or peers with similar interests
3. Join voice rooms for discussions
4. Send direct messages or create group chats

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register`: Create new user account
- `POST /api/auth/login`: Authenticate user and receive JWT
- `GET /api/auth/me`: Get current user profile
- `PUT /api/auth/me`: Update user profile
- `PUT /api/auth/password`: Update password

### Social Media Endpoints
- `GET /api/social/feed`: Get unified social media feed
- `GET /api/social/posts`: Get posts from all platforms
- `GET /api/social/reels`: Get reels/videos from all platforms
- `GET /api/social/threads`: Get threads/discussions from all platforms
- `POST /api/social/like/:id`: Like content on original platform
- `POST /api/social/comment/:id`: Comment on content
- `POST /api/social/save/:id`: Save content for later

### Todo Endpoints
- `GET /api/todos`: Get all todos for current user
- `GET /api/todos/:id`: Get specific todo
- `POST /api/todos`: Create new todo
- `PUT /api/todos/:id`: Update todo
- `DELETE /api/todos/:id`: Delete todo
- `POST /api/todos/optimize`: Get AI optimization suggestions

### Project Endpoints
- `GET /api/projects`: Get all projects for current user
- `GET /api/projects/:id`: Get specific project
- `POST /api/projects`: Create new project
- `PUT /api/projects/:id`: Update project
- `DELETE /api/projects/:id`: Delete project
- `POST /api/projects/:id/milestones`: Add milestone to project
- `PUT /api/projects/:id/milestones/:milestoneId`: Update milestone
- `DELETE /api/projects/:id/milestones/:milestoneId`: Delete milestone

### AI Assistance Endpoints
- `GET /api/ai/suggestions`: Get personalized suggestions
- `GET /api/ai/learning-paths`: Get recommended learning paths
- `POST /api/ai/optimize-todo`: Optimize todo list
- `POST /api/ai/analyze-progress`: Analyze learning progress

### Community Endpoints
- `GET /api/profile/:username`: Get user profile
- `GET /api/profile/mentors`: Find mentors by criteria
- `GET /api/profile/peers`: Find peers with similar interests
- `POST /api/messages`: Send direct message
- `GET /api/messages`: Get conversation history
- `POST /api/chatrooms`: Create group chat
- `GET /api/chatrooms`: Get user's chat rooms
- `POST /api/chatrooms/:id/messages`: Send message to chat room

### Gamification Endpoints
- `GET /api/gamification/profile`: Get user's gamification profile
- `GET /api/gamification/badges`: Get all available badges
- `GET /api/gamification/achievements`: Get all achievements
- `PUT /api/gamification/achievements/:id/progress`: Update achievement progress
- `GET /api/gamification/leaderboard`: Get global leaderboard

## Development Guide

### Project Structure
```
mentor-app/
├── client/
│   ├── mobile/       # React Native mobile app
│   ├── web/          # React.js web app
│   └── shared/       # Shared components and utilities
├── server/           # Express.js backend
│   ├── config/       # Configuration files
│   ├── controllers/  # Route handlers
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Custom middleware
│   └── utils/        # Utility functions
└── ai-services/      # AI recommendation services
```

### Adding New Features
1. Create backend models and controllers
2. Add API routes
3. Implement frontend components
4. Add Redux actions and reducers
5. Write tests for new functionality
6. Update documentation

### Code Style
- Follow ESLint configuration
- Use Prettier for code formatting
- Write JSDoc comments for functions
- Follow component naming conventions

## Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client/web
npm test

# E2E tests
cd client
npx cypress run
```

### Test Coverage
- Unit tests for all API endpoints
- Component tests for UI elements
- E2E tests for critical user flows
- Integration tests for third-party services

## Deployment

See the [Deployment Guide](./deployment-guide.md) for detailed instructions on deploying the application to production environments.

## Troubleshooting

### Common Issues

#### Authentication Problems
- Verify JWT secret is correctly set
- Check token expiration settings
- Ensure correct credentials are being used

#### Social Media Integration Issues
- Verify OAuth configuration
- Check API rate limits
- Ensure required permissions are granted

#### Performance Issues
- Monitor database query performance
- Check for memory leaks in frontend
- Optimize API response sizes

### Getting Help
For additional support, please create an issue in the GitHub repository or contact the development team.

---

© 2025 Mentor App. All rights reserved.
