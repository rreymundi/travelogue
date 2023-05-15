import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    ListItemText,
    TableRow,
    TableCell,
    Typography
  } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TravelogueMenu from './TravelogueMenu';

const TravelogueRow = ({ travelogue, onDeleteTravelogue, handleOpenDeleteModal }) => {
  const [anchorTravelogueMenu, setAnchorTravelogueMenu] = useState(null);

  const handleOpen = (e) => {
    setAnchorTravelogueMenu(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorTravelogueMenu(null);
  };

  const publishedDate = new Date(travelogue.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <TableRow>
      <TableCell align="center">
        <Button component={ Link } to={`/travelogues/${travelogue.id}`} >
          <Typography>{travelogue.title}</Typography>
        </Button>
      </TableCell>
      <TableCell align="center">
        <ListItemText>
          <Typography>{publishedDate}</Typography>
        </ListItemText>
      </TableCell>
      <TableCell align='center'>
          <Button onClick={handleOpen} >
            <MoreHorizIcon />
          </Button>
      </TableCell>
        <TravelogueMenu handleClose={handleClose} anchorTravelogueMenu={anchorTravelogueMenu} travelogue={travelogue} onDeleteTravelogue={onDeleteTravelogue} handleOpenDeleteModal={handleOpenDeleteModal} />
    </TableRow>
  )
}

export default TravelogueRow