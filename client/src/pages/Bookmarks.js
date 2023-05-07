import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { 
  Box, 
  Grid,
  Typography
 } from '@mui/material';
 import TravelogueCard from '../components/TravelogueCard';

const Bookmarks = ({ onBookmarkSave, onBookmarkUnsave }) => {
  const {user} = useContext(UserContext);

  const boxStyle = {
    backgroundColor: '#F7F7F6',
    padding: '3rem',
    display: 'grid'
  };

  const savedTravelogues = user?.travelogues?.filter(
    travelogue => user.saved_posts.find( savedPost => savedPost.travelogue_id === travelogue.id)
  );
  console.log(savedTravelogues);

  return (
    <Box sx={boxStyle}>
    <Box>
        <Box >
            <Typography sx={{ fontSize: '3.5rem' }}>Bookmarks</Typography>
            <Typography sx={{ fontSize: '1.5rem'}}>
                Browse through your saved travelogues
            </Typography>
            {user.saved_posts 
            ? 
            <Box sx={{ margin: '2.5rem'}}>
                <Grid container spacing={2}>
                    {savedTravelogues.map((travelogue) => (
                        <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
                    ))}
                </Grid>
            </Box>
            : null
            }
        </Box>
    </Box>      
  </Box>
  )
}

export default Bookmarks