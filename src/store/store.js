import { configureStore } from '@reduxjs/toolkit';

import authReducers from './slices/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducers
  },
});

   