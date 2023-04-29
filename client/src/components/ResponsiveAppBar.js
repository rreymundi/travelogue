import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import ExploreIcon from '@mui/icons-material/Explore';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function ResponsiveAppBar({ onLogout }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {user} = useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // navigate("/");
    fetch("/logout", {
      method: 'DELETE'
    })
    onLogout();
  };

  return (
    <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* desktop display header */}
            <ExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              travelogue
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
            {/* mobile display header */}
            <ExploreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              travelogue
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
            {user 
            ?
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
                  <Typography textAlign="center">{user.username}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ justifyContent:'center' }} key={"Profile"} onClick={handleCloseUserMenu} component={ Link } to='/profile'>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem sx={{ justifyContent:'center' }} key={"My Travelogues"} onClick={handleCloseUserMenu} component={ Link } to='/travelogues'>
                  <Typography textAlign="center">Travelogues</Typography>
                </MenuItem>
                <MenuItem sx={{ justifyContent:'center' }} key={"Collections"} onClick={handleCloseUserMenu} component={ Link } to='/collections'>
                  <Typography textAlign="center">Collections</Typography>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ justifyContent:'center' }} key={"Log out"} onClick={handleLogout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
                <Typography 
                  textAlign="center"
                  component="a"
                  href="/login"
                  sx={{
                    mr: 2,
                    display: { md: 'flex' },
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Log in
                </Typography>
            </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default ResponsiveAppBar;