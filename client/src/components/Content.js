import React from 'react';
import { Routes, Route } from "react-router-dom";
import AccountSettings from '../pages/AccountSettings';
import Collections from '../pages/Collections';
import Box from '@mui/material/Box';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import TraveloguesPage from '../pages/TraveloguesPage';
import TravelogueDraft from '../pages/TravelogueDraft';

const Content = ({ onLogin }) => {
  
  const boxStyle = {
    m: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  return (
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
          <Route path='/travelogues'
            element={<TraveloguesPage />}
          />
          <Route path='travelogues/new'
            element={<TravelogueDraft />}
          />
          <Route path='/collections'
            element={<Collections />}
          />
        </Routes>
      </Box>
  )
}

export default Content