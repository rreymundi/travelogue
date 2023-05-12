import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import { 
  Box, 
  Button,
  List,
  Paper,
  Typography 
} from '@mui/material';
import TravelogueRow from '../components/TravelogueRow';


const TraveloguesPage = ({ onDeleteTravelogue }) => {
  const {user} = useContext(UserContext);

  return (
    <Box sx={{
      backgroundColor: '#F7F7F6',
      padding: '3rem',
      minHeight: '100vh',
      }}
      >
      <Box sx={{ justifySelf: 'left' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{ fontSize: '3.5rem' }}>Travelogues</Typography>
          <Typography sx={{ fontSize: '1.5rem'}}>
            A place to keep track of your travelogues
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: '1rem', textAlign: 'end' }}>
        <Button variant="contained" color="primary" component={ Link } to="/travelogues/new">New</Button>
      </Box>
      <Box sx={{ backgroundColor: 'white', m: '1rem' }}>
        {user?.travelogues.length === 0 
        ? <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#F7F7F6' }}>No published travelogues</Typography>
        : <Paper>
            {user?.travelogues.map((travelogue) => 
              <TravelogueRow key={travelogue.id} travelogue={travelogue} onDeleteTravelogue={onDeleteTravelogue} />
            )}
          </Paper>
        }
      </Box>
    </Box>
  )
}

export default TraveloguesPage