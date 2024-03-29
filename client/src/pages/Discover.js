import React, { useState, useContext, useEffect } from 'react';
import { Box,
    Button,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';
import { ErrorContext } from '../context/error';
import Search from '../components/Search';

const Discover = ({ 
  onBookmarkSave, 
  onBookmarkUnsave, 
  handleSearch, 
  setTotalPages, 
  totalPages, 
  data, 
  setData, 
  page, 
  setPage, 
  query, 
  setQuery, 
  setSearchParams,
  queryParam
  }) => {
    const {setErrors} = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e) => {
      setQuery(e.target.value)
    };

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/discover/${page}/${queryParam}`)
          const d = await res.json()
          page === 1 ? setData(d.travelogues) : setData((prev) => [...prev, ...d.travelogues])
          setTotalPages(d.total_pages)
        } catch (error) {
          setErrors(error);
        }
        setIsLoading(false);
      }
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, queryParam]);

    const onSearch = (e) => {
      e.preventDefault();
      handleSearch(query)
    };

    const onLoadMore = () => {
      setPage(prev => {
        const newPage = prev + 1;
        setSearchParams({ page: newPage, query: queryParam });
        return newPage;
      });
    };

    const renderedCards = data?.map((travelogue) => (
      <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
      ))

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
          <Search handleChange={handleChange} handleSearch={onSearch} />
        </Box>
        <Box sx={{ margin: '2.5rem'}}>
          <Grid container spacing={2}>
            <Grid container spacing={2}>
              {renderedCards}
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: 'center', m: '1rem' }}>
          {page < totalPages && (<Button
            variant="contained"
            onClick={onLoadMore}
            >
            {isLoading ? "Loading..." : "Load More"}
            </Button>)}
        </Box>
    </Box>
        </Box>      
      </Box>
    )
}

export default Discover