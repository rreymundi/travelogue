import React, { useState, useContext, useEffect } from 'react';
import { Box,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';
import { ErrorContext } from '../context/error';
import { useLocation } from 'react-router-dom';

const Discover = ({ allTravelogues, onBookmarkSave, onBookmarkUnsave }) => {
    const {errors, setErrors} = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const location = useLocation();

    // this useEffect is for when the user searches for a travelogue
    // it makes use of the useLocation hook to get the query string from the location hash
    // it then sends a GET request to the "query" from the '/discover/search/:query' route
    // which corresponds to the "travelogues#search" action in the travelogues controller
    useEffect(() => {
        setIsLoading(true);
        fetch(`/discover/search/${new URLSearchParams(location.search).get('query')}`)
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => setSearchResults(data))
          } else {
            r.json().then((data) => setErrors(data.errors))
          }
        })
        setIsLoading(false)
    }, []);

    // conditional rendering of the travelogue cards
    // if the searchResults array is null (i.e. the user has not searched for anything or
    // attempted to search an empty string), then the allTravelogues array is mapped over
    const renderedResults = searchResults.length > 0
    ?   <Grid container spacing={2}>
            {searchResults?.map((travelogue) => (
                <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
            ))}
        </Grid>
    :   <>
        <Grid container spacing={2}>
          {allTravelogues?.map((travelogue) => (
            <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
          ))}
        </Grid>
        </>

    // const rendered = () => {
    //   if (searchResults.length === 0) {
    //     return <Typography>No results</Typography>
    //   } else if (searchResults.length > 0) {
    //     return <Grid container spacing={2}>
    //               {searchResults?.map((travelogue) => (
    //                 <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
    //               ))}
    //             </Grid>
    //     } else {
    //       return <Grid container spacing={2}>
    //                 {allTravelogues?.map((travelogue) => (
    //                   <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
    //                 ))}
    //               </Grid>
    //     }
    // };

    if (isLoading) return <p>Loading...</p>

    return (
      <Box sx={{
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid',
        minHeight: '100vh',
      }}>
        <Box>
            <Box >
                <Typography sx={{ fontSize: '3.5rem' }}>Discover</Typography>
                <Typography sx={{ fontSize: '1.5rem'}}>
                    Browse through the latest travelogues
                </Typography>
                <Box sx={{ margin: '2.5rem'}}>
                  <Grid container spacing={2}>
                    {renderedResults}
                  </Grid>
                </Box>
            </Box>
        </Box>      
      </Box>
    )
}

export default Discover