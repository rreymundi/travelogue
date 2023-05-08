import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContext } from '../context/error';
import { TravelogueContext } from '../context/travelogue';
import { useNavigate } from "react-router-dom"
import { 
    Box, 
    Button,
    Grid,
    Link,
    Paper,
    TextField,
    Typography 
  } from '@mui/material';
import LocationMenu from '../components/LocationMenu';
import Tags from '../components/Tags';

const TravelogueEdit = ({ onUpdateTravelogue, allTags }) => {
  const {setErrors} = useContext(ErrorContext);
  const {travelogue, setTravelogue} = useContext(TravelogueContext);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useParams();
  const url = '/travelogues/' + id;

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      setIsLoading(true);
      const r = await fetch(url);
      const json = await r.json();
      if (r.ok) {
        setTravelogue(json)
        } else {
        setErrors(json.errors)
      }
      setIsLoading(false)
    };
    fetchData();
    return () => {
      setIsMounted(false);
    };
  }, [setTravelogue, setErrors, url]);

  const [formData, setFormData] = useState({
    title: travelogue.title,
    location: travelogue.location,
    description: travelogue.description,
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  // const handleImageChange = (e) => {
  //   data.append('cover_image', e.target.files[0])
  // };

  const [postTags, setPostTags] = useState([]);

  const handleSetTags = (e, newValue) => {
    setPostTags(newValue)
  };

  const navigate = useNavigate();
  
  const handleImageUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("cover_image", e.target.files[0]);
    fetch(`/travelogue/${travelogue.id}/cover`, {
        method: 'POST',
        body: data
    })
    .then((r) => {
      if (r.ok) {
          r.json()
          .then((r) => onUpdateTravelogue(r))
        } else {
          r.json().then((r) => setErrors(r.errors))
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTravelogue = {
      title: formData.title,
      description: formData.description,
      location: inputValue,
      tags: postTags
      };
    fetch(`/travelogues/${travelogue.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTravelogue)
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((r) => onUpdateTravelogue(r))
        navigate('/travelogues')
      } else {
        r.json().then((r) => setErrors(r.errors))
      }
    })
  };

  const boxStyle = {
      backgroundColor: '#F7F7F6',
      padding: '3rem',
      display: 'grid',
      minHeight: '100vh',
  };

  const coverImage = {
    justifySelf: 'center', 
    height: '20rem', 
    width: '40rem', 
    margin: '2rem',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(` + travelogue.cover_image_url +`)`,
    aspectRatio: '16 / 9',
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Box sx={boxStyle} component='form' onSubmit={handleSubmit}>
      <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      { travelogue.cover_image_url !== null 
        ? <Paper variant="outlined" sx={coverImage} />
        : null }
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={9}>
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
            >
              Update cover image
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
          <LocationMenu inputValue={inputValue} setInputValue={setInputValue} location={travelogue.location}/>
        </Grid>
        <Grid item xs={3}>
          <Tags allTags={allTags} travelogue={travelogue} handleSetTags={handleSetTags} />
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
            <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>Update</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TravelogueEdit