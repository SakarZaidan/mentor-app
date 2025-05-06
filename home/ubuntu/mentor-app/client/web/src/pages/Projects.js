import React, { useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'A showcase of my work and skills using React and Tailwind',
      progress: 75,
      status: 'in-progress',
      dueDate: '2025-07-01',
      tags: ['react', 'frontend', 'portfolio'],
      tasks: [
        { id: 1, title: 'Design Homepage', completed: true },
        { id: 2, title: 'Implement Projects Section', completed: true },
        { id: 3, title: 'Add Contact Form', completed: false },
        { id: 4, title: 'Optimize Performance', completed: false }
      ]
    },
    {
      id: 2,
      title: 'E-commerce Dashboard',
      description: 'Admin dashboard for managing products and orders',
      progress: 30,
      status: 'in-progress',
      dueDate: '2025-08-15',
      tags: ['dashboard', 'fullstack', 'commerce'],
      tasks: [
        { id: 1, title: 'User Authentication', completed: true },
        { id: 2, title: 'Product Management', completed: false },
        { id: 3, title: 'Order Processing', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Real-time weather forecasting application',
      progress: 100,
      status: 'completed',
      dueDate: '2025-05-30',
      tags: ['api', 'weather', 'react'],
      tasks: [
        { id: 1, title: 'API Integration', completed: true },
        { id: 2, title: 'Location Services', completed: true },
        { id: 3, title: 'Weather Alerts', completed: true }
      ]
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    dueDate: '',
    tags: []
  });

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'completed') return project.status === 'completed';
    if (filter === 'in-progress') return project.status === 'in-progress';
    return true;
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    // Add new project logic
    setShowNewProjectModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your projects and milestones</p>
          </div>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            New Project
          </button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Projects</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{projects.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {projects.filter(p => p.status === 'in-progress').length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Completed</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {projects.filter(p => p.status === 'completed').length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Average Progress</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length)}%
          </p>
        </div>
      </div>

      {/* Filters and Project List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'in-progress'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-600 dark:text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  {project.tasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className={task.completed ? 'line-through text-gray-400' : ''}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                  <div className="space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Project</h2>
            <form onSubmit={handleAddProject}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
