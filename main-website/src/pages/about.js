// Filename - pages/about.js

import React from "react";
import "./about.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const About = () => {
	return (
		<div>
			<h1>
				About section
			</h1>
			<div className="warning">
        		Warning: This website was made for training purposes. Leave the website now.
      		</div>
			<Link to="/findTheDog">
        		<button className="continue-button">Continue at your own risk</button>
      		</Link>
		</div>
	);
};

export default About;
