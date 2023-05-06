import * as React from 'react';
import { 
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography
 } from '@mui/material';
 import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
 import BookmarkIcon from '@mui/icons-material/Bookmark';

const TravelogueCard = ({ travelogue }) => {

  const publishedDate = new Date(travelogue.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


  return (
    <Card sx={{ width:'100%', heigh: '100%', margin: '1rem' }}>
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'space-between', boxSizing: 'border-box' }}>
          <Box sx={{ width:'100%', minWidth: '0', padding: '1rem'}} >
            <Box>
              <Typography gutterBottom variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                AUTHOR NAME
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="h5" component="div" sx={{ cursor: 'pointer', maxHeight: 'none'}}>
                {travelogue.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {travelogue.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '4px', cursor: 'pointer' }}>
                {travelogue.description.slice(0, 70) + '...'}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} >
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', mr: '0.375rem' }}>
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
                  <BookmarkBorderIcon />
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            { travelogue.cover_image_url !== null 
              ?
              <CardMedia
                  sx={{ verticalAlign: 'middle', width: '275px', aspectRatio: 'auto 200 / 134 ', height: '100%' }}
                  image={travelogue.cover_image_url}
                  title="travelogue image"
              />
              : null }
          </Box>
        </Box>
    </Card>
  );
}

export default TravelogueCard