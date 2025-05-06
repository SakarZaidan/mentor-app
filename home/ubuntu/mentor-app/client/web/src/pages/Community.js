import React, { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'How to structure a React project?',
      author: 'Sarah Johnson',
      avatar: 'https://via.placeholder.com/40/6366F1/FFFFFF?text=SJ',
      content: 'I\'m starting a new React project and wondering about the best way to structure folders and files. What approaches have worked well for you?',
      tags: ['react', 'architecture', 'best-practices'],
      likes: 24,
      replies: 8,
      timestamp: '2 hours ago',
      pinned: true
    },
    {
      id: 2,
      title: 'Debugging techniques for Node.js applications',
      author: 'Michael Chen',
      avatar: 'https://via.placeholder.com/40/F43F5E/FFFFFF?text=MC',
      content: 'What are your favorite tools and techniques for debugging Node.js applications in production?',
      tags: ['node.js', 'debugging', 'production'],
      likes: 18,
      replies: 12,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox - when to use which?',
      author: 'Alex Rivera',
      avatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=AR',
      content: 'I\'m trying to understand the best use cases for CSS Grid versus Flexbox. Can anyone provide some clarity on when to use each?',
      tags: ['css', 'layout', 'frontend'],
      likes: 32,
      replies: 15,
      timestamp: '1 day ago'
    }
  ]);

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Dr. Emily Zhang',
      avatar: 'https://via.placeholder.com/60/6366F1/FFFFFF?text=EZ',
      title: 'Senior Software Architect',
      specialties: ['System Design', 'Cloud Architecture', 'Microservices'],
      rating: 4.9,
      reviews: 127,
      availability: 'Available next week',
      hourlyRate: 150,
      languages: ['English', 'Mandarin']
    },
    {
      id: 2,
      name: 'James Wilson',
      avatar: 'https://via.placeholder.com/60/F43F5E/FFFFFF?text=JW',
      title: 'Frontend Lead Developer',
      specialties: ['React', 'UI/UX', 'Performance Optimization'],
      rating: 4.8,
      reviews: 93,
      availability: 'Available tomorrow',
      hourlyRate: 120,
      languages: ['English', 'Spanish']
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      avatar: 'https://via.placeholder.com/60/10B981/FFFFFF?text=MR',
      title: 'Data Science Expert',
      specialties: ['Machine Learning', 'Python', 'Data Visualization'],
      rating: 4.7,
      reviews: 85,
      availability: 'Available today',
      hourlyRate: 135,
      languages: ['English', 'Spanish', 'Portuguese']
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2025-06-15T14:00:00',
      duration: '2 hours',
      host: 'TechLearn Community',
      attendees: 156,
      maxAttendees: 200,
      image: 'https://via.placeholder.com/300x150/6366F1/FFFFFF?text=Workshop',
      description: 'Learn modern web development practices and tools from industry experts.',
      topics: ['React', 'Node.js', 'GraphQL'],
      type: 'workshop',
      virtual: true,
      price: 'Free'
    },
    {
      id: 2,
      title: 'Career Fair: Tech Industry',
      date: '2025-06-22T10:00:00',
      duration: '5 hours',
      host: 'Tech Recruiters Network',
      attendees: 342,
      maxAttendees: 500,
      image: 'https://via.placeholder.com/300x150/F43F5E/FFFFFF?text=Career+Fair',
      description: 'Connect with top tech companies and explore career opportunities.',
      topics: ['Career Development', 'Networking', 'Job Search'],
      type: 'career-fair',
      virtual: false,
      location: 'Tech Hub, New York',
      price: '$10'
    },
    {
      id: 3,
      title: 'AI in Production: Panel Discussion',
      date: '2025-07-05T13:00:00',
      duration: '1.5 hours',
      host: 'AI Practitioners Group',
      attendees: 89,
      maxAttendees: 150,
      image: 'https://via.placeholder.com/300x150/10B981/FFFFFF?text=AI+Panel',
      description: 'Industry leaders discuss real-world AI implementation challenges and solutions.',
      topics: ['AI', 'Machine Learning', 'Production Systems'],
      type: 'panel',
      virtual: true,
      price: '$25'
    }
  ]);

  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    tags: []
  });

  const handleAddDiscussion = (e) => {
    e.preventDefault();
    // Add new discussion logic
    setShowNewDiscussionModal(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community</h1>
            <p className="text-gray-600 dark:text-gray-300">Connect with mentors and peers in your learning journey</p>
          </div>
          <button
            onClick={() => setShowNewDiscussionModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Start Discussion
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search discussions, mentors, or events..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Members</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">2,547</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Discussions</h3>
          <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">128</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Mentors</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">45</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Events</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">12</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {['discussions', 'mentors', 'events'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {discussions.map(discussion => (
                <div key={discussion.id} className={`p-6 rounded-lg ${
                  discussion.pinned ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800' : 'bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  {discussion.pinned && (
                    <div className="flex items-center mb-3 text-indigo-600 dark:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.6 3.6a1 1 0 011.8 0l1.8 3.6H17a1 1 0 01.6 1.8l-3 2.2 1.2 3.6a1 1 0 01-1.5 1.1L10 13.3 5.7 15.9a1 1 0 01-1.5-1.1l1.2-3.6-3-2.2A1 1 0 013 7.2h3.8l1.8-3.6z" />
                      </svg>
                      <span className="text-xs font-medium">Pinned Discussion</span>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <img src={discussion.avatar} alt={discussion.author} className="w-10 h-10 rounded-full mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{discussion.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Posted by {discussion.author} • {discussion.timestamp}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{discussion.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          {discussion.likes}
                        </button>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                          </svg>
                          {discussion.replies}
                        </button>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mentors Tab */}
          {activeTab === 'mentors' && (
            <div className="space-y-6">
              {mentors.map(mentor => (
                <div key={mentor.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <div className="flex items-start">
                    <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full mr-6" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{mentor.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500 mb-1">
                            <span className="mr-1">{mentor.rating}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.reviews} reviews</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.specialties.map(specialty => (
                            <span
                              key={specialty}
                              className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.availability}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Languages: {mentor.languages.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">${mentor.hourlyRate}/hr</p>
                          <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                            Book Session
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        event.virtual
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {event.virtual ? 'Virtual' : 'In Person'}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(event.date).toLocaleDateString()} • {event.duration}
                      </div>
                      {!event.virtual && (
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">{event.price}</span>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Start a Discussion</h2>
            <form onSubmit={handleAddDiscussion}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content
                  </label>
                  <textarea
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newDiscussion.tags.join(', ')}
                    onChange={(e) => setNewDiscussion({
                      ...newDiscussion,
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewDiscussionModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
