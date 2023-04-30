import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from './context/error';
import { UserContext } from './context/user';
import { TravelogueContext } from './context/travelogue';
import Box from '@mui/material/Box';
import Content from "./components/Content";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';

const App = () => {
  const {user, setCurrentUser} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);
  const {setTravelogue} = useContext(TravelogueContext);
  let navigate = useNavigate()

  useEffect(() => {
    fetch('/me')
    .then(r => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setCurrentUser(user)
        })
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [allTags, setAllTags] = useState(null);

  useEffect(() => {
    fetch('/tags')
    .then(r => {
      if(r.ok) {
        r.json().then((r) => setAllTags(r))
      } else {
        r.json().then((r) => setErrors(r.errors))
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = (loggedInUser) => {
    setCurrentUser(loggedInUser);
    setErrors(null);
    navigate('/');
  };

  const onLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleAddTravelogue = (newTravelogue) => {
    // this adds new travelogue to state
    setCurrentUser({ ...user, travelogues: [...user.travelogues, newTravelogue] })
    // this adds new tags to state
    const tagsToAdd = newTravelogue.tags.filter((tag) => !allTags.includes(tag));
    const updatedTags = allTags.concat(tagsToAdd);
    setAllTags(updatedTags);
  };

  const handleUpdateTravelogue = (updatedTravelogue) => {
    const updatedTravelogues = user.travelogues.map((travelogue) => 
    travelogue.id === updatedTravelogue.id ? updatedTravelogue : travelogue
    );
    setCurrentUser({ ...user, travelogues: updatedTravelogues });
    setTravelogue(updatedTravelogue);
  };

  const handleDeleteTravelogue = (deletedTravelogue) => {
    setCurrentUser({
      ...user,
      travelogues: user.travelogues.filter((travelogue) => travelogue.id !== deletedTravelogue.id),
    });
  };
  
  return (
      <Box sx={{ minHeight: '100%' }}>
        <ResponsiveAppBar onLogout={onLogout} />
        <Content onLogin={onLogin} onDeleteTravelogue={handleDeleteTravelogue} onUpdateTravelogue={handleUpdateTravelogue} allTags={allTags} onAddTravelogue={handleAddTravelogue}/>
        <Footer />
      </Box>
  );
}

export default App