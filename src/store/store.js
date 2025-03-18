import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducers from './slices/authSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducers
  },
});

   