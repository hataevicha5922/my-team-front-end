import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/players');
      if (response.statusText !== 'OK') {
        throw new Error('Server Error');
      }
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPosition = createAsyncThunk(
  'players/fetchPosition',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/position');
      if (response.statusText !== 'OK') {
        throw new Error('Server Error');
      }
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  players: {
    items: [],
    status: 'loading',
    error: null,
  },
  positions: {
    items: [],
    status: 'loading',
    error: null,
  },
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlayers.pending]: (state) => {
      state.players.items = [];
      state.players.status = 'loading';
      state.players.error = null;
    },
    [fetchPlayers.fulfilled]: (state, action) => {
      state.players.items = action.payload;
      state.players.status = 'loaded';
    },
    [fetchPlayers.rejected]: (state, action) => {
      state.players.items = [];
      state.players.status = 'error';
      state.players.error = action.payload;
    },
    [fetchPosition.pending]: (state) => {
      state.positions.items = [];
      state.positions.status = 'loading';
      state.positions.error = null;
    },
    [fetchPosition.fulfilled]: (state, action) => {
      state.positions.items = action.payload;
      state.positions.status = 'loaded';
    },
    [fetchPosition.rejected]: (state, action) => {
      state.positions.items = [];
      state.positions.status = 'error';
      state.positions.error = action.payload;
    },
  },
});

export const playersReducer = playersSlice.reducer;
