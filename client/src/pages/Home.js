import React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {

  const hero = {
    minHeight: '31.25rem',
    // transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: '0px',
    // boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    // position: 'relative',
    color: 'white',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80)',
    display: 'flex',
    flexDirection: 'inline'
  }

  const heroBox = {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'inline'
  }

  const heroTextBox = {
    m: '2rem',
    width: '50%',
    display: 'flex',
    justifyContent: 'center'
  }

  const heroText = {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif,',
    fontWeight: 400,
    fontSize: '6.5rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
    color: 'inherit',
    ml: '4rem',
  }

  const searchBox = {
    width: '50%',
    display: 'flex',
    flexDirection: 'inline',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
  const textField = {
    backgroundColor: 'white', 
    margin: '8px',
    color: '#282828',
  }

  const searchButton = {
    margin: '1rem',
  }

  const discoverHero = {
    minHeight: '31.25rem',
    borderRadius: '0px',
    backgroundColor: '#F7F7F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const discoverBox = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
  const discoverHeroText = {
    fontSize: '3.5rem'
  }

  const discoverHeroSub = {
    fontSize: '2rem'
  }

  const quoteHero = {
    minHeight: '20.83rem',
    borderRadius: '0px',
    position: 'relative',
    color: '#282828',
    backgroundColor: '#FFC2A5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem'  
  }

  const quoteText = {
    fontSize: '4rem',
    textAlign: 'center',
  }

  const signupHero = {
    minHeight: '20.83rem',
    borderRadius: '0px',
    position: 'relative',
    color: '#282828',
    backgroundColor: '#F7F7F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const signupBox = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const signupText = {
    fontSize: '2.5rem',
  }

  const button = {
    m: '2.5rem',
  }
  
  return (
    <>
    <Paper sx={hero}>
      <Box sx={heroBox}>
        <Box sx={heroTextBox}>
          <Typography sx={heroText}>Welcome to Travelogue</Typography>
        </Box>
        <Box sx={searchBox}>
          <TextField
            id="search-bar"
            label="Search"
            variant="filled"
            placeholder="Search..."
            sx={textField}
          />
          <Button variant='contained' sx={searchButton}>Search</Button>
        </Box>
      </Box>
    </Paper>
    <Paper sx={discoverHero}>
      <Box sx={discoverBox}>
        <Typography sx={discoverHeroText}>Stories from around the world</Typography>
        <Typography sx={discoverHeroSub}>Discover stories, recommendations, and tips.</Typography>
        <Box>
          TRAVELOGUES HERE
        </Box>
        <Button variant='contained' sx={button}>Discover</Button>
      </Box>
    </Paper>
    <Paper sx={quoteHero}>
        <Typography sx={quoteText}>
          “Nothing behind me, everything ahead of me, as is ever so on the road.”
        </Typography>
    </Paper>
    <Paper sx={signupHero}>
      <Box sx={signupBox}>
        <Typography sx={signupText}>
          Join our community
        </Typography>
        <Button variant='contained' component={ Link } to="/signup" sx={button}>Sign up</Button>
      </Box>
    </Paper>
    </>
  )
}

export default Home