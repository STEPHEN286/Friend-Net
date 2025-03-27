import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentSlice'
import authReducer from './slices/authSlice'
import userProgressReducer from './slices/userProgressSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProgress: userProgressReducer,
    comments: commentsReducer,
    users: userReducer,
  },
});

   