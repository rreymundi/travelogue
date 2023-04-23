import React, { useState } from 'react';
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
import TravelogueMenu from './TravelogueMenu';

const TravelogueRow = ({ travelogue }) => {
  const [anchorTravelogueMenu, setAnchorTravelogueMenu] = useState(null);

  const handleOpenTaskMenu = (e) => {
    setAnchorTravelogueMenu(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorTravelogueMenu(null);
  };


  return (
    <ListItem>
        <ListItemText>
            {travelogue.title}
        </ListItemText>
        <ListItemText>
            {travelogue.created_at}
        </ListItemText>
        <ListItemIcon sx={{ justifyContent: 'end' }} >
            <Button onClick={handleOpenTaskMenu} >
                <MoreHorizIcon />
            </Button>
        </ListItemIcon>
        <TravelogueMenu handleClose={handleClose} anchorTravelogueMenu={anchorTravelogueMenu} />
    </ListItem>
  )
}

export default TravelogueRow