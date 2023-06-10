import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    currentUser: userSlice,
  },
});
