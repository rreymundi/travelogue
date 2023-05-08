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
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState(null);
  const [allTravelogues, setAllTravelogues] = useState(null);
  const [searchedTravelogues, setSearchedTravelogues] = useState(null);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const r = await fetch('/me');
      const json = await r.json();
      if (r.ok) {
        setCurrentUser(json)
        } else {
        setErrors(json.errors)
      }
      setIsLoading(false)
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET all travelogues
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const r = await fetch('/travelogues');
      const json = await r.json();
      if (r.ok) {
        setAllTravelogues(json)
        } else {
        setErrors(json.errors)
      }
      setIsLoading(false)
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET all tags
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

  const filteredData = (query, data) => {
    if (query === null) {
      return data
    } else {
      const filtered = data.filter((d) => 
        d.title.toLowerCase().includes(query.toLowerCase()) || 
        d.description.toLowerCase().includes(query.toLowerCase() ||
        d.location.toLowerCase().includes(query.toLowerCase()))
        )
      setSearchedTravelogues(filtered)
    }
  }; 

  const onSearch = (search) => {
    filteredData(search, allTravelogues);
  };

  return (
      <Box sx={{ minHeight: '100vh' }}>
        <ResponsiveAppBar onLogout={onLogout} />
          {isLoading 
            ? <p>Loading ...</p>
            : <Content 
                onLogin={onLogin} 
                onDeleteTravelogue={handleDeleteTravelogue} 
                onUpdateTravelogue={handleUpdateTravelogue} 
                allTravelogues={allTravelogues} 
                allTags={allTags} 
                onAddTravelogue={handleAddTravelogue} 
                onSearch={onSearch} 
                searchedTravelogues={searchedTravelogues}
              />
          }
          <Footer />
      </Box>
  );
}

export default App