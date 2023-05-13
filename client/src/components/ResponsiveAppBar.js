import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import { ErrorContext } from '../context/error';
import { Button } from '@mui/material';
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
import UserMenu from './UserMenu';

function ResponsiveAppBar({ onLogout }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {user} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
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
            ? <UserMenu user={user} handleLogout={handleLogout} anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} handleOpenUserMenu={handleOpenUserMenu} />
            : <Button sx={{ flexGrow: 0 }} component={ Link } to='/login' onClick={() => setErrors(null)}>
                <Typography 
                  textAlign="center"
                  sx={{
                    mr: 2,
                    display: { md: 'flex' },
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                  }}
                  >
                  Log in
                </Typography>
            </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default ResponsiveAppBar;