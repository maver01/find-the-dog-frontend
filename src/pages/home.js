// Filename - pages/Home.js

import React from "react";
import './home.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import BlackFireCursor from '../components/Cursor/BlackFireCursor';

const Home = () => {
  return (
    <><BlackFireCursor/>
    <div className="home-background">
      <h1 className= "home-title">Find the object</h1>
      <div className="home-subtitle">An AI that detects what is on your picture.</div>
      <Link to="/about">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
    </>
  );
};

export default Home;
