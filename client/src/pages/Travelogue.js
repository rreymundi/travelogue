import React, { useContext } from 'react';
import { TravelogueContext } from '../context/travelogue';
import { 
    Box, 
    Chip,
    Link,
    Paper,
    Typography 
  } from '@mui/material';

  const Travelogue = () => {
    const {travelogue} = useContext(TravelogueContext);
    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid',
    };
    console.log(travelogue)
    const hero = {
      justifySelf: 'center', 
      height: '20rem', 
      width: '40rem', 
      margin: '2rem',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(` + travelogue.cover_image_url +`)`,
      aspectRatio: '16 / 9',
    }

  return (
    <Box sx={boxStyle} >
      <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      <Paper sx={{ backgroundColor: 'white', justifySelf: 'center', mb: '3rem'} }>
        <Paper variant="outlined" sx={hero} />
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
            {travelogue?.tags?.map((tag) => <Chip label={tag.name} key={tag.id} sx={{ mr: '.5rem'}} />)}
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