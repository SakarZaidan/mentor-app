import React, { useState } from 'react';

const SocialFeed = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    platforms: {
      instagram: true,
      tiktok: true,
      pinterest: true,
      reddit: true,
      quora: false
    },
    contentType: {
      images: true,
      videos: true,
      text: true,
      links: true
    },
    timeRange: 'all' // all, today, week, month
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'instagram',
      author: 'designinspo',
      content: 'Check out this amazing UI design for a learning app!',
      image: 'https://via.placeholder.com/400x300/6366F1/FFFFFF?text=UI+Design',
      likes: 245,
      comments: 32,
      timestamp: '2 hours ago',
      saved: false,
      liked: false
    },
    {
      id: 2,
      platform: 'tiktok',
      author: 'codingwithsara',
      content: 'Learn React hooks in 60 seconds! #coding #react #webdev',
      video: true,
      videoUrl: 'https://example.com/video.mp4',
      thumbnail: 'https://via.placeholder.com/400x600/F43F5E/FFFFFF?text=React+Hooks',
      likes: 1024,
      comments: 76,
      timestamp: '4 hours ago',
      saved: true,
      liked: true
    },
    {
      id: 3,
      platform: 'pinterest',
      author: 'webdevresources',
      content: 'Color palettes for your next web project',
      image: 'https://via.placeholder.com/400x600/F43F5E/FFFFFF?text=Color+Palettes',
      likes: 512,
      comments: 8,
      timestamp: '1 day ago',
      saved: false,
      liked: false,
      board: 'Web Design Inspiration'
    },
    {
      id: 4,
      platform: 'reddit',
      author: 'u/javascriptpro',
      content: 'What are your favorite JavaScript libraries in 2025? I\'ve been using React for years but looking to try something new.',
      likes: 89,
      comments: 124,
      timestamp: '5 hours ago',
      subreddit: 'r/webdev',
      saved: false,
      liked: true
    }
  ]);

  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: 'instagram', connected: true, username: '@designerlife' },
    { platform: 'tiktok', connected: true, username: '@techcreator' },
    { platform: 'pinterest', connected: true, username: '@webdesigner' },
    { platform: 'reddit', connected: true, username: 'u/developer123' },
    { platform: 'quora', connected: false }
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleToggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleToggleSave = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  const handleConnect = (platform) => {
    setSelectedPlatform(platform);
    setShowConnectModal(true);
  };

  const handleDisconnect = (platform) => {
    setConnectedAccounts(connectedAccounts.map(account => {
      if (account.platform === platform) {
        return { ...account, connected: false, username: null };
      }
      return account;
    }));
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram':
        return 'from-purple-500 to-pink-500';
      case 'tiktok':
        return 'from-black to-gray-800';
      case 'pinterest':
        return 'from-red-600 to-red-700';
      case 'reddit':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab !== 'all' && post.platform !== activeTab) return false;
    if (!filters.platforms[post.platform]) return false;
    if (post.video && !filters.contentType.videos) return false;
    if (post.image && !filters.contentType.images) return false;
    if (!post.image && !post.video && !filters.contentType.text) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Social Feed</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with your favorite content creators and communities
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platforms</h3>
                <div className="space-y-2">
                  {Object.entries(filters.platforms).map(([platform, enabled]) => (
                    <label key={platform} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setFilters({
                          ...filters,
                          platforms: {
                            ...filters.platforms,
                            [platform]: !enabled
                          }
                        })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Type</h3>
                <div className="space-y-2">
                  {Object.entries(filters.contentType).map(([type, enabled]) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setFilters({
                          ...filters,
                          contentType: {
                            ...filters.contentType,
                            [type]: !enabled
                          }
                        })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Range</h3>
                <select
                  value={filters.timeRange}
                  onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Platform Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mt-6">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            All
          </button>
          {connectedAccounts.filter(account => account.connected).map(account => (
            <button 
              key={account.platform}
              onClick={() => setActiveTab(account.platform)}
              className={`px-4 py-2 rounded-full ${
                activeTab === account.platform
                  ? `bg-gradient-to-r ${getPlatformColor(account.platform)} text-white`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {/* Post Header */}
              <div className="p-4 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${getPlatformColor(post.platform)}`}>
                  {post.platform.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} • {post.timestamp}
                    {post.subreddit && ` • ${post.subreddit}`}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={post.image} alt="Post content" className="w-full h-auto" />
                  </div>
                )}
                
                {post.video && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                    <img src={post.thumbnail} alt="Video thumbnail" className="w-full h-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center ${
                        post.liked
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                      {post.comments}
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggleSave(post.id)}
                      className={`${
                        post.saved
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connected Accounts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connected Accounts</h2>
            <div className="space-y-3">
              {connectedAccounts.map(account => (
                <div key={account.platform} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${getPlatformColor(account.platform)}`}>
                      {account.platform.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {account.platform}
                      </p>
                      {account.connected && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {account.username}
                        </p>
                      )}
                    </div>
                  </div>
                  {account.connected ? (
                    <button
                      onClick={() => handleDisconnect(account.platform)}
                      className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 rounded-full text-sm hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(account.platform)}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800"
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trending Topics</h2>
            <div className="space-y-3">
              {['#webdev', '#javascript', '#reactjs', '#coding', '#programming'].map(topic => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">1.2k posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Accounts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Suggested Accounts</h2>
            <div className="space-y-4">
              {[
                { name: 'Tech Tips Daily', username: '@techtips', platform: 'twitter' },
                { name: 'Design Inspiration', username: '@designinspire', platform: 'instagram' },
                { name: 'Code Masters', username: '@codemasters', platform: 'tiktok' }
              ].map(account => (
                <div key={account.username} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${getPlatformColor(account.platform)}`}>
                      {account.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{account.username}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You'll be redirected to {selectedPlatform} to authorize the connection.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle connection logic
                  setShowConnectModal(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;
