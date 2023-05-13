import React, { useState, useContext, useEffect } from 'react';
import { Box,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';
import { ErrorContext } from '../context/error';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Search from '../components/Search';

const Discover = ({ allTravelogues, onBookmarkSave, onBookmarkUnsave }) => {
    const {errors, setErrors} = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate()
  
    const handleChange = (e) => {
      setQuery(e.target.value)
    };
      

    // this fetch request is for the Search component in the Discover page
    const handleSearch = (e) => {
      e.preventDefault();
      setSearchParams({query: query})
      fetch(`/discover/${query}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setSearchResults(data))
        } else {
          r.json().then((data) => setErrors(data.errors))
        }
      })
    };

    // this useEffect is for when the user searches for a travelogue
    // it makes use of the useLocation hook to get the query string from the location hash
    // it then sends a GET request to the "query" from the '/discover/search/:query' route
    // which corresponds to the "travelogues#search" action in the travelogues controller
    
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(`/discover/search/${new URLSearchParams(location.search).get('query')}`)
    //     .then((r) => {
    //       if (r.ok) {
    //         r.json().then((data) => setSearchResults(data))
    //       } else {
    //         r.json().then((data) => setErrors(data.errors))
    //       }
    //     })
    //     setIsLoading(false)
    // }, []);

    useEffect(() => {
      setIsMounted(true);
      const fetchData = async () => {
        setIsLoading(true);
        const r = await fetch(`/discover/${new URLSearchParams(location.search).get('query')}`);
        const data = await r.json();
        if (r.ok) {
          setSearchResults(data)
          } else {
          setErrors(data.errors)
        }
        setIsLoading(false)
      };
      fetchData();
      return () => {
        setIsMounted(false);
      };
    }, [setSearchResults, setErrors]);

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
            <Box>
                <Typography sx={{ fontSize: '2.5rem' }}>Discover</Typography>
                <Typography sx={{ fontSize: '1.5rem'}}>
                    Browse through the latest travelogues
                </Typography>
                <Box sx={{ textAlign: 'center', m: '1rem' }}>
                  <Search handleChange={handleChange} handleSearch={handleSearch} />
                </Box>
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