import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import FollowingList from "../components/FollowingList";
import FollowersList from "../components/FollowersList";

const Following = ({ user, onUnfollowClick, onFollowClick }) => {
  return (
    <Box
      sx={{
        padding: "3rem",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "2.5rem" }}>Following</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>
          People you follow or that follow you.
        </Typography>
        <Box sx={{ m: "1rem", textAlign: "end" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/discover"
          >
            Discover
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <FollowingList
              following={user.following}
              onUnfollowClick={onUnfollowClick}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <FollowersList
              followers={user.followers}
              following={user.following}
              onFollowClick={onFollowClick}
              onUnfollowClick={onUnfollowClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Following;
