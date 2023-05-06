import React from 'react';
import { Box,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';

const Discover = ({ allTravelogues }) => {

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid'
    };

    return (
      <Box sx={boxStyle}>
        <Box>
            <Box >
                <Typography sx={{ fontSize: '3.5rem' }}>Discover</Typography>
                <Typography sx={{ fontSize: '1.5rem'}}>
                    Browse through the latest travelogues
                </Typography>
                <Box sx={{ margin: '2.5rem'}}>
                    <Grid container spacing={2}>
                        {allTravelogues?.map((travelogue) => (
                            <TravelogueCard item key={travelogue.id} travelogue={travelogue} />
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>      
      </Box>
    )
}

export default Discover