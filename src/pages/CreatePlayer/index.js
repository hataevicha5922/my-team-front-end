import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './CreateTeam.module.scss';
import { useDispatch } from 'react-redux';
import { fetchCreateTeam } from '../../redux/slices/teams';
import { useForm } from 'react-hook-form';

export const CreateTeam = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      playerName: '',
      position: '',
      status: '',
      teamLogo: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { playerName, position, status } = values;
    // const formLogo = new FormData();
    // formLogo.append('teamLName', teamName);
    // formLogo.append('city', city);
    // formLogo.append('owner', owner);
    // formLogo.append('teamLogo', teamLogo);

    await dispatch(
      fetchCreateTeam({
        playerName,
        position,
        status,
      })
    );
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Create Player
        </Typography>
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(
            errors.playerName ? `${errors.playerName.message}` : null
          )}
          helperText={errors.playerName ? `${errors.playerName.message}` : null}
          {...register('playerName', { required: 'Player Name is required' })}
          label="Player Name"
          fullWidth
        />
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.position ? `${errors.position.message}` : null)}
          helperText={errors.position ? `${errors.position.message}` : null}
          {...register('position', { required: 'Position is required' })}
          label="Position"
          fullWidth
        />
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.status ? `${errors.status.message}` : null)}
          helperText={errors.status ? `${errors.status.message}` : null}
          {...register('status', { required: 'Status is required' })}
          label="Status"
          fullWidth
        />
        {/* <TextField
          className={styles.field}
          type="file"
          error={Boolean(errors.teamLogo ? `${errors.teamLogo.message}` : null)}
          helperText={errors.teamLogo ? `${errors.teamLogo.message}` : null}
          {...register('teamLogo', { required: 'teamLogo is required' })}
          label="teamLogo"
          fullWidth
        /> */}
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Create Player
        </Button>
      </form>
    </Paper>
  );
};
