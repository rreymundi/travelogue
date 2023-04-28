import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
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

const TravelogueEdit = ({ onTravelogueEdit, tags }) => {
  const {user, setCurrentUser} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);
  const {travelogue} = useContext(TravelogueContext);
  const [formData, setFormData] = useState({
    title: travelogue.title,
    location: travelogue.location,
    description: travelogue.description,
  });
  const [inputValue, setInputValue] = useState('');

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

  // const tags = [
  //     { id: 0, name: "travel" },
  //     { id: 1, name: "food" },
  //     { id: 2, name: "museums" },
  //     { id: 3, name: "history" },
  //     { id: 4, name: "nature" }
  //   ];
  
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
          .then((updatedTravelogue) => onTravelogueEdit(updatedTravelogue))
        } else {
          r.json().then((errorData) => setErrors(errorData.errors))
      }
    })
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append('title', formData.title)
  //   data.append('description', formData.description)
  //   data.append('saved', formData.saved)
  //   data.append('location', inputValue)
  //   data.append('tags', postTags)
  //     fetch(`/travelogues/`, {
  //       method: "POST",
  //       body: data,
  //   })
  //   .then((r) => {
  //       if (r.ok) {
  //           r.json()
  //           .then((newTravelogue) => {
  //             setCurrentUser({ ...user, travelogues: [...user.travelogues, newTravelogue] })
  //           })
  //           navigate('/travelogues')
  //         } else {
  //           r.json().then((errorData) => console.log(errorData.errors))
  //       }
  //   })
  // };

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
        .then((updatedTravelogue) => onTravelogueEdit(updatedTravelogue))
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

  return (
    <Box sx={boxStyle} component='form' onSubmit={handleSubmit}>
      {/* <Box>
        <Box>
          <Typography sx={{ fontSize: '3.5rem' }}>New Draft</Typography>
        </Box>
      </Box> */}
      {/* <Paper sx={{ justifySelf: 'center'}}></Paper> */}
      <Link href="/travelogues" sx={{ mb: '2rem'}}>Back to Travelogues</Link>
      <Paper variant="outlined" sx={coverImage} />
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
          <LocationMenu inputValue={inputValue} setInputValue={setInputValue} location={travelogue?.location}/>
        </Grid>
        <Grid item xs={3}>
          <Tags tags={tags} travelogue={travelogue} handleSetTags={handleSetTags} />
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