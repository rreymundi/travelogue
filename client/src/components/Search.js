import React from 'react';
import { 
    Box, 
    Button, 
    TextField 
} from '@mui/material';

const Search = ({ handleChange, handleSearch }) => {
    
  return (
    <Box 
        sx={{    
            margin: 'auto',
            }} 
        component="form" 
        onSubmit={handleSearch} 
        >
        <TextField
            id="search-bar"
            label="Search"
            variant="filled"
            placeholder="Search..."
            onChange={handleChange}
            sx={{
                backgroundColor: 'white', 
                margin: '8px',
                color: '#282828',
            }}
        />
        <Button variant='contained' type='submit' sx={{ margin: '1rem' }}>Search</Button>
  </Box>
  )
}

export default Search