import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const TodoList = () => {
  const { showSuccess, showError } = useNotification();

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete React Tutorial',
      description: 'Work through the advanced React concepts and hooks',
      completed: false,
      priority: 'High',
      category: 'Learning',
      dueDate: '2025-06-15',
      estimatedTime: '2 hours',
      subtasks: [
        { id: 1, title: 'Context API', completed: true },
        { id: 2, title: 'Custom Hooks', completed: false },
        { id: 3, title: 'Performance Optimization', completed: false }
      ],
      tags: ['react', 'frontend', 'tutorial']
    },
    {
      id: 2,
      title: 'Review Project Feedback',
      description: 'Go through the feedback from the team and make necessary adjustments',
      completed: true,
      priority: 'Medium',
      category: 'Project',
      dueDate: '2025-06-10',
      estimatedTime: '1 hour',
      subtasks: [
        { id: 1, title: 'Code Review Comments', completed: true },
        { id: 2, title: 'UI/UX Feedback', completed: true }
      ],
      tags: ['review', 'feedback']
    },
    {
      id: 3,
      title: 'Prepare for Team Meeting',
      description: 'Create agenda and gather progress updates',
      completed: false,
      priority: 'High',
      category: 'Work',
      dueDate: '2025-06-12',
      estimatedTime: '30 minutes',
      subtasks: [
        { id: 1, title: 'Prepare Slides', completed: false },
        { id: 2, title: 'Gather Metrics', completed: true }
      ],
      tags: ['meeting', 'presentation']
    }
  ]);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'General',
    dueDate: '',
    estimatedTime: '',
    tags: []
  });

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dueDate'); // dueDate, priority, category
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [aiSuggestion, setAiSuggestion] = useState({
    visible: false,
    message: "I noticed you're adding several learning tasks. Would you like me to help create a structured learning path?",
    action: "Create Learning Path"
  });

  const categories = ['General', 'Learning', 'Work', 'Project', 'Personal'];
  const priorities = ['Low', 'Medium', 'High'];

  const handleAddTodo = (e) => {
    e.preventDefault();
    try {
      const newTask = {
        id: Date.now(),
        ...newTodo,
        completed: false,
        subtasks: [],
        tags: newTodo.tags.split(',').map(tag => tag.trim())
      };
      
      setTodos([...todos, newTask]);
      setNewTodo({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'General',
        dueDate: '',
        estimatedTime: '',
        tags: []
      });
      setShowNewTodoModal(false);

      showSuccess('Task added successfully!');

      // Show AI suggestion if adding a learning task
      if (newTask.category === 'Learning') {
        setTimeout(() => {
          setAiSuggestion({
            visible: true,
            message: "I noticed you're adding learning tasks. Would you like me to suggest a structured learning path?",
            action: "Create Learning Path"
          });
        }, 1000);
      }
    } catch (error) {
      showError('Failed to add task. Please try again.');
    }
  };

  const handleToggleComplete = (todoId) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleToggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )
        };
      }
      return todo;
    }));
  };

  const handleDeleteTodo = (todoId) => {
    try {
      setTodos(todos.filter(todo => todo.id !== todoId));
      showSuccess('Task deleted successfully!');
    } catch (error) {
      showError('Failed to delete task. Please try again.');
    }
  };

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setShowNewTodoModal(true);
  };

  const filteredTodos = todos.filter(todo => {
    if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'high') return todo.priority === 'High';
    return true;
  }).sort((a, b) => {
    if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === 'priority') {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sort === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Todo List</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your tasks and get AI suggestions</p>
          </div>
          <button
            onClick={() => setShowNewTodoModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Suggestion */}
      {aiSuggestion.visible && (
        <div className="bg-indigo-50 dark:bg-indigo-900 border-l-4 border-indigo-500 p-4 rounded flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <p className="text-indigo-700 dark:text-indigo-200">{aiSuggestion.message}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAIModal(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              {aiSuggestion.action}
            </button>
            <button
              onClick={() => setAiSuggestion({ ...aiSuggestion, visible: false })}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${
              todo.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <div>
                  <h3 className={`text-lg font-medium ${
                    todo.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {todo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{todo.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {todo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Subtasks */}
                  {todo.subtasks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {todo.subtasks.map(subtask => (
                        <div key={subtask.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => handleToggleSubtask(todo.id, subtask.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className={`text-sm ${
                            subtask.completed
                              ? 'line-through text-gray-500 dark:text-gray-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Est: {todo.estimatedTime}
                </span>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New/Edit Todo Modal */}
      {showNewTodoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedTodo ? 'Edit Task' : 'New Task'}
            </h2>
            <form onSubmit={handleAddTodo}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedTodo ? selectedTodo.title : newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={selectedTodo ? selectedTodo.description : newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={selectedTodo ? selectedTodo.priority : newTodo.priority}
                      onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedTodo ? selectedTodo.category : newTodo.category}
                      onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={selectedTodo ? selectedTodo.dueDate : newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      value={selectedTodo ? selectedTodo.estimatedTime : newTodo.estimatedTime}
                      onChange={(e) => setNewTodo({ ...newTodo, estimatedTime: e.target.value })}
                      placeholder="e.g., 2 hours"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={selectedTodo ? selectedTodo.tags.join(', ') : newTodo.tags}
                    onChange={(e) => setNewTodo({ ...newTodo, tags: e.target.value })}
                    placeholder="e.g., work, urgent, meeting"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewTodoModal(false);
                    setSelectedTodo(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {selectedTodo ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Optimization Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Task Optimization</h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Based on your learning goals and schedule, here's a suggested task breakdown:
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white">Week 1: Fundamentals</h3>
                  <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• React Basics (2 hours)</li>
                    <li>• Component Lifecycle (1.5 hours)</li>
                    <li>• State Management (2 hours)</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white">Week 2: Advanced Concepts</h3>
                  <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Hooks Deep Dive (3 hours)</li>
                    <li>• Context API (1.5 hours)</li>
                    <li>• Performance Optimization (2 hours)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    // Add suggested tasks to todo list
                    setShowAIModal(false);
                  }}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Suggested Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
