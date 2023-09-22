import React, { useState, useContext } from 'react';
import { ErrorContext } from '../context/error';
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

const TravelogueDraft = ({ allTags, onAddTravelogue, handleOpenPublishedModal }) => {
  const {errors, setErrors} = useContext(ErrorContext);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  const [inputValue, setInputValue] = useState('');
    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const [buttonText, setButtonText] = useState('Add cover image');

  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleImageUpload = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
    setButtonText('Change cover image')
  };

  const [postTags, setPostTags] = useState([]);

  const handleSetTags = (e, newValue) => {
    setPostTags(newValue)
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', inputValue);
    data.append('tags', postTags);
    data.append('cover_image', imageFile);
    fetch(`/travelogues/`, {
      method: "POST",
      body: data,
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((newTravelogue) => onAddTravelogue(newTravelogue))
        navigate('/mytravelogues')
        handleOpenPublishedModal()
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
      }
    })
  };

  const renderedCoverImage = imageURL ? `url(` + imageURL +`)` : null;

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
        <Typography sx={{ fontSize: '2.5rem' }}>New Draft</Typography>
      </Box>
      <Link href="/mytravelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      <Paper variant="outlined" sx={{
            justifySelf: 'center', 
            height: '20rem', 
            width: '40rem', 
            margin: '2rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: renderedCoverImage,
            aspectRatio: '16 / 9',
            }} 
          /> 
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
            >
              {buttonText}
            <input
                id="cover_image"
                name="cover_image"
                type="file"
                accept=".jpg, .jpeg, .png, .webp, .gif"
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
          {/* <TextField 
            multiline
            rows={8}
            id="description" 
            name="description" 
            variant="filled"                    
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            sx={{ width: '100%' }}
          /> */}
          <TextEditor setFormData={setFormData} formData={formData} />
        </Grid>
        <Grid item sx={{ ml: 'auto', mr: 'auto'}}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>Publish</Button>
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

export default TravelogueDraft