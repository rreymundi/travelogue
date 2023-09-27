import React, { useState, useContext, useEffect } from 'react';
import { Box,
    Button,
    Grid, 
    Typography,
} from '@mui/material';
import TravelogueCard from '../components/TravelogueCard';
import { ErrorContext } from '../context/error';
import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search';

const Discover = ({ onBookmarkSave, onBookmarkUnsave, handleSearch, setTotalPages, totalPages, data, setData, page, setPage, query, setQuery }) => {
    const {setErrors} = useContext(ErrorContext);
    // const [query, setQuery] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState([]);
    // const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    
    const handleChange = (e) => {
      setQuery(e.target.value)
    };

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/discover/${page}`)
          const data = await res.json()
          setData((prev) => [...prev, ...data.travelogues])
          setTotalPages(data.total_pages)
        } catch (error) {
          setErrors(error);
        }
        setIsLoading(false);
      }
      fetchData();
    }, [page, setData, setErrors, setTotalPages]);

    // this fetch request is for the Search component in the Discover page
    // const handleSearch = (e) => {
    //   e.preventDefault();
    //   setSearchParams({'query': query})
    //   fetch(`/discover/${page}/${query}`)
    //   .then((r) => {
    //     if (r.ok) {
    //       r.json().then((data) => setData(data.travelogues))
    //       setTotalPages(data.total_pages)
    //     } else {
    //       r.json().then((data) => setErrors(data.errors))
    //     }
    //   })
    // };

    const onSearch = (e) => {
      e.preventDefault();
      handleSearch(query)
    };

    const onLoadMore = () => {
      setPage((prev) => prev + 1)
    }

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
                    {data?.map((travelogue) => (
                      <TravelogueCard item key={travelogue.id} travelogue={travelogue} onBookmarkSave={onBookmarkSave} onBookmarkUnsave={onBookmarkUnsave} />
                    ))}
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