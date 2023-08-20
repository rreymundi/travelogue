import React, { useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from '@mui/material';

  const FollowingList = ({ following, onUnfollowClick }) => {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
      
    const renderedActiveFollows = following?.map((follow) =>
        <ListItem
            key={follow.id}
            secondaryAction={
                <Button variant='contained' size="small" onClick={() => onUnfollowClick(follow)} >
                    Unfollow
                </Button>
            }
        >
            <ListItemAvatar>
                <Avatar alt={follow.username} src={follow.avatar_url} />
            </ListItemAvatar>
            <ListItemText
                primary={follow.username}
                secondary={secondary ? 'Secondary text' : null}
            />
        </ListItem>
    );

  return (
    <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Following
        </Typography>
        <List dense={dense}>
            {renderedActiveFollows}
        </List>
    </Grid>
  )
}

export default FollowingList