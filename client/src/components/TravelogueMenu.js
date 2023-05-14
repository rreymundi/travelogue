import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { TravelogueContext } from '../context/travelogue';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const TravelogueMenu = ({ 
    anchorTravelogueMenu,
    handleClose, 
    travelogue,
    onDeleteTravelogue,
    handleOpenModal
  }) => {
    const { setTravelogue } = useContext(TravelogueContext);
    let navigate = useNavigate();

    const handleDeleteClick = () => {
        fetch(`/travelogues/${travelogue.id}`, {
          method: 'DELETE'
        })
        .then(onDeleteTravelogue(travelogue))
        handleOpenModal();
    };

    const handleEditClick = () => {
        setTravelogue(travelogue)
        navigate(`/travelogues/${travelogue.id}/edit`)
    };

    return (
            <Menu
                sx={{ mt: '45px', flexGrow: 0 }}
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
      )   
}

export default TravelogueMenu;