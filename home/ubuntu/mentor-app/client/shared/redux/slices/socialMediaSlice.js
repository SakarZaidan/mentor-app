import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  reels: [],
  threads: [],
  loading: false,
  error: null,
  currentTab: 'posts', // 'posts', 'reels', or 'threads'
  filters: {
    platform: 'all', // 'all', 'instagram', 'tiktok', 'reddit', etc.
    sortBy: 'recent' // 'recent', 'popular', 'relevant'
  }
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    fetchContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContentSuccess: (state, action) => {
      const { contentType, data } = action.payload;
      state.loading = false;
      
      if (contentType === 'posts') {
        state.posts = data;
      } else if (contentType === 'reels') {
        state.reels = data;
      } else if (contentType === 'threads') {
        state.threads = data;
      }
    },
    fetchContentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeTab: (state, action) => {
      state.currentTab = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    likeContent: (state, action) => {
      const { contentType, contentId, liked } = action.payload;
      
      if (contentType === 'posts') {
        const postIndex = state.posts.findIndex(post => post.id === contentId);
        if (postIndex !== -1) {
          state.posts[postIndex].liked = liked;
          if (liked) {
            state.posts[postIndex].likeCount += 1;
          } else {
            state.posts[postIndex].likeCount -= 1;
          }
        }
      }
      // Similar logic for reels and threads
    },
    addComment: (state, action) => {
      const { contentType, contentId, comment } = action.payload;
      
      if (contentType === 'posts') {
        const postIndex = state.posts.findIndex(post => post.id === contentId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(comment);
          state.posts[postIndex].commentCount += 1;
        }
      }
      // Similar logic for reels and threads
    }
  }
});

export const { 
  fetchContentStart, 
  fetchContentSuccess, 
  fetchContentFailure, 
  changeTab, 
  updateFilters,
  likeContent,
  addComment
} = socialMediaSlice.actions;

export default socialMediaSlice.reducer;
