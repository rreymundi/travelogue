import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const TravelogueRow = ({ travelogue, setTravelogue }) => {
  const [anchorTravelogueMenu, setAnchorTravelogueMenu] = useState(null);

  const handleOpenTaskMenu = (e) => {
    setAnchorTravelogueMenu(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorTravelogueMenu(null);
  };

  const handleClick = () => {
    setTravelogue(travelogue)
  };

  return (
    <ListItem >
        <ListItemButton onClick={handleClick} component={ Link } to={`/travelogues/${travelogue.id}`} >
            {travelogue?.title ? travelogue.title : 'Untitled'}
        </ListItemButton>
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