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
      teamName: '',
      city: '',
      owner: '',
      teamLogo: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { teamName, city, owner } = values;
    // const formLogo = new FormData();
    // formLogo.append('teamLName', teamName);
    // formLogo.append('city', city);
    // formLogo.append('owner', owner);
    // formLogo.append('teamLogo', teamLogo);

    await dispatch(
      fetchCreateTeam({
        teamName,
        city,
        owner,
      })
    );
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Create Team
        </Typography>
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.teamName ? `${errors.teamName.message}` : null)}
          helperText={errors.teamName ? `${errors.teamName.message}` : null}
          {...register('teamName', { required: 'TeamName is required' })}
          label="Team Name"
          fullWidth
        />
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.city ? `${errors.city.message}` : null)}
          helperText={errors.city ? `${errors.city.message}` : null}
          {...register('city', { required: 'City is required' })}
          label="City"
          fullWidth
        />
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.owner ? `${errors.owner.message}` : null)}
          helperText={errors.owner ? `${errors.owner.message}` : null}
          {...register('owner', { required: 'Owner is required' })}
          label="Owner"
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
          Create
        </Button>
      </form>
    </Paper>
  );
};
