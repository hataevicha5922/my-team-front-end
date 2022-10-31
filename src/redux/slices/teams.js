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

export const fetchTeamInfo = createAsyncThunk(
  'team/fetchTeamInfo',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/teams/${params}`, { id: params });

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
  teams: {
    items: null,
    status: 'loading',
  },
  team: {
    item: null,
    status: 'loading',
  },
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllTeams.pending]: (state) => {
      state.teams.status = 'loading';
      state.teams.items = null;
    },
    [fetchAllTeams.fulfilled]: (state, action) => {
      state.teams.items = action.payload;
      state.teams.status = 'loaded';
    },
    [fetchAllTeams.rejected]: (state, action) => {
      state.teams.items = null;
      state.teams.status = 'error';
    },
    [fetchCreateTeam.pending]: (state) => {
      state.teams.team.status = 'loading';
      state.teams.team.item = null;
    },
    [fetchCreateTeam.fulfilled]: (state, action) => {
      state.teams.team.item = action.payload;
      state.teams.team.status = 'loaded';
    },
    [fetchCreateTeam.rejected]: (state, action) => {
      state.teams.team.item = null;
      state.teams.team.status = 'error';
    },
    [fetchTeamInfo.pending]: (state) => {
      state.teams.team.status = 'loading';
      state.teams.team.item = null;
    },
    [fetchTeamInfo.fulfilled]: (state, action) => {
      state.teams.team.item = action.payload;
      state.teams.team.status = 'loaded';
    },
    [fetchTeamInfo.rejected]: (state, action) => {
      state.teams.team.item = null;
      state.teams.team.status = 'error';
    },
  },
});

export const teamReducer = teamSlice.reducer;
