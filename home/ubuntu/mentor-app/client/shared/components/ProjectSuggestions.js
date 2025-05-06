import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component displays AI-generated project suggestions
const ProjectSuggestions = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Function to fetch project suggestions
  const fetchProjectSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock project suggestions
      const mockProjects = [
        {
          id: '1',
          title: 'Personal Portfolio Website',
          description: 'Create a showcase for your skills and projects',
          skills: ['HTML', 'CSS', 'JavaScript', 'React'],
          difficulty: 'Beginner',
          estimatedTime: '2 weeks',
          steps: [
            'Design website layout and sections',
            'Set up React project structure',
            'Implement responsive design',
            'Add portfolio projects and descriptions',
            'Deploy to hosting platform'
          ]
        },
        {
          id: '2',
          title: 'Social Media Dashboard',
          description: 'Build a dashboard to track and analyze social media metrics',
          skills: ['React', 'Chart.js', 'API Integration'],
          difficulty: 'Intermediate',
          estimatedTime: '3 weeks',
          steps: [
            'Design dashboard layout',
            'Implement authentication',
            'Connect to social media APIs',
            'Create data visualization components',
            'Add filtering and reporting features'
          ]
        },
        {
          id: '3',
          title: 'Mobile Task Manager',
          description: 'Develop a cross-platform mobile app for task management',
          skills: ['React Native', 'Redux', 'Firebase'],
          difficulty: 'Intermediate',
          estimatedTime: '4 weeks',
          steps: [
            'Design app UI/UX',
            'Set up React Native project',
            'Implement task CRUD operations',
            'Add user authentication',
            'Implement notifications and reminders',
            'Deploy to app stores'
          ]
        }
      ];
      
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to get project suggestions. Please try again.');
      console.error('Project suggestions error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch project suggestions on component mount
  useEffect(() => {
    fetchProjectSuggestions();
  }, []);
  
  // Function to view a project's details
  const viewProjectDetails = (project) => {
    setSelectedProject(project);
  };
  
  // Function to add a project to user's projects
  const addToMyProjects = (projectId) => {
    // In a real implementation, this would call the backend API
    // For now, we'll just show an alert
    alert(`Project ${projectId} added to your projects!`);
  };
  
  // Render loading state
  if (loading && projects.length === 0) {
    return <div className="projects-loading">Analyzing your skills and generating personalized project ideas...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="projects-error">Error: {error}</div>;
  }
  
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>AI Project Suggestions</h2>
        <p>Personalized project ideas to help you apply and enhance your skills</p>
        
        <button 
          className="refresh-button"
          onClick={fetchProjectSuggestions}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Suggestions'}
        </button>
      </div>
      
      {selectedProject ? (
        <div className="project-details">
          <button 
            className="back-button"
            onClick={() => setSelectedProject(null)}
          >
            Back to All Projects
          </button>
          
          <div className="project-header">
            <h3>{selectedProject.title}</h3>
            <div className="project-meta">
              <span className="project-difficulty">{selectedProject.difficulty}</span>
              <span className="project-time">{selectedProject.estimatedTime}</span>
            </div>
          </div>
          
          <p className="project-description">{selectedProject.description}</p>
          
          <div className="project-skills">
            <h4>Skills You'll Use</h4>
            <div className="skills-list">
              {selectedProject.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="project-steps">
            <h4>Implementation Steps</h4>
            <ol className="steps-list">
              {selectedProject.steps.map((step, index) => (
                <li key={index} className="step-item">{step}</li>
              ))}
            </ol>
          </div>
          
          <button 
            className="add-project-button"
            onClick={() => addToMyProjects(selectedProject.id)}
          >
            Add to My Projects
          </button>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-meta">
                  <span className="project-difficulty">{project.difficulty}</span>
                  <span className="project-time">{project.estimatedTime}</span>
                </div>
                
                <div className="project-skills">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-card-actions">
                <button 
                  className="view-details-button"
                  onClick={() => viewProjectDetails(project)}
                >
                  View Details
                </button>
                <button 
                  className="add-project-button"
                  onClick={() => addToMyProjects(project.id)}
                >
                  Add to My Projects
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSuggestions;
