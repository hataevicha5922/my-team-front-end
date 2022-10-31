import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAllTeams = createAsyncThunk(
  'team/fetchAllTeams',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/teams');

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCreateTeam = createAsyncThunk(
  'team/fetchCreateTeam',
  async (params, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post('/teams', params, config);
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
  teams: null,
  status: 'loading',
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllTeams.pending]: (state) => {
      state.status = 'loading';
      state.teams = null;
    },
    [fetchAllTeams.fulfilled]: (state, action) => {
      state.teams = action.payload;
      state.status = 'loaded';
    },
    [fetchAllTeams.rejected]: (state, action) => {
      state.teams = null;
      state.status = 'error';
    },
    [fetchCreateTeam.pending]: (state) => {
      state.status = 'loading';
      state.teams = null;
    },
    [fetchCreateTeam.fulfilled]: (state, action) => {
      state.teams = action.payload;
      state.status = 'loaded';
    },
    [fetchCreateTeam.rejected]: (state, action) => {
      state.teams = null;
      state.status = 'error';
    },
  },
});

// export const selectIsAuth = (state) => Boolean(state.auth.data);

export const teamReducer = teamSlice.reducer;
