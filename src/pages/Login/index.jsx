import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (data.error) {
      alert('You are not auth!');
    }
    if ('accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        LogIn
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email ? `${errors.email.message}` : null)}
          helperText={errors.email ? `${errors.email.message}` : null}
          {...register('email', { required: 'Email is required' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          error={Boolean(errors.password ? `${errors.password.message}` : null)}
          helperText={errors.password ? `${errors.password.message}` : null}
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
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          LogIn
        </Button>
      </form>
    </Paper>
  );
};
