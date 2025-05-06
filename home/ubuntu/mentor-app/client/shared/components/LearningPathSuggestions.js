import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component displays personalized learning path suggestions
const LearningPathSuggestions = () => {
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  
  // Function to fetch learning path suggestions
  const fetchLearningPaths = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock learning path suggestions
      const mockPaths = [
        {
          id: '1',
          title: 'Web Development Mastery',
          description: 'A comprehensive path to master modern web development',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          estimatedTime: '3 months',
          difficulty: 'Intermediate',
          steps: [
            {
              title: 'JavaScript Fundamentals',
              resources: [
                { type: 'course', title: 'Modern JavaScript', url: 'https://example.com/js-course' },
                { type: 'book', title: 'Eloquent JavaScript', url: 'https://example.com/js-book' }
              ]
            },
            {
              title: 'React Essentials',
              resources: [
                { type: 'tutorial', title: 'React Crash Course', url: 'https://example.com/react-tutorial' },
                { type: 'project', title: 'Build a Todo App', url: 'https://example.com/react-project' }
              ]
            }
          ]
        },
        {
          id: '2',
          title: 'Mobile App Development',
          description: 'Learn to build cross-platform mobile apps with React Native',
          skills: ['JavaScript', 'React Native', 'Redux', 'Firebase'],
          estimatedTime: '2 months',
          difficulty: 'Intermediate',
          steps: [
            {
              title: 'React Native Basics',
              resources: [
                { type: 'course', title: 'React Native for Beginners', url: 'https://example.com/rn-course' },
                { type: 'documentation', title: 'Official Docs', url: 'https://example.com/rn-docs' }
              ]
            },
            {
              title: 'State Management with Redux',
              resources: [
                { type: 'tutorial', title: 'Redux in React Native', url: 'https://example.com/redux-tutorial' },
                { type: 'project', title: 'Build a Shopping App', url: 'https://example.com/rn-project' }
              ]
            }
          ]
        },
        {
          id: '3',
          title: 'Data Visualization',
          description: 'Master the art of creating compelling data visualizations',
          skills: ['D3.js', 'SVG', 'Chart.js', 'Data Analysis'],
          estimatedTime: '6 weeks',
          difficulty: 'Intermediate',
          steps: [
            {
              title: 'Fundamentals of Data Visualization',
              resources: [
                { type: 'course', title: 'Data Viz Principles', url: 'https://example.com/dataviz-course' },
                { type: 'book', title: 'Storytelling with Data', url: 'https://example.com/dataviz-book' }
              ]
            },
            {
              title: 'Interactive Visualizations with D3.js',
              resources: [
                { type: 'tutorial', title: 'D3.js Essentials', url: 'https://example.com/d3-tutorial' },
                { type: 'project', title: 'Build a Dashboard', url: 'https://example.com/d3-project' }
              ]
            }
          ]
        }
      ];
      
      setLearningPaths(mockPaths);
    } catch (err) {
      setError('Failed to get learning path suggestions. Please try again.');
      console.error('Learning paths error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch learning paths on component mount
  useEffect(() => {
    fetchLearningPaths();
  }, []);
  
  // Function to view a learning path's details
  const viewPathDetails = (path) => {
    setSelectedPath(path);
  };
  
  // Function to add a learning path to user's active paths
  const addToMyPaths = (pathId) => {
    // In a real implementation, this would call the backend API
    // For now, we'll just show an alert
    alert(`Learning path ${pathId} added to your active paths!`);
  };
  
  // Render loading state
  if (loading && learningPaths.length === 0) {
    return <div className="learning-paths-loading">Analyzing your interests and generating personalized learning paths...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="learning-paths-error">Error: {error}</div>;
  }
  
  return (
    <div className="learning-paths-container">
      <div className="learning-paths-header">
        <h2>Personalized Learning Paths</h2>
        <p>AI-generated learning paths based on your interests and goals</p>
        
        <button 
          className="refresh-button"
          onClick={fetchLearningPaths}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Suggestions'}
        </button>
      </div>
      
      {selectedPath ? (
        <div className="learning-path-details">
          <button 
            className="back-button"
            onClick={() => setSelectedPath(null)}
          >
            Back to All Paths
          </button>
          
          <div className="path-header">
            <h3>{selectedPath.title}</h3>
            <div className="path-meta">
              <span className="path-difficulty">{selectedPath.difficulty}</span>
              <span className="path-time">{selectedPath.estimatedTime}</span>
            </div>
          </div>
          
          <p className="path-description">{selectedPath.description}</p>
          
          <div className="path-skills">
            <h4>Skills You'll Learn</h4>
            <div className="skills-list">
              {selectedPath.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="path-steps">
            <h4>Learning Steps</h4>
            {selectedPath.steps.map((step, index) => (
              <div key={index} className="path-step">
                <h5>{index + 1}. {step.title}</h5>
                <div className="step-resources">
                  {step.resources.map((resource, resIndex) => (
                    <div key={resIndex} className="resource-item">
                      <span className={`resource-type resource-type-${resource.type}`}>
                        {resource.type}
                      </span>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="add-path-button"
            onClick={() => addToMyPaths(selectedPath.id)}
          >
            Add to My Learning Paths
          </button>
        </div>
      ) : (
        <div className="learning-paths-list">
          {learningPaths.map(path => (
            <div key={path.id} className="learning-path-card">
              <div className="path-card-content">
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                
                <div className="path-meta">
                  <span className="path-difficulty">{path.difficulty}</span>
                  <span className="path-time">{path.estimatedTime}</span>
                </div>
                
                <div className="path-skills">
                  {path.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="path-card-actions">
                <button 
                  className="view-details-button"
                  onClick={() => viewPathDetails(path)}
                >
                  View Details
                </button>
                <button 
                  className="add-path-button"
                  onClick={() => addToMyPaths(path.id)}
                >
                  Add to My Paths
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathSuggestions;
