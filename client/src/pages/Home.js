import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { Link, useNavigate } from "react-router-dom";
import { 
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import HomepageCard from '../components/HomepageCard';
import hero_1 from '../assets/hero_1.jpg';
import hero_2 from '../assets/hero_2.jpg';

const Home = ({ onSearch, allTravelogues }) => {
  const { user } = useContext(UserContext);

  const [search, setSearch] = useState('');

  let navigate = useNavigate()

  const handleChange = (e) => {
    setSearch(e.target.value)
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search)
    navigate('/discover')
  };

  const traveloguesToShow = allTravelogues?.filter((travelogue) =>
    travelogue.cover_image_url !== null).slice(-3);
  const renderedTravelogues = traveloguesToShow?.map((travelogue) => {
    return <HomepageCard xs={4} key={travelogue.id} travelogue={travelogue} />;
  });


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
    backgroundImage: `url(${hero_1})`,
    display: 'flex',
    flexDirection: 'inline'
  }

  const heroLoggedIn = {
    minHeight: '31.25rem',
    borderRadius: '0px',
    color: 'white',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${hero_2})`,
    display: 'flex',
    justifyContent: 'center',
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
    fontSize: '2.75rem'
  }

  const discoverHeroSub = {
    fontSize: '1.5rem'
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
    color: 'white',
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

  const signupText = {
    fontSize: '2.5rem',
  }

  const button = {
    m: '1rem',
  }

  return (
    <>
    {user
    ?
      <Paper sx={heroLoggedIn}>
        <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
          <Box>
            <Typography sx={heroText}>See the world</Typography>
            <Typography sx={discoverHeroSub}>One travelogue at a time</Typography>
          </Box>
          <Box component="form" onSubmit={handleSearch} >
            <TextField
              id="search-bar"
              label="Search"
              variant="filled"
              placeholder="Search..."
              onChange={handleChange}
              sx={textField}
            />
            <Button variant='contained' type='submit' sx={searchButton}>Search</Button>
          </Box>
        </Box>
      </Paper>
    :
    <Paper sx={hero}>
        <Box sx={heroBox}>
          <Box sx={heroTextBox}>
            <Typography sx={heroText}>Welcome to Travelogue</Typography>
          </Box>
          <Box sx={searchBox} component="form" onSubmit={handleSearch} >
            <TextField
              id="search-bar"
              label="Search"
              variant="filled"
              placeholder="Search..."
              onChange={handleChange}
              sx={textField}
            />
            <Button variant='contained' type='submit' sx={searchButton}>Search</Button>
          </Box>
        </Box>
      </Paper>
    }
    <Paper sx={discoverHero}>
      <Box sx={discoverBox}>
        <Typography sx={discoverHeroText}>Stories from around the world</Typography>
        <Grid sx={{ display: 'flex' }}>
          {renderedTravelogues}
        </Grid>
        <Button variant='contained' component={ Link } to="/discover" sx={button}>Discover</Button>
      </Box>
    </Paper>
    <Paper sx={quoteHero}>
        <Typography sx={quoteText}>
          “Nothing behind me, everything ahead of me, as is ever so on the road.” 
          <Typography sx={{ fontStyle: 'italic', fontSize: '2rem'}}>- Jack Kerouac, On the Road</Typography>
        </Typography>
    </Paper>
    <Paper sx={signupHero}>
      {user 
      ?
      <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
        <Typography sx={signupText}>
          Share your stories.
        </Typography>
        <Button variant='contained' component={ Link } to="/travelogues/new" sx={button}>Post travelogue</Button>
      </Box>
      :
      <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
        <Typography sx={signupText}>
          Join our community
        </Typography>
        <Button variant='contained' component={ Link } to="/signup" sx={button}>Sign up</Button>
      </Box>
      }
    </Paper>
    </>
  )
}

export default Home