import React from 'react';
import { Routes, Route } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AccountSettings from './AccountSettings';
import Home from './Home';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Content = ({ onLogin }) => {
  
  const boxStyle = {
    m: '64px',
  }

  return (
    <Box 
      component='main'
    >
      <Box disableGutters sx={boxStyle}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' 
              element={<LoginPage onLogin={onLogin} />} 
            />
            <Route path='/signup' 
              element={<SignupPage onLogin={onLogin} />} 
            />
            <Route path='/account'
              element={<AccountSettings />}
            />
          </Routes>
      </Box>
    </Box>
  )
}

export default Content