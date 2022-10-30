import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from './slices/players';
import { authReducer } from './slices/auth';
import { teamReducer } from './slices/teams';

const store = configureStore({
  reducer: {
    players: playersReducer,
    auth: authReducer,
    teams: teamReducer,
  },
});

export default store;
