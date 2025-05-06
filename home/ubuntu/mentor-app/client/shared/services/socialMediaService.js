import axios from 'axios';
import { 
  fetchContentStart, 
  fetchContentSuccess, 
  fetchContentFailure,
  likeContent,
  addComment
} from '../redux/slices/socialMediaSlice';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api/social'
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service for social media functionality
export const socialMediaService = {
  // Get unified feed
  getFeed: async (dispatch, filters = {}) => {
    try {
      dispatch(fetchContentStart());
      
      // Build query params
      const params = new URLSearchParams();
      if (filters.platform && filters.platform !== 'all') {
        params.append('platform', filters.platform);
      }
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.limit) {
        params.append('limit', filters.limit);
      }
      if (filters.page) {
        params.append('page', filters.page);
      }
      
      const response = await api.get(`/feed?${params.toString()}`);
      
      // Map response data to appropriate content type
      const posts = response.data.data.filter(item => item.type === 'post');
      const reels = response.data.data.filter(item => item.type === 'reel');
      const threads = response.data.data.filter(item => item.type === 'thread');
      
      dispatch(fetchContentSuccess({ contentType: 'posts', data: posts }));
      dispatch(fetchContentSuccess({ contentType: 'reels', data: reels }));
      dispatch(fetchContentSuccess({ contentType: 'threads', data: threads }));
      
      return response.data;
    } catch (error) {
      dispatch(fetchContentFailure(error.response?.data?.error || error.message));
      throw error;
    }
  },
  
  // Get posts by platform
  getPostsByPlatform: async (dispatch, platform, filters = {}) => {
    try {
      dispatch(fetchContentStart());
      
      // Build query params
      const params = new URLSearchParams();
      if (filters.limit) {
        params.append('limit', filters.limit);
      }
      if (filters.page) {
        params.append('page', filters.page);
      }
      
      const response = await api.get(`/platform/${platform}?${params.toString()}`);
      
      // Map response data to appropriate content type based on type field
      const posts = response.data.data.filter(item => item.type === 'post');
      const reels = response.data.data.filter(item => item.type === 'reel');
      const threads = response.data.data.filter(item => item.type === 'thread');
      
      dispatch(fetchContentSuccess({ contentType: 'posts', data: posts }));
      dispatch(fetchContentSuccess({ contentType: 'reels', data: reels }));
      dispatch(fetchContentSuccess({ contentType: 'threads', data: threads }));
      
      return response.data;
    } catch (error) {
      dispatch(fetchContentFailure(error.response?.data?.error || error.message));
      throw error;
    }
  },
  
  // Get posts by type
  getPostsByType: async (dispatch, type, filters = {}) => {
    try {
      dispatch(fetchContentStart());
      
      // Build query params
      const params = new URLSearchParams();
      if (filters.platform && filters.platform !== 'all') {
        params.append('platform', filters.platform);
      }
      if (filters.limit) {
        params.append('limit', filters.limit);
      }
      if (filters.page) {
        params.append('page', filters.page);
      }
      
      const response = await api.get(`/type/${type}?${params.toString()}`);
      
      // Map content type based on the type parameter
      let contentType;
      if (type === 'post') contentType = 'posts';
      else if (type === 'reel') contentType = 'reels';
      else if (type === 'thread') contentType = 'threads';
      
      dispatch(fetchContentSuccess({ contentType, data: response.data.data }));
      
      return response.data;
    } catch (error) {
      dispatch(fetchContentFailure(error.response?.data?.error || error.message));
      throw error;
    }
  },
  
  // Like a post
  likePost: async (dispatch, contentId, contentType) => {
    try {
      const response = await api.post(`/like/${contentId}`);
      
      // Update state with liked status
      const liked = response.data.data.userInteraction.liked;
      dispatch(likeContent({ contentType, contentId, liked }));
      
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
  
  // Comment on a post
  commentOnPost: async (dispatch, contentId, contentType, text) => {
    try {
      const response = await api.post(`/comment/${contentId}`, { text });
      
      // Get the new comment from the response
      const newComment = response.data.data.comments[response.data.data.comments.length - 1];
      
      // Update state with new comment
      dispatch(addComment({ contentType, contentId, comment: newComment }));
      
      return response.data;
    } catch (error) {
      console.error('Error commenting on post:', error);
      throw error;
    }
  },
  
  // Save a post
  savePost: async (contentId) => {
    try {
      const response = await api.post(`/save/${contentId}`);
      return response.data;
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  },
  
  // Link a social media account
  linkSocialAccount: async (platform, accessToken) => {
    try {
      const response = await api.post(`/link/${platform}`, { accessToken });
      return response.data;
    } catch (error) {
      console.error(`Error linking ${platform} account:`, error);
      throw error;
    }
  },
  
  // Unlink a social media account
  unlinkSocialAccount: async (platform) => {
    try {
      const response = await api.delete(`/unlink/${platform}`);
      return response.data;
    } catch (error) {
      console.error(`Error unlinking ${platform} account:`, error);
      throw error;
    }
  }
};

export default socialMediaService;
