import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { ErrorContext } from '../context/error';
import { Link } from "react-router-dom";
import { 
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import HomepageCard from '../components/HomepageCard';
import hero_1 from '../assets/hero_1.jpg';
import hero_2 from '../assets/hero_2.jpg';
import Search from '../components/Search';

const Home = ({ allTravelogues, onBookmarkSave, onBookmarkUnsave, handleSearch, page, query, setQuery }) => {
  const { user } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);  

  const handleChange = (e) => {
    setQuery(e.target.value)
  };

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(query)
  };

  const traveloguesToShow = allTravelogues?.filter((travelogue) =>
    travelogue.cover_image_url !== null).slice(0, 3);
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
            handleSearch={onSearch} 
            />
        </Box>
      </Paper>
    :
    <Paper sx={{
          minHeight: '31.25rem',
          borderRadius: '0px',
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
            handleSearch={onSearch} 
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
        <Button variant='contained' component={ Link } to={`/discover?page=${page}`} sx={{ m: '1rem' }}>Discover</Button>
      </Box>
    </Paper>
    <Paper sx={{
        minHeight: '20.83rem',
        borderRadius: '0px',
        position: 'relative',
        color: '#282828',
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
        <Button variant='contained' component={ Link } to="/mytravelogues/new" sx={{ m: '1rem' }}>Post travelogue</Button>
      </Box>
      :
      <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto' }}>
        <Typography sx={{ fontSize: '2.5rem' }}>
          Join our community
        </Typography>
        <Button variant='contained' component={ Link } to="/signup" sx={{ m: '1rem' }} onClick={() => setErrors(null)}>Sign up</Button>
      </Box>
      }
    </Paper>
    </>
  )
}

export default Home