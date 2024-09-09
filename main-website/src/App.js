// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import FindTheDog from "./pages/findTheDog";


function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/findTheDog"
					element={<FindTheDog />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
