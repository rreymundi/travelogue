import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import AccountSettings from '../pages/AccountSettings';
import Bookmarks from '../pages/Bookmarks';
import Box from '@mui/material/Box';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import TraveloguesPage from '../pages/TraveloguesPage';
import TravelogueDraft from '../pages/TravelogueDraft';
import Travelogue from '../pages/Travelogue';
import TravelogueEdit from '../pages/TravelogueEdit';
import Discover from '../pages/Discover';
import { UserContext } from '../context/user';
import { ErrorContext } from '../context/error';

const Content = ({ 
    onLogin, 
    onAddTravelogue, 
    onDeleteTravelogue, 
    onUpdateTravelogue, 
    allTravelogues, 
    allTags, 
    onSearch,
    searchedTravelogues
  }) => {
  const { user, setCurrentUser } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);
  
  const handleBookmarkSave = (id) => {
    fetch('/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({travelogue_id: id})
    })
    .then(r => {
      if (r.ok) {
        r.json().then((savedTravelogue) => setCurrentUser({...user, saved_posts: [...user.saved_posts, savedTravelogue]}))
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
      }
    })
  };

  const handleBookmarkUnsave = (id) => {
    fetch(`/bookmarks/${id}`, {
      method: 'DELETE',
    })
    .then(setCurrentUser({...user, saved_posts: [...user.saved_posts.filter(post => post.travelogue_id !== id)]}));
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box disablegutters='true' sx={{ backgroundColor: '#F7F7F6', m: '64px' }}>
        <Routes>
          <Route path='/' element={<Home onSearch={onSearch} allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/login' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/signup' element={<SignupPage onLogin={onLogin} />} />
          <Route path='/profile' element={<AccountSettings />} />
          <Route path='/travelogues' element={<TraveloguesPage onDeleteTravelogue={onDeleteTravelogue} />} />
          <Route path='/travelogues/:id' element={<Travelogue />} />
          <Route path='/travelogues/:id/edit' element={<TravelogueEdit onUpdateTravelogue={onUpdateTravelogue} allTags={allTags} />} />
          <Route path='/travelogues/new' element={<TravelogueDraft allTags={allTags} onAddTravelogue={onAddTravelogue}/>} />
          <Route path='/bookmarks' element={<Bookmarks onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} allTravelogues={allTravelogues} />} />
          <Route path='/discover' element={<Discover allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} searchedTravelogues={searchedTravelogues} />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Content