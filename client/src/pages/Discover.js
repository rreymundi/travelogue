import React from 'react';
import { Box,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';

const Discover = ({ allTravelogues, onBookmarkSave, onBookmarkUnsave, searchedTravelogues }) => {

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid',
        minHeight: '100vh',
    };
    
    const renderedResults = searchedTravelogues?.length > 0
    ?   <Grid container spacing={2}>
            {searchedTravelogues?.map((travelogue) => (
                <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
            ))}
        </Grid>
    :   <Grid container spacing={2}>
            {allTravelogues?.map((travelogue) => (
                <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
            ))}
        </Grid>

    return (
      <Box sx={boxStyle}>
        <Box>
            <Box >
                <Typography sx={{ fontSize: '3.5rem' }}>Discover</Typography>
                <Typography sx={{ fontSize: '1.5rem'}}>
                    Browse through the latest travelogues
                </Typography>
                <Box sx={{ margin: '2.5rem'}}>
                    {renderedResults}
                </Box>
            </Box>
        </Box>      
      </Box>
    )
}

export default Discover