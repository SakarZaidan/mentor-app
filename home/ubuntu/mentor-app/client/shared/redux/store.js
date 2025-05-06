import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './slices/authSlice';
import socialMediaReducer from './slices/socialMediaSlice';
import projectsReducer from './slices/projectsSlice';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socialMedia: socialMediaReducer,
    projects: projectsReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
