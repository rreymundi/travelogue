import React from 'react';
import { Routes, Route } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Home from './Home';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Content = ({ onLogin }) => {

  const boxStyle = {
    // height: '100vh',
    // overflow: 'auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    // overflowX: 'scroll',
    m: '64px',
  }
  
  const containerStyle = {
    backgroundColor: '#F7F7F6',
  }

  return (
    <Box 
      component='main'
      sx={boxStyle}
    >
      <Container disableGutters sx={containerStyle}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' 
              element={<LoginPage onLogin={onLogin} />} 
            />
            <Route path='/signup' 
              element={<SignupPage onLogin={onLogin} />} 
            />
          </Routes>
      </Container>
    </Box>
  )
}

export default Content