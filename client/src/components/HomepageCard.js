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
  let navigate = useNavigate();

  const handleSaveClick = () => {
    onBookmarkSave(travelogue.id)
  };

  const handleUnsaveClick = () => {
    onBookmarkUnsave(travelogue.id)
  };

  const renderedBookmarkButton = user?.saved_posts.find(post => 
    post.travelogue_id === travelogue.id) 
    ? <BookmarkIcon onClick={handleUnsaveClick} /> 
    : <BookmarkBorderIcon onClick={handleSaveClick} />

  const handleClick = () => {
    navigate(`/travelogues/${travelogue.id}`)
  };

  return (
    <Card sx={{ width: '250px', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
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
          {travelogue.description.slice(0, 25) + '...'}
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