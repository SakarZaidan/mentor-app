import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveAiSuggestions, applyAiSuggestion } from '../../shared/redux/slices/todoSlice';

// This component displays AI-optimized suggestions for the user's to-do list
const AiTodoOptimizer = () => {
  const dispatch = useDispatch();
  const { todos, aiSuggestions } = useSelector(state => state.todo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to request AI optimization
  const requestOptimization = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI suggestions
      const mockSuggestions = [
        {
          id: '1',
          todoId: '1',
          suggestion: "Consider breaking this task into smaller subtasks for better progress tracking",
          changes: {
            title: "Refactor authentication module - Split into smaller tasks",
            priority: "high"
          }
        },
        {
          id: '2',
          todoId: '2',
          suggestion: "This task seems high priority based on your goals and upcoming deadlines",
          changes: {
            priority: "high"
          }
        },
        {
          id: '3',
          todoId: '3',
          suggestion: "This task could be scheduled for later as it's not aligned with your current focus areas",
          changes: {
            priority: "low",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
          }
        }
      ];
      
      dispatch(receiveAiSuggestions(mockSuggestions));
    } catch (err) {
      setError('Failed to get AI suggestions. Please try again.');
      console.error('AI optimization error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to apply an AI suggestion
  const applySuggestion = (suggestionId, todoId) => {
    dispatch(applyAiSuggestion({ suggestionId, todoId }));
  };
  
  return (
    <div className="ai-optimizer-container">
      <div className="ai-optimizer-header">
        <h2>AI To-Do Optimization</h2>
        <p>Let AI help you optimize your to-do list for better productivity</p>
        
        <button 
          className="optimize-button"
          onClick={requestOptimization}
          disabled={loading || todos.length === 0}
        >
          {loading ? 'Analyzing your tasks...' : 'Optimize My Tasks'}
        </button>
      </div>
      
      {error && (
        <div className="ai-optimizer-error">
          {error}
        </div>
      )}
      
      {aiSuggestions.length > 0 ? (
        <div className="ai-suggestions-list">
          <h3>Suggested Optimizations</h3>
          
          {aiSuggestions.map(suggestion => {
            // Find the corresponding todo
            const todo = todos.find(t => t.id === suggestion.todoId);
            
            return (
              <div key={suggestion.id} className="ai-suggestion-card">
                <div className="suggestion-task">
                  <strong>Task:</strong> {todo ? todo.title : 'Unknown task'}
                </div>
                
                <div className="suggestion-content">
                  <p>{suggestion.suggestion}</p>
                  
                  <div className="suggestion-changes">
                    <strong>Suggested Changes:</strong>
                    <ul>
                      {suggestion.changes.title && (
                        <li>Title: {suggestion.changes.title}</li>
                      )}
                      {suggestion.changes.priority && (
                        <li>Priority: {suggestion.changes.priority}</li>
                      )}
                      {suggestion.changes.dueDate && (
                        <li>Due Date: {new Date(suggestion.changes.dueDate).toLocaleDateString()}</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="suggestion-actions">
                  <button 
                    className="apply-button"
                    onClick={() => applySuggestion(suggestion.id, suggestion.todoId)}
                  >
                    Apply Suggestion
                  </button>
                  <button className="dismiss-button">
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="ai-suggestions-empty">
            <p>No suggestions available. Click "Optimize My Tasks" to get AI recommendations.</p>
          </div>
        )
      )}
      
      <div className="ai-optimizer-info">
        <h3>How AI Optimization Works</h3>
        <p>
          Our AI analyzes your tasks, priorities, deadlines, and past completion patterns
          to suggest optimizations that can help you be more productive and focused.
        </p>
        <ul>
          <li>Prioritize tasks based on your goals and deadlines</li>
          <li>Break down complex tasks into manageable steps</li>
          <li>Identify tasks that can be delegated or postponed</li>
          <li>Suggest realistic deadlines based on your schedule</li>
        </ul>
      </div>
    </div>
  );
};

export default AiTodoOptimizer;
