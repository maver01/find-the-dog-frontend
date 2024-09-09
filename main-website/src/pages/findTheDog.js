// Filename - pages/FindTheDog.js

import React, { useState } from 'react';
import "./findTheDog.css"

const FindTheDog = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image data URL to the state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div>
      <h1>Find the Dog</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ marginBottom: '1rem' }} // Styling for spacing
      />
      {image && (
        <div>
          <h2>Uploaded Image:</h2>
          <img 
            src={image} 
            alt="Uploaded Preview" 
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '8px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default FindTheDog;
