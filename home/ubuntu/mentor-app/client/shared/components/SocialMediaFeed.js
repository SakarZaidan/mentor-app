import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchContentStart, 
  fetchContentSuccess, 
  fetchContentFailure,
  changeTab,
  updateFilters
} from '../../shared/redux/slices/socialMediaSlice';

// This is a placeholder component for the social media feed
// In a real implementation, this would fetch data from the backend API
const SocialMediaFeed = () => {
  const dispatch = useDispatch();
  const { 
    posts, 
    reels, 
    threads, 
    loading, 
    error, 
    currentTab,
    filters 
  } = useSelector(state => state.socialMedia);
  
  const [activeContent, setActiveContent] = useState([]);
  
  // Update active content when tab changes
  useEffect(() => {
    if (currentTab === 'posts') {
      setActiveContent(posts);
    } else if (currentTab === 'reels') {
      setActiveContent(reels);
    } else if (currentTab === 'threads') {
      setActiveContent(threads);
    }
  }, [currentTab, posts, reels, threads]);
  
  // Simulate fetching content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        dispatch(fetchContentStart());
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockPosts = [
          {
            id: 'post1',
            platform: 'instagram',
            type: 'post',
            content: {
              text: 'Learning React Native has been an amazing journey! #coding #reactnative',
              media: [{ type: 'image', url: 'https://example.com/image1.jpg' }]
            },
            author: {
              username: 'techcoder',
              profilePicture: 'https://example.com/profile1.jpg'
            },
            stats: {
              likes: 120,
              comments: 15,
              shares: 5
            },
            userInteraction: {
              liked: false,
              saved: false,
              commented: false
            },
            timestamp: '2 hours ago'
          },
          {
            id: 'post2',
            platform: 'pinterest',
            type: 'post',
            content: {
              text: 'Check out this amazing UI design inspiration for your next project!',
              media: [{ type: 'image', url: 'https://example.com/image2.jpg' }]
            },
            author: {
              username: 'designmaster',
              profilePicture: 'https://example.com/profile2.jpg'
            },
            stats: {
              likes: 85,
              comments: 7,
              shares: 12
            },
            userInteraction: {
              liked: true,
              saved: true,
              commented: false
            },
            timestamp: '5 hours ago'
          }
        ];
        
        const mockReels = [
          {
            id: 'reel1',
            platform: 'tiktok',
            type: 'reel',
            content: {
              text: 'Quick tutorial on Redux implementation! #redux #javascript',
              media: [{ type: 'video', url: 'https://example.com/video1.mp4' }]
            },
            author: {
              username: 'jsmaster',
              profilePicture: 'https://example.com/profile3.jpg'
            },
            stats: {
              likes: 1500,
              comments: 45,
              shares: 120
            },
            userInteraction: {
              liked: true,
              saved: false,
              commented: true
            },
            timestamp: '1 day ago'
          }
        ];
        
        const mockThreads = [
          {
            id: 'thread1',
            platform: 'reddit',
            type: 'thread',
            content: {
              text: 'What are your favorite React hooks and why?',
              media: []
            },
            author: {
              username: 'reactfan',
              profilePicture: 'https://example.com/profile4.jpg'
            },
            stats: {
              likes: 230,
              comments: 78,
              shares: 15
            },
            userInteraction: {
              liked: false,
              saved: true,
              commented: false
            },
            timestamp: '3 days ago'
          }
        ];
        
        dispatch(fetchContentSuccess({ contentType: 'posts', data: mockPosts }));
        dispatch(fetchContentSuccess({ contentType: 'reels', data: mockReels }));
        dispatch(fetchContentSuccess({ contentType: 'threads', data: mockThreads }));
      } catch (error) {
        dispatch(fetchContentFailure(error.message));
      }
    };
    
    fetchContent();
  }, [dispatch]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    dispatch(changeTab(tab));
  };
  
  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    dispatch(updateFilters({ [filterType]: value }));
  };
  
  // Render loading state
  if (loading && activeContent.length === 0) {
    return <div className="social-feed-loading">Loading social media content...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="social-feed-error">Error: {error}</div>;
  }
  
  return (
    <div className="social-feed-container">
      <div className="social-feed-tabs">
        <button 
          className={`tab ${currentTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabChange('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab ${currentTab === 'reels' ? 'active' : ''}`}
          onClick={() => handleTabChange('reels')}
        >
          Reels
        </button>
        <button 
          className={`tab ${currentTab === 'threads' ? 'active' : ''}`}
          onClick={() => handleTabChange('threads')}
        >
          Threads
        </button>
      </div>
      
      <div className="social-feed-filters">
        <select 
          value={filters.platform} 
          onChange={(e) => handleFilterChange('platform', e.target.value)}
        >
          <option value="all">All Platforms</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="pinterest">Pinterest</option>
          <option value="reddit">Reddit</option>
          <option value="quora">Quora</option>
        </select>
        
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="relevant">Most Relevant</option>
        </select>
      </div>
      
      <div className="social-feed-content">
        {activeContent.length === 0 ? (
          <div className="social-feed-empty">
            No content available. Try linking your social media accounts or changing filters.
          </div>
        ) : (
          activeContent.map(item => (
            <div key={item.id} className={`social-card social-card-${item.platform}`}>
              <div className="social-card-header">
                <div className="social-card-user-info">
                  <div className="social-card-avatar">
                    {/* Placeholder for avatar */}
                  </div>
                  <div className="social-card-user-details">
                    <div className="social-card-username">{item.author.username}</div>
                    <div className="social-card-timestamp">{item.timestamp}</div>
                  </div>
                </div>
                <div className="social-card-platform-icon">{item.platform}</div>
              </div>
              
              <div className="social-card-content">
                {item.content.text && <div className="social-card-text">{item.content.text}</div>}
                {item.content.media && item.content.media.length > 0 && (
                  <div className="social-card-media">
                    {/* Placeholder for media content */}
                    <div className="media-placeholder">Media content would display here</div>
                  </div>
                )}
              </div>
              
              <div className="social-card-actions">
                <button 
                  className={`social-card-action ${item.userInteraction.liked ? 'active' : ''}`}
                >
                  Like {item.stats.likes > 0 && `(${item.stats.likes})`}
                </button>
                <button 
                  className={`social-card-action ${item.userInteraction.commented ? 'active' : ''}`}
                >
                  Comment {item.stats.comments > 0 && `(${item.stats.comments})`}
                </button>
                <button 
                  className={`social-card-action ${item.userInteraction.saved ? 'active' : ''}`}
                >
                  Save
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialMediaFeed;
