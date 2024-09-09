// Filename - pages/Home.js

import React from "react";
import './home.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  return (
    <div>
      <h1>Find the Dog</h1>
      <Link to="/about">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
