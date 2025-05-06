import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  linkedAccounts: {
    instagram: false,
    tiktok: false,
    pinterest: false,
    reddit: false,
    quora: false
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.linkedAccounts = {
        instagram: false,
        tiktok: false,
        pinterest: false,
        reddit: false,
        quora: false
      };
    },
    linkSocialAccount: (state, action) => {
      const { platform, linked } = action.payload;
      if (state.linkedAccounts.hasOwnProperty(platform)) {
        state.linkedAccounts[platform] = linked;
      }
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  linkSocialAccount,
  updateUserProfile
} = authSlice.actions;

export default authSlice.reducer;
