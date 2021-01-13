import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import api from './utils/api';
import Welcome from './pages/Welcome';
import Loading from './components/Loading';

function App() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/auth/me')
      .then(() => {
        setIsLoading(false);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoading && (
        <Loading />
      )}
      {!isLoading && isUserLogged && (
        <Home />
      )}
      {!isLoading && !isUserLogged && (
        <>
          <Redirect to="/" />
          <Welcome />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
