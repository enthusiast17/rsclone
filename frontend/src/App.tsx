import React, { useEffect, useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { BackTop } from 'antd';
import HomePage from './pages/HomePage';
import api from './utils/api';
import WelcomePage from './pages/WelcomePage';
import Loading from './components/Loading';
import { setFullName, setAvatar } from './slices/authSlice';
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
        <HomePage />
      )}
      {!isLoading && !isUserLogged && (
        <WelcomePage />
      )}
      <BackTop />
    </>
  );
}

export default App;
