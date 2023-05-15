import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';

const UserMenu = ({ 
    user,
    handleLogout,
    }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open user menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src={user.avatar_url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ 
                  mt: '45px',
                }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                <MenuItem disableRipple sx={{
                  width: '11rem', 
                  cursor: 'default',
                  '&:hover': {
                    background: 'none',
                  },
                  justifyContent: 'center'
                }} key={"Username"} >
                  <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>{user.username}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ justifyContent:'center' }} key={"Profile"} onClick={handleCloseUserMenu} component={ Link } to='/profile'>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem sx={{ justifyContent:'center' }} key={"My Travelogues"} onClick={handleCloseUserMenu} component={ Link } to='/mytravelogues'>
                  <Typography textAlign="center">Travelogues</Typography>
                </MenuItem>
                <MenuItem sx={{ justifyContent:'center' }} key={"Collections"} onClick={handleCloseUserMenu} component={ Link } to='/bookmarks'>
                  <Typography textAlign="center">Bookmarks</Typography>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ justifyContent:'center' }} key={"Log out"} onClick={handleLogout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
  )
}

export default UserMenu