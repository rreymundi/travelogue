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
  return (
    <Box 
        component='main'
        sx={{
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
            flexFlow: 'row nowrap',
            overflowX: 'scroll',
            background: '#F7F7F6'
        }}
        >
        <Container>
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