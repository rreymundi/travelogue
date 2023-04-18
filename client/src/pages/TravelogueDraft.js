import React from 'react';
import { 
    Box, 
    Button,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography 
  } from '@mui/material';

const TravelogueDraft = () => {

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid'
    }

  return (
    <Box sx={boxStyle}>
        <Typography>DRAFT</Typography>
    </Box>
  )
}

export default TravelogueDraft