// Filename - pages/FindTheDog.js

import React, { useState } from 'react';
import './findTheDog.css';

const FindTheDog = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [uploading, setUploading] = useState(false); // State to manage upload status

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

  // Function to handle the upload button click
  const handleUploadClick = async () => {
    setUploading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result); // Handle server response here
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Find the Dog</h1>
      <div>
        <p>Upload a picture. The picture may or may not contain a dog.</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {image && (
          <div className="image-container">
            <h2>Uploaded Image:</h2>
            <img
              src={image}
              alt="Uploaded Preview"
              className="uploaded-image"
            />
            <button
              onClick={handleUploadClick}
              className="upload-button"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Analyze Image'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTheDog;
