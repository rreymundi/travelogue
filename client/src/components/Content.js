import React, { useContext, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Following from '../pages/Following';

const Content = ({ 
    onLogin, 
    onAddTravelogue, 
    onDeleteTravelogue, 
    onUpdateTravelogue, 
    allTravelogues, 
    allTags, 
  }) => {
  const { user, setCurrentUser } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);
  let navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
    setTimeout(handleCloseDeleteModal, 1000)
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true)
    setTimeout(handleCloseUpdateModal, 1000)
  };

  const [openPublishedModal, setOpenPublishedModal] = useState(false);
  const handleClosePublishedModal = () => setOpenPublishedModal(false);
  const handleOpenPublishedModal = () => {
    setOpenPublishedModal(true)
    setTimeout(handleClosePublishedModal, 1000)
  };
  
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
        navigate('/login')
      }
    })
  };

  const handleBookmarkUnsave = (id) => {
    fetch(`/bookmarks/${id}`, {
      method: 'DELETE',
    })
    .then(setCurrentUser({...user, saved_posts: [...user.saved_posts.filter(post => post.travelogue_id !== id)]}));
  };

  const handleFollowClick = (follow) => {
    fetch('/follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: follow.id      
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then((new_follow) => setCurrentUser({...user, following: [...user.following, new_follow]}))
      } else {
        r.json().then((errorData) => setErrors(errorData))
      }
    })
  };

  const handleUnfollowClick = (unfollow) => {
    fetch(`/follows/${unfollow.id}`, {
      method: 'DELETE',
    })
    .then(setCurrentUser({...user, following: [...user.following.filter(follow => follow.id !== unfollow.id)]}))
  };

  if (!user) return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box disablegutters='true' sx={{ backgroundColor: '#F7F7F6', m: '64px' }}>
        <Routes>
          <Route path='/' element={<Home allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/login' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/signup' element={<SignupPage onLogin={onLogin} />} />
          <Route path='/profile' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/mytravelogues' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/travelogues/:id' element={<Travelogue />} />
          <Route path='/mytravelogues/:id/edit' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/mytravelogues/new' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/bookmarks' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/discover' element={<Discover allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/discover/search' element={<Discover onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/profile/following' element={<LoginPage onLogin={onLogin} />} />
        </Routes>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box disablegutters='true' sx={{ backgroundColor: '#F7F7F6', m: '64px' }}>
        <Routes>
          <Route path='/' element={<Home allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/login' element={<LoginPage onLogin={onLogin} />} />
          <Route path='/signup' element={<SignupPage onLogin={onLogin} />} />
          <Route path='/profile' element={<AccountSettings />} />
          <Route path='/mytravelogues' element={<TraveloguesPage onDeleteTravelogue={onDeleteTravelogue} openDeleteModal={openDeleteModal} handleOpenDeleteModal={handleOpenDeleteModal} openUpdateModal={openUpdateModal} openPublishedModal={openPublishedModal} />} />
          <Route path='/travelogues/:id' element={<Travelogue onFollowClick={handleFollowClick} onUnfollowClick={handleUnfollowClick} />} />
          <Route path='/mytravelogues/:id/edit' element={<TravelogueEdit onUpdateTravelogue={onUpdateTravelogue} allTags={allTags} handleOpenUpdateModal={handleOpenUpdateModal} />} />
          <Route path='/mytravelogues/new' element={<TravelogueDraft allTags={allTags} onAddTravelogue={onAddTravelogue} handleOpenPublishedModal={handleOpenPublishedModal} />} />
          <Route path='/bookmarks' element={<Bookmarks onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} allTravelogues={allTravelogues} />} />
          <Route path='/discover' element={<Discover allTravelogues={allTravelogues} onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/discover/search' element={<Discover onBookmarkSave={handleBookmarkSave} onBookmarkUnsave={handleBookmarkUnsave} />} />
          <Route path='/profile/following' element={<Following user={user} onUnfollowClick={handleUnfollowClick} onFollowClick={handleFollowClick} />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Content