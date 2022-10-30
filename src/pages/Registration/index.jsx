import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if ('accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Registration
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          type="text"
          error={Boolean(errors.userName ? `${errors.userName.message}` : null)}
          helperText={errors.userName ? `${errors.userName.message}` : null}
          {...register('userName', { required: 'UserName is required' })}
          label="User Name"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.email ? `${errors.email.message}` : null)}
          helperText={errors.email ? `${errors.email.message}` : null}
          type="email"
          {...register('email', { required: 'Email is required' })}
          label="E-Mail"
          fullWidth
        />
        <TextField
          className={styles.field}
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Min 5 characters',
            },
            maxLength: {
              value: 15,
              message: 'Max 15 characters',
            },
          })}
          error={Boolean(errors.password ? `${errors.password.message}` : null)}
          helperText={errors.password ? `${errors.password.message}` : null}
          label="Password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Registration
        </Button>
      </form>
    </Paper>
  );
};
