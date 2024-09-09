// Filename - pages/FindTheDog.js

import React, { useState } from 'react';
import './findTheDog.css';

const FindTheDog = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [processedImage, setProcessedImage] = useState(null); // State to store the processed image
  const [analysing, setAnalysing] = useState(false); // State to manage analyse status

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

  // Function to handle the analyse button click
  const handleAnalyseClick = async () => {
    setAnalysing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setProcessedImage(result.processedImage); // Assuming the server returns the processed image URL
    } catch (error) {
      console.error('Error analysing image:', error);
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Find the Dog</h1>
		Upload a picture, we will find the dog for you.
      </div>
      <div className="vertical-sections-container">
        <div className="upload-section">
          <h2>Upload a picture</h2>
          <p>The picture may or may not contain a dog.</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {image && (
			<>
			<h3>Uploaded Image:</h3>
			<img
			  src={image}
			  alt="Uploaded Preview"
			  className="uploaded-image"
			/>
            <button
              onClick={handleAnalyseClick}
              className="analyse-button"
              disabled={analysing}
            >
              {analysing ? 'Analysing picture...' : 'Analyse'}
            </button>
			</>
          )}
        </div>
        <div className="result-section">
			<h2>Result</h2>
			<p>The image that was processed.</p>
          {processedImage && (
            <div>
              <h2>Processed Image:</h2>
              <img
                src={processedImage}
                alt="Processed Preview"
                className="processed-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FindTheDog;
