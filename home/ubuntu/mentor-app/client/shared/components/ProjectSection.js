import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the Project section with milestones
const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  
  // Local state for new project form
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    collaborators: '',
    milestones: []
  });
  
  // Local state for new milestone form
  const [showNewMilestoneForm, setShowNewMilestoneForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });
  
  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock projects
        const mockProjects = [
          {
            id: '1',
            title: 'Mentor App Development',
            description: 'Develop a comprehensive app to help users master hobbies, skills, and interests',
            startDate: '2025-03-15',
            endDate: '2025-04-15',
            progress: 65,
            collaborators: ['john@example.com', 'sarah@example.com'],
            milestones: [
              {
                id: 'm1',
                title: 'Project Setup',
                description: 'Set up project structure and environments',
                dueDate: '2025-03-18',
                completed: true
              },
              {
                id: 'm2',
                title: 'Authentication System',
                description: 'Implement user authentication and authorization',
                dueDate: '2025-03-22',
                completed: true
              },
              {
                id: 'm3',
                title: 'Social Media Integration',
                description: 'Develop unified feed and platform connections',
                dueDate: '2025-03-25',
                completed: true
              },
              {
                id: 'm4',
                title: 'AI Assistance Features',
                description: 'Implement personalized suggestions and learning paths',
                dueDate: '2025-03-30',
                completed: false
              },
              {
                id: 'm5',
                title: 'Productivity Tools',
                description: 'Build to-do list, project section, and Pomodoro timer',
                dueDate: '2025-04-05',
                completed: false
              },
              {
                id: 'm6',
                title: 'Community Features',
                description: 'Implement messaging and voice rooms',
                dueDate: '2025-04-10',
                completed: false
              },
              {
                id: 'm7',
                title: 'Testing and Deployment',
                description: 'Conduct testing and deploy to production',
                dueDate: '2025-04-15',
                completed: false
              }
            ]
          },
          {
            id: '2',
            title: 'Personal Portfolio Website',
            description: 'Create a showcase for skills and projects',
            startDate: '2025-04-01',
            endDate: '2025-04-15',
            progress: 25,
            collaborators: [],
            milestones: [
              {
                id: 'm1',
                title: 'Design Mockups',
                description: 'Create design mockups for website',
                dueDate: '2025-04-05',
                completed: true
              },
              {
                id: 'm2',
                title: 'Frontend Development',
                description: 'Implement frontend with React',
                dueDate: '2025-04-10',
                completed: false
              },
              {
                id: 'm3',
                title: 'Content Creation',
                description: 'Create content for portfolio sections',
                dueDate: '2025-04-12',
                completed: false
              },
              {
                id: 'm4',
                title: 'Deployment',
                description: 'Deploy website to hosting platform',
                dueDate: '2025-04-15',
                completed: false
              }
            ]
          }
        ];
        
        setProjects(mockProjects);
        
        // Set first project as active if available
        if (mockProjects.length > 0) {
          setActiveProject(mockProjects[0]);
        }
      } catch (err) {
        setError('Failed to load projects. Please try again.');
        console.error('Fetch projects error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Calculate project progress based on completed milestones
  const calculateProgress = (milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    
    const completedCount = milestones.filter(m => m.completed).length;
    return Math.round((completedCount / milestones.length) * 100);
  };
  
  // Handle input change for new project form
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };
  
  // Handle input change for new milestone form
  const handleMilestoneInputChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone({
      ...newMilestone,
      [name]: value
    });
  };
  
  // Handle form submission for new project
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newProject.title.trim()) {
      alert('Please enter a title for the project');
      return;
    }
    
    // Create new project object
    const projectToAdd = {
      id: Date.now().toString(),
      ...newProject,
      progress: 0,
      collaborators: newProject.collaborators ? 
        newProject.collaborators.split(',').map(email => email.trim()) : [],
      milestones: []
    };
    
    // Add project to state
    setProjects([...projects, projectToAdd]);
    
    // Set as active project
    setActiveProject(projectToAdd);
    
    // Reset form and hide it
    setNewProject({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      collaborators: '',
      milestones: []
    });
    setShowNewProjectForm(false);
  };
  
  // Handle form submission for new milestone
  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newMilestone.title.trim()) {
      alert('Please enter a title for the milestone');
      return;
    }
    
    // Create new milestone object
    const milestoneToAdd = {
      id: `m${Date.now()}`,
      ...newMilestone
    };
    
    // Add milestone to active project
    const updatedProject = {
      ...activeProject,
      milestones: [...activeProject.milestones, milestoneToAdd]
    };
    
    // Update progress
    updatedProject.progress = calculateProgress(updatedProject.milestones);
    
    // Update projects state
    const updatedProjects = projects.map(p => 
      p.id === activeProject.id ? updatedProject : p
    );
    
    setProjects(updatedProjects);
    setActiveProject(updatedProject);
    
    // Reset form and hide it
    setNewMilestone({
      title: '',
      description: '',
      dueDate: '',
      completed: false
    });
    setShowNewMilestoneForm(false);
  };
  
  // Toggle milestone completion status
  const toggleMilestoneComplete = (milestoneId) => {
    // Find and update the milestone
    const updatedMilestones = activeProject.milestones.map(milestone => 
      milestone.id === milestoneId ? 
        { ...milestone, completed: !milestone.completed } : 
        milestone
    );
    
    // Update active project
    const updatedProject = {
      ...activeProject,
      milestones: updatedMilestones,
      progress: calculateProgress(updatedMilestones)
    };
    
    // Update projects state
    const updatedProjects = projects.map(p => 
      p.id === activeProject.id ? updatedProject : p
    );
    
    setProjects(updatedProjects);
    setActiveProject(updatedProject);
  };
  
  // Delete a milestone
  const deleteMilestone = (milestoneId) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      // Filter out the milestone
      const updatedMilestones = activeProject.milestones.filter(
        milestone => milestone.id !== milestoneId
      );
      
      // Update active project
      const updatedProject = {
        ...activeProject,
        milestones: updatedMilestones,
        progress: calculateProgress(updatedMilestones)
      };
      
      // Update projects state
      const updatedProjects = projects.map(p => 
        p.id === activeProject.id ? updatedProject : p
      );
      
      setProjects(updatedProjects);
      setActiveProject(updatedProject);
    }
  };
  
  // Delete a project
  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      // Filter out the project
      const updatedProjects = projects.filter(p => p.id !== projectId);
      
      setProjects(updatedProjects);
      
      // Update active project if needed
      if (activeProject && activeProject.id === projectId) {
        setActiveProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
      }
    }
  };
  
  // Render loading state
  if (loading && projects.length === 0) {
    return <div className="projects-loading">Loading your projects...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="projects-error">Error: {error}</div>;
  }
  
  return (
    <div className="project-section-container">
      <div className="project-section-header">
        <h2>Projects</h2>
        <button 
          className="new-project-button"
          onClick={() => setShowNewProjectForm(true)}
        >
          New Project
        </button>
      </div>
      
      {showNewProjectForm && (
        <div className="new-project-form-container">
          <h3>Create New Project</h3>
          <form onSubmit={handleProjectSubmit}>
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newProject.title}
                onChange={handleProjectInputChange}
                placeholder="Enter project title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleProjectInputChange}
                placeholder="Describe your project"
                rows="3"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleProjectInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleProjectInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="collaborators">Collaborators (comma-separated emails)</label>
              <input
                type="text"
                id="collaborators"
                name="collaborators"
                value={newProject.collaborators}
                onChange={handleProjectInputChange}
                placeholder="e.g., john@example.com, sarah@example.com"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="create-project-button">
                Create Project
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowNewProjectForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="project-section-content">
        {projects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects yet. Click "New Project" to create one.</p>
          </div>
        ) : (
          <div className="project-layout">
            <div className="project-list">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  className={`project-list-item ${activeProject && activeProject.id === project.id ? 'active' : ''}`}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="project-list-item-header">
                    <h3>{project.title}</h3>
                    <button 
                      className="delete-project-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}% Complete</span>
                  </div>
                  
                  <div className="project-dates">
                    {project.startDate && project.endDate && (
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {activeProject && (
              <div className="project-details">
                <div className="project-details-header">
                  <h3>{activeProject.title}</h3>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${activeProject.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{activeProject.progress}% Complete</span>
                  </div>
                </div>
                
                <div className="project-details-content">
                  {activeP<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>