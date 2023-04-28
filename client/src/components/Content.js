import React, { useState } from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import AccountSettings from '../pages/AccountSettings';
import Collections from '../pages/Collections';
import Box from '@mui/material/Box';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import TraveloguesPage from '../pages/TraveloguesPage';
import TravelogueDraft from '../pages/TravelogueDraft';
import Travelogue from '../pages/Travelogue';
import TravelogueEdit from '../pages/TravelogueEdit';
import Discover from '../pages/Discover';

const Content = ({ onLogin, onDeleteTravelogue, onTravelogueEdit, tags }) => {
  let { id } = useParams();
  console.log(id)
  
  const boxStyle = {
    m: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  return (
      <Box disablegutters='true' sx={boxStyle}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/signup' element={<SignupPage onLogin={onLogin} />} />
          <Route path='/profile' element={<AccountSettings />} />
          <Route path='/travelogues/' element={<TraveloguesPage onDeleteTravelogue={onDeleteTravelogue} />} />
          <Route path='/travelogues/:id' element={<Travelogue />} />
          <Route path='/travelogues/:id/edit' element={<TravelogueEdit onTravelogueEdit={onTravelogueEdit} tags={tags} />} />
          <Route path='/travelogues/new' element={<TravelogueDraft tags={tags} />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/discover' element={<Discover />} />
        </Routes>
      </Box>
  )
}

export default Content