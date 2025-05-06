import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTodosStart, 
  fetchTodosSuccess, 
  fetchTodosFailure,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  setFilter
} from '../../shared/redux/slices/todoSlice';

// This component implements the to-do list functionality
const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, filter } = useSelector(state => state.todo);
  
  // Local state for new todo form
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  // Local state for editing
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch(fetchTodosStart());
        
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock todos
        const mockTodos = [
          {
            id: '1',
            title: 'Complete authentication system',
            description: 'Implement JWT authentication with Passport.js',
            completed: true,
            priority: 'high',
            dueDate: '2025-03-20',
            tags: ['backend', 'security']
          },
          {
            id: '2',
            title: 'Develop social media integration',
            description: 'Create unified feed for Instagram, TikTok, and Reddit',
            completed: true,
            priority: 'medium',
            dueDate: '2025-03-22',
            tags: ['frontend', 'api']
          },
          {
            id: '3',
            title: 'Implement AI assistance features',
            description: 'Add personalized suggestions and learning paths',
            completed: false,
            priority: 'high',
            dueDate: '2025-03-25',
            tags: ['ai', 'backend']
          },
          {
            id: '4',
            title: 'Build productivity tools',
            description: 'Create to-do list, project section, and Pomodoro timer',
            completed: false,
            priority: 'medium',
            dueDate: '2025-03-28',
            tags: ['frontend', 'ui']
          }
        ];
        
        dispatch(fetchTodosSuccess(mockTodos));
      } catch (err) {
        dispatch(fetchTodosFailure(err.message));
      }
    };
    
    fetchTodos();
  }, [dispatch]);
  
  // Handle input change for new todo form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };
  
  // Handle input change for edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Handle form submission for new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newTodo.title.trim()) {
      alert('Please enter a title for the todo');
      return;
    }
    
    // Create new todo object
    const todoToAdd = {
      id: Date.now().toString(),
      ...newTodo,
      completed: false,
      tags: newTodo.tags ? newTodo.tags.split(',').map(tag => tag.trim()) : []
    };
    
    // Add todo to state
    dispatch(addTodo(todoToAdd));
    
    // Reset form
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  };
  
  // Start editing a todo
  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate || ''
    });
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  };
  
  // Save edited todo
  const saveEditedTodo = (id) => {
    // Validate form
    if (!editFormData.title.trim()) {
      alert('Please enter a title for the todo');
      return;
    }
    
    // Create updated todo object
    const updatedTodo = {
      id,
      ...editFormData,
      tags: editFormData.tags ? editFormData.tags.split(',').map(tag => tag.trim()) : []
    };
    
    // Update todo in state
    dispatch(updateTodo({ id, updates: updatedTodo }));
    
    // Exit edit mode
    cancelEditing();
  };
  
  // Toggle todo completion status
  const toggleComplete = (id) => {
    dispatch(toggleTodoComplete(id));
  };
  
  // Delete a todo
  const removeTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(id));
    }
  };
  
  // Change filter
  const changeFilter = (newFilter) => {
    dispatch(setFilter(newFilter));
  };
  
  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });
  
  // Render loading state
  if (loading && todos.length === 0) {
    return <div className="todo-list-loading">Loading your tasks...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="todo-list-error">Error: {error}</div>;
  }
  
  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <h2>To-Do List</h2>
        <div className="todo-filters">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => changeFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => changeFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => changeFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="todo-form">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              placeholder="What needs to be done?"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              placeholder="Add details (optional)"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newTodo.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTodo.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={newTodo.tags}
              onChange={handleInputChange}
              placeholder="e.g., work, personal, urgent"
            />
          </div>
          
          <button type="submit" className="add-todo-button">
            Add Task
          </button>
        </form>
      </div>
      
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="todo-list-empty">
            {filter === 'all' ? 'No tasks yet. Add one above!' : 
             filter === 'active' ? 'No active tasks. Great job!' : 
             'No completed tasks yet.'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              {editingTodoId === todo.id ? (
                <div className="todo-edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-title">Title</label>
                    <input
                      type="text"
                      id="edit-title"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-description">Description</label>
                    <textarea
                      id="edit-description"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="edit-priority">Priority</label>
                      <select
                        id="edit-priority"
                        name="priority"
                        value={editFormData.priority}
                        onChange={handleEditInputChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="edit-dueDate">Due Date</label>
                      <input
                        type="date"
                        id="edit-dueDate"
                        name="dueDate"
                        value={editFormData.dueDate}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="edit-actions">
                    <button 
                      className="save-button"
                      onClick={() => saveEditedTodo(todo.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-checkbox">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                  </div>
                  
                  <div className="todo-content">
                    <div className="todo-header">
                      <h4 className="todo-title">{todo.title}</h4>
                      <span className={`todo-priority priority-${todo.priority}`}>
                        {todo.priority}
                      </span>
                    </div>
                    
                    {todo.description && (
                      <p className="todo-description">{todo.description}</p>
                    )}
                    
                    <div className="todo-meta">
                      {todo.dueDate && (
                        <span className="todo-due-date">
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      
                      {todo.tags && todo.tags.length > 0 && (
                        <div className="todo-tags">
                          {todo.tags.map((tag, index) => (
                            <span key={index} className="todo-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="todo-actions">
                    <button 
                      className="edit-button"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
