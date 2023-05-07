import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TravelogueContext } from '../context/travelogue';
import { ErrorContext } from '../context/error';
import { 
    Box, 
    Chip,
    Link,
    Paper,
    Typography 
  } from '@mui/material';

  const Travelogue = () => {
    const {travelogue, setTravelogue} = useContext(TravelogueContext);
    const {setErrors} = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { id } = useParams();

    const url = '/travelogues/' + id;

    useEffect(() => {
      setIsMounted(true);
      const fetchData = async () => {
        setIsLoading(true);
        const r = await fetch(url);
        const json = await r.json();
        if (r.ok) {
          setTravelogue(json)
          } else {
          setErrors(json.errors)
        }
        setIsLoading(false)
      };
      fetchData();
      return () => {
        setIsMounted(false);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //   setIsLoading(true);
    //   fetch(url)
    //   .then(r => {
    //     if (r.ok) {
    //       r.json().then((data) => setTravelogue(data))
    //     } else {
    //       r.json().then((data) => setErrors(data.errors))
    //     }
    //   });
    //   setIsLoading(false)
    // }, [setTravelogue, setErrors, url]);

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

  if (isLoading) return <div>Loading...</div>

  return (
    <Box sx={boxStyle} >
      {/* <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link> */}
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
            <Typography variant='body2' color="primary">{travelogue?.location}</Typography>
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