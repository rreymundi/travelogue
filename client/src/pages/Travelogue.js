import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TravelogueContext } from '../context/travelogue';
import { ErrorContext } from '../context/error';
import { 
    Avatar,
    Box, 
    Chip,
    Paper,
    Typography 
  } from '@mui/material';
  import parse from 'html-react-parser';

  const Travelogue = () => {
    const {travelogue, setTravelogue} = useContext(TravelogueContext);
    const {setErrors} = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    // const [isMounted, setIsMounted] = useState(false);
    const { id } = useParams();

    useEffect(() => {
      setIsLoading(true);
      fetch(`/travelogues/${id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setTravelogue(data))
        } else {
          r.json().then((data) => setErrors(data.errors))
        }
      })
      setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // useEffect(() => {
    //   setIsMounted(true);
    //   const fetchData = async () => {
    //     setIsLoading(true);
    //     const r = await fetch(url);
    //     const data = await r.json();
    //     if (r.ok) {
    //       setTravelogue(data)
    //       } else {
    //       setErrors(data.errors)
    //     }
    //     setIsLoading(false)
    //   };
    //   fetchData();
    //   return () => {
    //     setIsMounted(false);
    //   };
    // }, [setTravelogue, setErrors, url]);

    // this variable makes use of the html-react-parser library to 
    // parse the travelogue description from HTML to JSX
  const renderedDescription = parse(`${travelogue.description}`)

  if (isLoading) return <p>Loading ...</p>

  return (
    <Box sx={{
          padding: '3rem',
          display: 'grid',
          minHeight: '100vh',
        }} 
      >
      {/* <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link> */}
      <Paper sx={{
            backgroundColor: 'white', 
            justifySelf: 'center', 
            padding: '2rem',
            width: '40rem'
          }}
        >
        { travelogue.cover_image_url !== null 
        ? <Paper variant="outlined" sx={{
            justifySelf: 'center', 
            height: '20rem', 
            width: '40rem', 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(` + travelogue.cover_image_url +`)`,
            aspectRatio: '16 / 9',
          }} 
          />
        : null }
        <Box
          spacing={2}
          sx={{ m: '2rem' }}
          >
          <Box xs={9} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold'}}>{travelogue?.title}</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Avatar sx={{ height: '30px', width: '30px', mr: 'auto', ml: 'auto' }} alt={travelogue?.user?.username} src={travelogue?.user?.avatar_url} />
              <Typography gutterBottom variant="body2" color="text.secondary" >
                {travelogue?.user?.username}
              </Typography>
            </Box>
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
            <Typography variant='body'>{renderedDescription}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Travelogue