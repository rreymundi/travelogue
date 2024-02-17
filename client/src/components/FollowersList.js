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

const FollowersList = ({ followers, following, onFollowClick, onUnfollowClick }) => {
    const [secondary] = useState(false);

    const renderedActiveFollows = followers?.map((follower) =>
        <ListItem
            key={follower.id}
            secondaryAction={
                following?.find(follow => follow.id === follower.id) 
                ?   <Button variant='contained' size="small" onClick={() => onUnfollowClick(follower)} >
                        Unfollow
                    </Button>
                :   <Button variant='outlined' size="small" onClick={() => onFollowClick(follower)} >
                        Follow
                    </Button>
            }
        >
            <ListItemAvatar>
                <Avatar alt={follower.username} src={follower.avatar_url} />
            </ListItemAvatar>
            <ListItemText
                primary={follower.username}
                secondary={secondary ? 'Secondary text' : null}
            />
        </ListItem>
    );

  return (
    <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Followers
        </Typography>
        <List>
            {renderedActiveFollows}
        </List>
    </Grid>
  )
}

export default FollowersList