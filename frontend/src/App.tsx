import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
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
        <>
          {/* {!routes.some((route) => route.pathname === location.pathname) && (
            <Redirect to="/feed" />
          )} */}
          <Home />
        </>
      )}
      {!isLoading && !isUserLogged && (
        <Welcome />
      )}
    </BrowserRouter>
  );
}

export default App;
