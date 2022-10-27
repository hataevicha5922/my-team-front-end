import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from './slices/players';
import { authReducer } from './slices/auth';

const store = configureStore({
  reducer: {
    players: playersReducer,
    auth: authReducer,
  },
});

export default store;
