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
        r.json().then((data) => onLogin(data))
      } else {
        r.json().then((data) => setErrors(data.errors))
      }
    })
  };

  return (
    <Box sx={{
        backgroundColor: '#F7F7F6',
        padding: '6rem',
        display: 'flex',
        justifyContent: 'center'
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
        onSubmit={handleSignup}
        >
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
          {/* errors displayed here */}
          <Grid item>
            { errors 
              ? errors.map((error) => <Typography key={error} color="error">{error}</Typography>)
              : null
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SignupPage;