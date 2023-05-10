import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, 
  Box,
  Button,
  Card,
  CardMedia,
  Typography
 } from '@mui/material';
 import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
 import BookmarkIcon from '@mui/icons-material/Bookmark';
 import { UserContext } from '../context/user';

const TravelogueCard = ({ travelogue, onBookmarkSave, onBookmarkUnsave }) => {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const publishedDate = new Date(travelogue.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleClick = () => {
    navigate(`/travelogues/${travelogue.id}`)
  };

  const handleSaveClick = (e) => {
    onBookmarkSave(travelogue.id)
  };

  const handleUnsaveClick = (e) => {
    onBookmarkUnsave(travelogue.id)
  };

  // this checks user.saved_posts to see if the travelogue is saved by the user and renders the appropriate icon
  const renderedBookmarkButton = user?.saved_posts.find(post => 
    post.travelogue_id === travelogue.id) 
    ? <BookmarkIcon onClick={handleUnsaveClick} /> 
    : <BookmarkBorderIcon onClick={handleSaveClick} />;

  // this uses regex to strip html tags from the travelogue.description returned from the API
  const htmlString = `${travelogue.description}`;
  const plainString = htmlString.replace(/(<([^>]+)>)/ig, '');  
  
  return (
    <Card sx={{ width:'100%', heigh: '100%', margin: '1rem' }}>
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'space-between', boxSizing: 'border-box' }}>
          <Box sx={{ width:'100%', minWidth: '0', padding: '1rem'}} >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar sx={{ height: '30px', width: '30px' }} alt={travelogue?.user?.username} src={travelogue?.user?.avatar_url} />
              <Typography gutterBottom variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: '1rem' }}>
                {travelogue?.user?.username}
              </Typography>
            </Box>
            <Box onClick={handleClick} sx={{ cursor: 'pointer'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{ maxHeight: 'none'}}>
                {travelogue.title}
              </Typography>
              <Typography variant="body2" color="primary" >
                {travelogue.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '4px' }}>
                {plainString.slice(0, 70) + '...'}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} >
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: '0.375rem' }}>
                  {publishedDate}
                </Typography>
                {travelogue?.tags?.map((tag) => 
                  <Typography key={tag.id} variant="body2" color="primary" sx={{ ml: '0.375rem' }}>
                    #{tag.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display:'flex' }} >
                <Button size="small">
                  {renderedBookmarkButton}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            { travelogue.cover_image_url !== null 
              ?
              <CardMedia
                  sx={{ verticalAlign: 'middle', width: '275px', aspectRatio: 'auto 200 / 134 ', height: '100%', cursor: 'pointer' }}
                  image={travelogue.cover_image_url}
                  title="travelogue image"
                  onClick={handleClick}
              />
              : null }
          </Box>
        </Box>
    </Card>
  );
}

export default TravelogueCard