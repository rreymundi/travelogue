import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

const AccountSettings = () => {
    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        bio: "",
        avatar: ""
      });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    };

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }

    const accountTitle = {
        display: 'flex',
        justifyContent: 'left'
    }

    const form = {
        display: 'flex',
        flexDirection: 'inline',
        margin: '2.5rem'
    }

    const accountFieldsLeft = {
        display: 'flex',
        flexDirection: 'column',
    }

    const accountFieldsRight = {
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: '8rem',
    }

  return (
    <Box sx={boxStyle}>
        <Box sx={accountTitle}>
            <Typography sx={{ fontSize: '3.5rem' }}>Account settings</Typography>
        </Box>
        <Box sx={form}>
            <Box sx={accountFieldsLeft}>
                <Grid
                    container
                    spacing={2} 
                    direction="column" 
                >
                    <Grid item>
                        <Typography>Name</Typography>
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="name" 
                            name="name" 
                            variant="filled" 
                            placeholder="Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography>Location</Typography>
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="location" 
                            name="location" 
                            variant="filled" 
                            placeholder="Location" 
                            value={formData.location} 
                            onChange={handleChange} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography>Bio</Typography>
                    </Grid>
                    <Grid item>
                        <TextField 
                            multiline
                            rows={4}
                            id="bio" 
                            name="bio" 
                            variant="filled"                    
                            placeholder="Bio" 
                            value={formData.bio} 
                            onChange={handleChange} 
                        />
                        </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>Save</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={accountFieldsRight}>
                <Avatar variant="square" sx={{ height: '10rem', width: '10rem'}}>avatar</Avatar>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: '2rem'}}>Update</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default AccountSettings