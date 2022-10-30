import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { fetchAllTeams } from '../redux/slices/teams';
import { fetchPlayers, fetchPosition } from '../redux/slices/players';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import TeamCard from '../components/TeamCard';
import PlayerCard from '../components/PlayerCard';

export const StartPage = () => {
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const { players, positions } = useSelector((state) => state.players);
  const { teams, status } = useSelector((state) => state.teams);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchAllTeams());
  }, [dispatch]);

  if (status === 'loading') {
    return <h1>Wait</h1>;
  }
  console.log(teams);
  console.log(players);
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Teams" value="1" />
              <Tab label="Players" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {' '}
            <Typography variant="h2">Teams</Typography>
            <Grid container spacing={3}>
              {teams.map((team) => (
                <Grid item key={team.id} xs={12} sm={6} md={3} lg={2}>
                  <TeamCard
                    teamName={team.teamName}
                    city={team.city}
                    owner={team.owner}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h2">Players</Typography>
            <Grid container spacing={3}>
              {players.items.map((player) => (
                <Grid item key={player.id} xs={12} sm={6} md={3} lg={2}>
                  <PlayerCard
                    playerName={player.playerName}
                    position={player.position}
                    status={player.status}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
