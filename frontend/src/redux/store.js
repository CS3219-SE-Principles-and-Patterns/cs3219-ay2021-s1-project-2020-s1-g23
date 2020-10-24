import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import matchReducer from './slices/matchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
  },
});

export default store;
