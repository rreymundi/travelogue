import React, { useState, useContext } from 'react';
import { ErrorContext } from '../context/error';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';

const SignupPage = ({ onLogin }) => {
  const {errors, setErrors} = useContext(ErrorContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSignup = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(r => {
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        console.log("Success!")
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
        console.log(errors)
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
    <Box sx={boxStyle} component="form" onSubmit={handleSignup}>
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        justify="center" 
        direction="column" >
        <Grid item>
          <Typography sx={{ fontWeight: 'bold' }}>Sign up</Typography>
        </Grid>
        <Grid item>
          <TextField 
            id="username" 
            name="username" 
            variant="outlined"            
            placeholder="username" 
            value={formData.username} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField 
            id="password" 
            name="password" 
            variant="outlined"            
            placeholder="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
            <TextField 
              id="password_confirmation" 
              name="password_confirmation" 
              variant="outlined"              
              placeholder="re-enter password" 
              type="password" 
              value={formData.password_confirmation} 
              onChange={handleChange}
            />
        </Grid>
        <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
            >
            Create account
            </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignupPage;