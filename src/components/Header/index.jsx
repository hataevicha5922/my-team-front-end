import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MyTeam</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/createTeam">
                  <Button variant="contained">Create Team</Button>
                </Link>
                <Link to="/home">
                  <Button variant="contained">My Team</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">LogIn</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Registration</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
