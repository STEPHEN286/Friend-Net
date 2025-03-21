import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentSlice'
import authReducers from './slices/authSlice'
import userProgressReducer from './slices/userProgressSlice'

export const store = configureStore({
  reducer: {
    auth: authReducers,
    userProgress: userProgressReducer,
    comments: commentsReducer,
  },
});

   