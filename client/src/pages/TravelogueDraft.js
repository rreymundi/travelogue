import React, { useState, useContext } from 'react';
import { 
    Autocomplete,
    Box, 
    Button,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography 
  } from '@mui/material';

const TravelogueDraft = () => {
    const locations = [
      { id:1, name: "italy" },
      { id:2, name: "spain" },
      { id:3, name: "france" },
    ]
    const [formData, setFormData] = useState({
      title: "",
      location: "",
      description: "",
    });

    const handleChange = (e) => {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      })
    };

    const boxStyle = {
        backgroundColor: '#F7F7F6',
        padding: '3rem',
        display: 'grid',
    };

  return (
    <Box sx={boxStyle}>
      <Box>
        <Box>
          <Typography sx={{ fontSize: '3.5rem' }}>New Draft</Typography>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={8}>
          <Typography>Title</Typography>
          <TextField 
            id="title" 
            name="title" 
            variant="filled"                    
            placeholder="Title" 
            value={formData.title} 
            onChange={handleChange} 
            sx={{ width: '75%'}}
          />
        </Grid>
        <Grid item xs={4}>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ alignSelf: 'end', width: '10rem' }}
          >
            Add cover image
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Location</Typography>
          <Autocomplete
            id="location"
            sx={{ width: 300 }}
            options={locations}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a location"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Description</Typography>
          <TextField 
            multiline
            rows={16}
            id="description" 
            name="description" 
            variant="filled"                    
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item sx={{ ml: 'auto', mr: 'auto'}}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>Publish</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TravelogueDraft