import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './context/user';
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';

const App = () => {
  const {user, setCurrentUser} = useContext(UserContext);

  return (
    <Router>
      <ResponsiveAppBar />
      <Content /> 
      <Footer />
  </Router>
  );
}

export default App