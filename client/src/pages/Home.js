import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import Search from '../components/Search';

const Home = ({ onSearch, allTravelogues, onBookmarkSave, onBookmarkUnsave }) => {
  const { user } = useContext(UserContext);
  let [searchParams, setSearchParams] = useSearchParams();
  
  let navigate = useNavigate()
  
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value)
  };
    
  const handleSearch = (e) => {
    e.preventDefault();
    // setSearchParams({query: query})
    // if (query === '') {
    //   navigate('/discover')
    // } else { 
      navigate(`/discover?query=${query}`)
    // }
  };

  const traveloguesToShow = allTravelogues?.filter((travelogue) =>
    travelogue.cover_image_url !== null).slice(-3);
  const renderedTravelogues = traveloguesToShow?.map((travelogue) => {
    return <HomepageCard xs={4} key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />;
  });

  return (
    <>
    {user
    ?
      <Paper sx={{
          minHeight: '31.25rem',
          borderRadius: '0px',
          color: 'white',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${hero_2})`,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
          <Box>
            <Typography sx={{
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif,',
                fontWeight: 400,
                fontSize: '6.5rem',
                lineHeight: 1.167,
                letterSpacing: '0em',
                color: 'inherit',
                ml: '4rem',
              }}
              >
              See the world
            </Typography>
            <Typography sx={{ fontSize: '1.5rem' }}>One travelogue at a time</Typography>
          </Box>
          <Search 
            handleChange={handleChange} 
            handleSearch={handleSearch} 
            />
        </Box>
      </Paper>
    :
    <Paper sx={{
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
          flexDirection: 'inline',
          }}
        >
        <Box sx={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'inline'
            }}
          >
          <Box sx={{
              m: '2rem',
              width: '50%',
              display: 'flex',
              justifyContent: 'center'
              }}
            >
            <Typography sx={{
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif,',
                fontWeight: 400,
                fontSize: '6.5rem',
                lineHeight: 1.167,
                letterSpacing: '0em',
                color: 'inherit',
                ml: '4rem',
              }}
              >
              Welcome to Travelogue
            </Typography>
          </Box>
          <Search
            handleChange={handleChange} 
            handleSearch={handleSearch} 
            />
        </Box>
      </Paper>
    }
    <Paper sx={{
          minHeight: '31.25rem',
          borderRadius: '0px',
          backgroundColor: '#F7F7F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
      <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Typography sx={{
            fontSize: '2.75rem'
            }}
          >
          Stories from around the world
        </Typography>
        <Grid sx={{ display: 'flex' }}>
          {renderedTravelogues}
        </Grid>
        <Button variant='contained' component={ Link } to="/discover" sx={{ m: '1rem' }}>Discover</Button>
      </Box>
    </Paper>
    <Paper sx={{
        minHeight: '20.83rem',
        borderRadius: '0px',
        position: 'relative',
        color: '#282828',
        // backgroundColor: '#E6C327',
        background: 'linear-gradient(to right bottom, #6B0AC9, #E6FF27)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem'  
        }}
        >
        <Typography sx={{
            fontSize: '4rem',
            textAlign: 'center',
            color: 'white',
          }}
          >
          “Nothing behind me, everything ahead of me, as is ever so on the road.” 
        </Typography>
        <Typography sx={{ fontStyle: 'italic', fontSize: '2rem', color: 'white' }}>- Jack Kerouac, On the Road</Typography>
    </Paper>
    <Paper sx={{
        minHeight: '20.83rem',
        borderRadius: '0px',
        position: 'relative',
        color: '#282828',
        backgroundColor: '#F7F7F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
      {user 
      ?
      <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
        <Typography sx={{ fontSize: '2.5rem' }}>
          Share your stories.
        </Typography>
        <Button variant='contained' component={ Link } to="/travelogues/new" sx={{ m: '1rem' }}>Post travelogue</Button>
      </Box>
      :
      <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
        <Typography sx={{ fontSize: '2.5rem' }}>
          Join our community
        </Typography>
        <Button variant='contained' component={ Link } to="/signup" sx={{ m: '1rem' }}>Sign up</Button>
      </Box>
      }
    </Paper>
    </>
  )
}

export default Home