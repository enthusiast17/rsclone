import React, { useEffect, useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import api from './utils/api';
import Welcome from './pages/Welcome';
import Loading from './components/Loading';
import { setFullName, setAvatar } from './AuthSlice';
import { IAuthResponse } from './utils/interfaces';

function App() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/auth/me')
      .then((response: { data: IAuthResponse }) => {
        setIsLoading(false);
        setIsUserLogged(true);
        dispatch(setFullName(response.data.data.fullName));
        dispatch(setAvatar(response.data.data.avatar));
      })
      .catch(() => {
        setIsLoading(false);
        history.push('/welcome');
      });
  }, []);

  return (
    <>
      {isLoading && (
        <Loading />
      )}
      {!isLoading && isUserLogged && (
        <Home />
      )}
      {!isLoading && !isUserLogged && (
        <Welcome />
      )}
    </>
  );
}

export default App;
