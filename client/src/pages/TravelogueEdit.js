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
import TextEditor from '../components/TextEditor';
import LoadingSpinner from '../components/LoadingSpinner';

const TravelogueEdit = ({ onUpdateTravelogue, allTags, handleOpenUpdateModal }) => {
  const {errors, setErrors} = useContext(ErrorContext);
  const {travelogue, setTravelogue} = useContext(TravelogueContext);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const r = await fetch(`/travelogues/${id}`);
      const data = await r.json();
      if (r.ok) {
        setTravelogue(data)
        } else {
        setErrors(data.errors)
      }
      setIsLoading(false)
    };
    fetchData();
  }, [id, setErrors, setTravelogue]);

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
        navigate('/mytravelogues')
      } else {
        r.json().then((r) => setErrors(r.errors))
      }
    })
    handleOpenUpdateModal();
  };

  if (isLoading) return <LoadingSpinner />

  return (
    <Box sx={{
          backgroundColor: '#F7F7F6',
          padding: '3rem',
          display: 'grid',
          minHeight: '100vh',
      }} 
      component='form' 
      onSubmit={handleSubmit}
      >
      <Box>
        <Typography sx={{ fontSize: '2.5rem' }}>Edit Travelogue</Typography>
      </Box>
      <Link href="/mytravelogues" sx={{ mb: '2rem'}}>Back to your travelogues</Link>
      { travelogue.cover_image_url !== null 
        ? <Paper variant="outlined" sx={{
            justifySelf: 'center', 
            height: '20rem', 
            width: '40rem', 
            margin: '2rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(` + travelogue.cover_image_url +`)`,
            aspectRatio: '16 / 9',
            }} 
          />
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
          <TextEditor setFormData={setFormData} formData={formData} />
        </Grid>
        <Grid item sx={{ ml: 'auto', mr: 'auto'}}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>Update</Button>
        </Grid>
        <Grid item>
            { errors 
              ? errors.map((error) => <Typography key={error} color="error">{error}</Typography>)
              : null
            }
        </Grid>
      </Grid>
    </Box>
  )
}

export default TravelogueEdit