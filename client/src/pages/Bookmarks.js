import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import { 
  Box,
  Button, 
  Grid,
  Typography
 } from '@mui/material';
 import TravelogueCard from '../components/TravelogueCard';

const Bookmarks = ({ onBookmarkSave, onBookmarkUnsave, allTravelogues }) => {
  const {user} = useContext(UserContext);

  const savedTravelogues = allTravelogues?.filter(
    travelogue => user?.saved_posts.find( savedPost => savedPost.travelogue_id === travelogue.id)
  );

  return (
    <Box sx={{
      padding: '3rem',
      display: 'grid',
      minHeight: '100vh',
      }}
      >
      <Box>
          <Box >
              <Typography sx={{ fontSize: '3.5rem' }}>Bookmarks</Typography>
              <Typography sx={{ fontSize: '1.5rem'}}>
                  Browse through your saved travelogues
              </Typography>
              <Box sx={{ m: '1rem', textAlign: 'end' }}>
                <Button variant="contained" color="primary" component={ Link } to="/discover">Discover</Button>
              </Box>
              <Box sx={{ m: '1rem' }}>
              {user?.saved_posts.length === 0
              ? <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#F7F7F6' }}>No bookmarks yet!</Typography>
              : <Box sx={{ margin: '2.5rem'}}>
                  <Grid container spacing={2}>
                      {savedTravelogues?.map((travelogue) => (
                          <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
                      ))}
                  </Grid>
              </Box>
              }
              </Box>
          </Box>
      </Box>      
    </Box>
  )
}

export default Bookmarks