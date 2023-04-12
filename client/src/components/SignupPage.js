import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const SignupPage = ({ onLogin }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  let navigate = useNavigate();

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
        navigate("/")
        // setErrors([])
      } else {
        // r.json().then((errorData) => setErrors(errorData.errors))      
      }
    })
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex'
  };

  return (
    <Box sx={style} component="form" onSubmit={handleSignup}>
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
            variant="standard" 
            placeholder="username" 
            value={formData.username} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField 
            id="password" 
            name="password" 
            variant="standard" 
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
              variant="standard" 
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