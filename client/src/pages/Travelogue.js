import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TravelogueContext } from '../context/travelogue';
import { 
    Avatar,
    Box, 
    Button, 
    Chip,
    Paper,
    Typography 
  } from '@mui/material';
import { UserContext } from '../context/user';
import parse from 'html-react-parser';
import LoadingSpinner from '../components/LoadingSpinner';

  const Travelogue = ({ onFollowClick, onUnfollowClick }) => {
    const {travelogue, setTravelogue} = useContext(TravelogueContext);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    
    useEffect(() => {
      fetch(`/travelogues/${id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setTravelogue(data))
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const r = await fetch(`/travelogues/${id}`);
        const data = await r.json();
        setTravelogue(data);
        setIsLoading(false);
      };
      fetchData();
    }, [setTravelogue, id]);

    const handleFollowClick = (e) => {
      onFollowClick(travelogue.user)
    };
    
    const handleUnfollowClick = (e) => {
      onUnfollowClick(travelogue.user)
    };

    // this variable makes use of the html-react-parser library to 
    // parse the travelogue description from HTML to JSX
  const renderedDescription = parse(`${travelogue.description}`)

  const renderedFollowButton = user?.following?.find(follow =>
    follow.id === travelogue?.user?.id)
    ? <Button variant='contained' size="small" onClick={handleUnfollowClick}>
        Unfollow
      </Button>
    : <Button variant='outlined' size="small" onClick={handleFollowClick}>
        Follow
      </Button>
      
  if (isLoading) return <LoadingSpinner />;

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
          <Box xs={9} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold'}}>{travelogue?.title}</Typography>
            <Box sx={{ textAlign: 'center', height: '96px', width: '96px' }}>
              <Avatar sx={{ height: '40px', width: '40px', mr: 'auto', ml: 'auto' }} alt={travelogue?.user?.username} src={travelogue?.user?.avatar_url} />
              <Typography gutterBottom variant="body2" color="text.secondary" >
                {travelogue?.user?.username}
              </Typography>
              {user && user?.id !== travelogue?.user.id ? renderedFollowButton : null}
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