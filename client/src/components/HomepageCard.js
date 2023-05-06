import * as React from 'react';
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

const HomepageCard = ({ travelogue }) => {
  return (
    <Card sx={{ width: '250px', margin: '1rem' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={travelogue.cover_image_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {travelogue.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {travelogue.description.slice(0, 25) + '...'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between'}}>
        <Button size="small">Read</Button>
        <Button size="small">
            <BookmarkBorderIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default HomepageCard