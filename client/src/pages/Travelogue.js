import React, { useContext, useEffect } from 'react';
import { TravelogueContext } from '../context/travelogue';
import { ErrorContext } from '../context/error';
import { 
    Box, 
    Chip,
    Link,
    Paper,
    Typography 
  } from '@mui/material';
import { useParams } from 'react-router-dom';

  const Travelogue = () => {
    const {travelogue, setTravelogue} = useContext(TravelogueContext);
    const {errors, setErrors} = useContext(ErrorContext);

    let { id } = useParams();

    useEffect( () => {
      fetch(`/travelogues/${id}`)
      .then((r) => {
          if (r.ok) {
            r.json().then((r) => setTravelogue(r))
          } else {
            r.json().then((r) => setErrors(r.errors))
          }
      });
      }, [id, setErrors, setTravelogue]);


    const boxStyle = {
      backgroundColor: '#F7F7F6',
      padding: '3rem',
      display: 'grid',
    };

    const paperContainer = {
      backgroundColor: 'white', 
      justifySelf: 'center', 
      padding: '2rem',
      width: '40rem'
    };
    
    const coverImage = {
      justifySelf: 'center', 
      height: '20rem', 
      width: '40rem', 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(` + travelogue.cover_image_url +`)`,
      aspectRatio: '16 / 9',
    }

  return (
    <Box sx={boxStyle} >
      <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      <Paper sx={paperContainer}>
        { travelogue.cover_image_url !== null 
        ? <Paper variant="outlined" sx={coverImage} />
        : null }
        <Box
          spacing={2}
          sx={{ m: '2rem' }}
          >
          <Box xs={9} sx={{ mb: '.5rem' }}>
            <Typography variant='h4'>{travelogue?.title}</Typography>
          </Box>
          <Box xs={12} sx={{ mb: '1rem' }}>
            <Typography variant='body2'>{travelogue?.location}</Typography>
          </Box>
          <Box xs={3} sx={{ mt: '1rem', mb: '1rem' }}>
            {travelogue?.tags?.map((tag) => 
              <Chip 
                label={tag.name} 
                key={tag.id} 
                sx={{ mr: '.5rem'}} 
                variant="filled" 
                color="primary"
                />
            )}
          </Box>
          <Box xs={12} sx={{ mt: '1rem', mb: 'rem' }}>
            <Typography variant='body'>{travelogue?.description}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Travelogue