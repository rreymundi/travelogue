import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { Box, Typography } from '@mui/material'

const Collections = () => {
  const {user} = useContext(UserContext);

  const boxStyle = {
    backgroundColor: '#F7F7F6',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

  return (
    <Box sx={boxStyle}>
      <Typography sx={{ fontSize: '3.5rem', m: '1rem'}}>Collections</Typography>
    </Box>
  )
}

export default Collections