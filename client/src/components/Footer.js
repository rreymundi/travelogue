import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Paper sx={{
          width: '100%',
          // position: 'fixed',
          marginTop: 'auto',
          marginBottom: 'auto',
          // bottom: 0,
          backgroundColor: '#1976d2',
        }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                my:1
              }}
            >
            </Box>
    
            <Box sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  display: "flex",
                  mb: 2,
                }}
              >
              <Typography variant="caption" color="white">
                Copyright ©2022. travelogue limited
              </Typography>
            </Box>
          </Container>
        </Paper>
      );
}

export default Footer;