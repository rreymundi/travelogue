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
        r.json().then((data) => onLogin(data))
      } else {
          r.json().then((data) => setErrors(data.error))
        }
      })
    };

  return (
    <Box sx={{
        backgroundColor: '#F7F7F6',
        padding: '6rem',
        display: 'flex',
        justifyContent: 'center',  
      }}
      >
      <Box sx={{
            width: '25rem',
            bgcolor: 'background.paper',
            p: 4,
            display: 'flex',
            border: '1px solid',
            borderColor: '#F1EEEA',
          }} 
          component="form" 
          onSubmit={handleLogin}
        >
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
              variant="outlined"            
              placeholder="username" 
              value={formData.username} 
              onChange={handleChange}/>
          </Grid>
          <Grid item>
            <TextField 
              id="password" 
              name="password" 
              variant="outlined"            
              placeholder="password" 
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
    </Box>
  )
}

export default LoginPage;