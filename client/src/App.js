import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from './context/error';
import { UserContext } from './context/user';
import Box from '@mui/material/Box';
import Content from "./components/Content";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';

const App = () => {
  const {user, setCurrentUser} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);
  let navigate = useNavigate()

  useEffect(() => {
    fetch('/me')
    .then(r => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setCurrentUser(user)
        })
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = (loggedInUser) => {
    setCurrentUser(loggedInUser);
    setErrors(null);
    navigate('/');
  };

  const onLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
      <Box sx={{ minHeight: '100%' }}>
        <ResponsiveAppBar onLogout={onLogout} />
        <Content onLogin={onLogin} />
        <Footer />
      </Box>
  );
}

export default App