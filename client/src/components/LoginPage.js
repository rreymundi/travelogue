import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ErrorContext } from '../context/error';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';

const LoginPage = ({ onLogin }) => {
  const {errors, setErrors} = useContext(ErrorContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(r => {
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        // fetch('/projects')
        // .then((r) => r.json())
        // .then((r) => setAllProjects(r))
      } else {
          r.json().then((errorData) => setErrors(errorData.error))
        }
      })
    };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    display: 'flex',
    border: '1px solid',
    borderColor: '#F1EEEA'
  };

  return (
    <Box sx={boxStyle} component="form" onSubmit={handleLogin}>
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        justify="center" 
        direction="column" 
        >
        <Grid item>
          <Typography sx={{ fontWeight: 'bold' }}>Log in</Typography>
        </Grid>
        <Grid item>
          <TextField 
            id="username" 
            name="username" 
            variant="outlined"            placeholder="username" 
            value={formData.username} 
            onChange={handleChange}/>
        </Grid>
        <Grid item>
          <TextField 
            id="password" 
            name="password" 
            variant="outlined"            placeholder="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}/>
        </Grid>
        <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" >
              Log in
            </Button>
        </Grid>

        <Grid item>
          <Typography>New to travelogue?&nbsp;
            <Link to="/signup" underline="none" >Sign up!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginPage;