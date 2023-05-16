import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { UserContext } from '../context/user';

const HomepageCard = ({ travelogue, onBookmarkSave, onBookmarkUnsave }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSaveClick = () => {
    onBookmarkSave(travelogue.id)
  };

  const handleUnsaveClick = () => {
    onBookmarkUnsave(travelogue.id)
  };

  const handleClick = () => {
    navigate(`/travelogues/${travelogue.id}`)
  };

  // this checks user.saved_posts to see if the travelogue is saved by the user and renders the appropriate icon
  const renderedBookmarkButton = user?.saved_posts.find(post => 
    post.travelogue_id === travelogue.id) 
    ? <BookmarkIcon onClick={handleUnsaveClick} /> 
    : <BookmarkBorderIcon onClick={handleSaveClick} />

  // this uses regex to strip html tags from the travelogue.description returned from the API
  const htmlString = `${travelogue.description}`;
  const plainString = htmlString.replace(/(<([^>]+)>)/ig, '');

  return (
    <Card sx={{ 
        width: '250px', 
        margin: '1rem', 
        display: 'flex', 
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateX(-2px) translateY(-2px)'
          },
        transition: 'all 450ms cubic-bezier(0.175, 0.885, 0.335, 1)',
        }}
      >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={travelogue.cover_image_url}
      />
      <CardContent>
        <Typography gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
          {travelogue.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plainString.slice(0, 50) + '...'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', marginTop: 'auto'}}>
        <Button size="small" onClick={handleClick} >
          Read
        </Button>
        <Button size="small" >
            {renderedBookmarkButton}
        </Button>
      </CardActions>
    </Card>
  );
}

export default HomepageCard