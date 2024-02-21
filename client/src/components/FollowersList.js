import React from 'react';
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

const FollowersList = ({ 
    followers, 
    following, 
    onFollowClick, 
    onUnfollowClick 
}) => {

    const renderFollowButton = (follower) => {
        const isFollowing = following?.find(follow => follow.id === follower.id);
        const handleClick = isFollowing ? () => onUnfollowClick(follower) : () => onFollowClick(follower);
        const buttonVariant = isFollowing ? 'contained' : 'outlined';
        const buttonText = isFollowing ? 'Unfollow' : 'Follow';

        return (
            <Button variant={buttonVariant} size="small" onClick={handleClick}>
                {buttonText}
            </Button>
        );
    };

    const renderedActiveFollows = followers?.map((follower) =>
        <ListItem key={follower.id} secondaryAction={renderFollowButton(follower)}>
            <ListItemAvatar>
                <Avatar alt={follower.username} src={follower.avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={follower.username} />
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