// Filename - pages/about.js

import React from "react";
import "./about.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import BlackFireCursor from "../components/Cursor/BlackFireCursor";

const About = () => {
	return (
		<>
			<BlackFireCursor/>
			<div className="home-background">
				<h1 className="home-title">
					About section
				</h1>
				<div className="warning">
					Warning: This website was made for training purposes. Leave the website now.
				</div>
				<Link to="/findTheDog">
					<button className="get-started-button">Continue at your own risk</button>
				</Link>
			</div>
		</>
	);
};

export default About;
