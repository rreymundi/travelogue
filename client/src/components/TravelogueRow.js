import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TravelogueContext } from '../context/travelogue';
import { 
    Button,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TravelogueMenu from './TravelogueMenu';

const TravelogueRow = ({ travelogue, onDeleteTravelogue }) => {
  const [anchorTravelogueMenu, setAnchorTravelogueMenu] = useState(null);
  const {setTravelogue} = useContext(TravelogueContext);

  const handleOpen = (e) => {
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
            {travelogue.title}
        </ListItemButton>
        <ListItemText>
            {travelogue.created_at}
        </ListItemText>
        <ListItemIcon sx={{ justifyContent: 'end' }} >
            <Button onClick={handleOpen} >
                <MoreHorizIcon />
            </Button>
        </ListItemIcon>
        <TravelogueMenu handleClose={handleClose} anchorTravelogueMenu={anchorTravelogueMenu} travelogue={travelogue} setTravelogue={setTravelogue} onDeleteTravelogue={onDeleteTravelogue} />
    </ListItem>
  )
}

export default TravelogueRow