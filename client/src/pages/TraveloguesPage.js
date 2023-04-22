import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { 
  Box, 
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography 
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const TraveloguesPage = () => {
  const {user} = useContext(UserContext);

  const boxStyle = {
    backgroundColor: '#F7F7F6',
    padding: '3rem',
    display: 'grid'
}

  return (
    <Box sx={boxStyle}>
      <Box sx={{ justifySelf: 'left' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{ fontSize: '3.5rem' }}>Travelogues</Typography>
          <Typography sx={{ fontSize: '1.5rem'}}>
            A place to keep track of your travelogues
          </Typography>
        </Box>
      </Box>
      <Box sx={{ justifySelf: 'right', m: '1rem'}}>
        <Button variant="contained" color="primary" component={ Link } to="/travelogues/new">New</Button>
      </Box>
      <Box sx={{ backgroundColor: 'white', m: '1rem' }}>
        <List>
          <ListItem>
            <ListItemText>
              TRAVELOGUE 1
            </ListItemText>
            <ListItemText>
              Published date
            </ListItemText>
            <ListItemIcon sx={{ justifyContent: 'end' }} >
              <Button>
                <MoreHorizIcon />
              </Button>
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default TraveloguesPage