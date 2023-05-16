import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from './context/error';
import { UserContext } from './context/user';
import { TravelogueContext } from './context/travelogue';
import Box from '@mui/material/Box';
import Content from "./components/Content";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const {user, setCurrentUser} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);
  const {setTravelogue} = useContext(TravelogueContext);
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState(null);
  const [allTravelogues, setAllTravelogues] = useState(null);
  let navigate = useNavigate()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2727e6'
      },
      secondary: {
        main: '#997D00'
      },
    },
  });

  // GET current user
  useEffect(() => {
    fetch('/me')
    .then(r => {
      if(r.ok) {
        r.json().then((data) => setCurrentUser(data))
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET all travelogues
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const r = await fetch('/travelogues');
      const data = await r.json();
      if (r.ok) {
        setAllTravelogues(data)
        } else {
        setErrors(data.errors)
      }
      setIsLoading(false)
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET all tags
  useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const r = await fetch('/tags');
        const data = await r.json();
        if (r.ok) {
          setAllTags(data)
          } else {
          setErrors(data.errors)
        }
        setIsLoading(false)
      };
      fetchData();
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
    // this adds new travelogue to user state
    setCurrentUser({ ...user, travelogues: [...user.travelogues, newTravelogue] })
    // this adds new travelogue to all travelogues state
    setAllTravelogues([...allTravelogues, newTravelogue])
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh' }}>
        <ResponsiveAppBar onLogout={onLogout} />
              <Content 
                onLogin={onLogin} 
                onUpdateTravelogue={handleUpdateTravelogue} 
                onDeleteTravelogue={handleDeleteTravelogue} 
                allTravelogues={allTravelogues} 
                allTags={allTags} 
                onAddTravelogue={handleAddTravelogue} 
              />
          <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App