import React, { useState, useContext } from 'react';
import { ErrorContext } from '../context/error';
import { useNavigate } from "react-router-dom"
import { 
    Box, 
    Button,
    Grid,
    Link,
    TextField,
    Typography 
  } from '@mui/material';
import LocationMenu from '../components/LocationMenu';
import Tags from '../components/Tags';

const TravelogueDraft = ({ allTags, onAddTravelogue }) => {
  const {setErrors} = useContext(ErrorContext);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });
  const [inputValue, setInputValue] = useState('');
  const data = new FormData();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };
  const [buttonText, setButtonText] = useState('Add cover image');

  const handleImageUpload = (e) => {
    data.append('cover_image', e.target.files[0])
  };

  const [postTags, setPostTags] = useState([]);

  const handleSetTags = (e, newValue) => {
    setPostTags(newValue)
  };
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
        data.append('title', formData.title)
        data.append('description', formData.description)
        data.append('location', inputValue)
        data.append('tags', postTags)
          fetch(`/travelogues/`, {
            method: "POST",
            body: data,
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((newTravelogue) => onAddTravelogue(newTravelogue))
                navigate('/travelogues')
              } else {
                r.json().then((errorData) => setErrors(errorData.errors))
            }
        })
    };

  const boxStyle = {
      backgroundColor: '#F7F7F6',
      padding: '3rem',
      display: 'grid',
  };

  return (
    <Box sx={boxStyle} component='form' onSubmit={handleSubmit}>
      <Box>
        <Box>
          <Typography sx={{ fontSize: '3.5rem' }}>New Draft</Typography>
        </Box>
      </Box>
      <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      {/* <Paper sx={{ justifySelf: 'center'}}>TEST</Paper> */}
      {/* <Paper variant="outlined" sx={{ justifySelf: 'center', height: '20rem', width: '40rem', margin: '2rem'}}>
        ADD AN IMG ELEMENT HERE LATER
      </Paper> */}
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
        <Grid item xs={3} sx={{ alignSelf: 'end'}}>
          <Button
            variant="contained"
            component="label"
            sx={{ width: '10rem', textAlign: 'center' }}
            onClick={() => setButtonText('Change cover image')}
            >
              {buttonText}
            <input
                id="cover_image"
                name="cover_image"
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                hidden
                onChange={handleImageUpload}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Location</Typography>
          <LocationMenu inputValue={inputValue} setInputValue={setInputValue}/>
        </Grid>
        <Grid item xs={5}>
          <Tags allTags={allTags} postTags={postTags} handleSetTags={handleSetTags} />
        </Grid>
        <Grid item xs={12}>
          <Typography>Description</Typography>
          <TextField 
            multiline
            rows={8}
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