import React, { useState, useEffect, useContext } from 'react';
import { ErrorContext } from './context/error';
import { UserContext } from './context/user';
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';

const App = () => {
  const {user, setCurrentUser} = useContext(UserContext);
  const {setErrors} = useContext(ErrorContext);

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

  const onLogin = (loggedInUser) => {
    setCurrentUser(loggedInUser)
    setErrors(null)
  };

  return (
    <Router>
      <ResponsiveAppBar />
      <Content onLogin={onLogin} /> 
      <Footer />
    </Router>
  );
}

export default App