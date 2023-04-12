import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const LoginPage = ({ onLogin, setAllProjects}) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

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
        fetch('/projects')
        .then((r) => r.json())
        .then((r) => setAllProjects(r))
        navigate("/")
      } else {
        //   r.json().then((errorData) => setErrors(errorData.error))
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
    <Box sx={style} component="form" onSubmit={handleLogin}>
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
            variant="standard" 
            placeholder="username" 
            value={formData.username} 
            onChange={handleChange}/>
        </Grid>
        <Grid item>
          <TextField 
            id="password" 
            name="password" 
            variant="standard" 
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
  )
}

export default LoginPage;