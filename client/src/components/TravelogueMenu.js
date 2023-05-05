import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { TravelogueContext } from '../context/travelogue';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TravelogueMenu = ({ 
    anchorTravelogueMenu,
    handleClose, 
    travelogue,
    onDeleteTravelogue
  }) => {
    const { setTravelogue } = useContext(TravelogueContext);
    let navigate = useNavigate();

    const handleDeleteClick = () => {
        fetch(`/travelogues/${travelogue.id}`, {
          method: 'DELETE'
        })
        .then(onDeleteTravelogue(travelogue))
      };

    const handleEditClick = () => {
        setTravelogue(travelogue)
        navigate(`/travelogues/${travelogue.id}/edit`)
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorTravelogueMenu}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorTravelogueMenu)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>
                    <Typography 
                        textAlign="center" 
                        onClick={handleEditClick}
                        >
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography 
                        textAlign="center" 
                        onClick={handleDeleteClick}
                        >
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
      )   
}

export default TravelogueMenu;