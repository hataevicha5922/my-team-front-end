import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import {
  StartPage,
  Home,
  FullPlayer,
  Registration,
  AddPost,
  Login,
  CreateTeam,
} from './pages';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  console.log(isAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/player/:id" element={<FullPlayer />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/createTeam" element={<CreateTeam />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
