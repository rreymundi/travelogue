import React from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TravelogueMenu = ({ 
    anchorTravelogueMenu,
    handleClose, 
  }) => {

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
                        >
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography 
                        textAlign="center" 
                        >
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
      )   
}

export default TravelogueMenu;