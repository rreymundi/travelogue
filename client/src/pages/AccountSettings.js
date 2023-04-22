import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { ErrorContext } from '../context/error';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import LocationMenu from '../components/LocationMenu';

const AccountSettings = () => {
    const {user, setCurrentUser} = useContext(UserContext);
    const {setErrors} = useContext(ErrorContext);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
      });
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    };

    const handleImageUpload = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("avatar", e.target.files[0]);
        fetch('/profile/avatar', {
            method: 'POST',
            body: data
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((r) => setCurrentUser({...user, avatar_url: r.avatar_url}))
            } else {
                r.json().then((errorData) => console.log(errorData.errors))
            }
        });
    };
    console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUserData = {
            name: formData.name,
            location: inputValue,
            bio: formData.bio,
            };
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify(newUserData)
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((updatedUser) => setCurrentUser(updatedUser))
            } else {
                r.json().then((errorData) => console.log(errorData.errors))
            }
        })
    };

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const form = {
        display: 'flex',
        flexDirection: 'inline',
        margin: '2.5rem',
    }

    const accountFieldsLeft = {
        display: 'flex',
        flexDirection: 'column',
    }

    const accountFieldsRight = {
        display: 'flex', 
        flexDirection: 'column',
        ml: '5rem',
        mt: '.5rem'
    }

  return (
    <Box sx={boxStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography sx={{ fontSize: '3.5rem' }}>Edit profile</Typography>
            <Typography sx={{ fontSize: '1.5rem'}}>
                Make changes to your profile
            </Typography>
        </Box>        
        <Box sx={form} component='form' onSubmit={handleSubmit} >
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
                        <LocationMenu id="location" name="location" inputValue={inputValue} setInputValue={setInputValue}/>
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
                <Avatar variant="square" sx={{ height: '10rem', width: '10rem' }} src={user?.avatar_url}>avatar</Avatar>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: '2rem'}}
                    >
                    Upload
                    <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        hidden
                        onChange={handleImageUpload}
                    />
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default AccountSettings