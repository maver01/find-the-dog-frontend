import React, { useState } from 'react';
import './findTheDog.css';

const FindTheDog = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [processedImage, setProcessedImage] = useState(null); // State to store the processed image
  const [analysing, setAnalysing] = useState(false); // State to manage analyse status
  const [error, setError] = useState(false); // State to manage error status

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

  // Poll the server to get the processed image
  const pollForProcessedImage = async () => {
    try {
      // Wait for 2 seconds before polling
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Poll the backend for the processed image
      const response = await fetch('http://localhost:8080/api/processed-image');

      if (response.status === 200) {
        // If the image is ready, process the blob and display the image
        const blob = await response.blob();
        const processedImageUrl = URL.createObjectURL(blob); // Create a URL for the processed image
        setProcessedImage(processedImageUrl); // Set the processed image URL to state
      } else if (response.status === 204) {
        // Continue polling if no content yet
        setTimeout(pollForProcessedImage, 2000);
      }
    } catch (error) {
      console.error('Error fetching processed image:', error);
      setError(true); // Set error state to true
    }
  };

  // Function to handle the analyse button click
  const handleAnalyseClick = async () => {
    if (!image) return;

    setAnalysing(true);
    setError(false); // Reset error state

    try {
      // Create a FormData object and append the image data
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]); // Add the image file to the form data
      }

      // Send the image to the server via POST request
      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        body: formData, // Send the FormData containing the image
      });

      if (response.ok) {
        // Start polling the server for the processed image
        pollForProcessedImage();
      } else {
        console.error('Error analysing image:', response.statusText);
        setError(true); // Set error state
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(true); // Set error state
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
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {image && (
            <>
              <h3>Uploaded Image:</h3>
              <img src={image} alt="Uploaded Preview" className="uploaded-image" />
              <button
                onClick={handleAnalyseClick}
                className="analyse-button"
                disabled={analysing}
              >
                {analysing ? 'Analysing picture...' : 'Analyse'}
              </button>
              {error && <p>Error: Image processing failed.</p>} {/* Display error message */}
            </>
          )}
        </div>
        <div className="result-section">
          <h2>Result</h2>
          <p>The image after processing.</p>
          {processedImage && (
            <div>
              <h2>Processed Image:</h2>
              <img src={processedImage} alt="Processed Preview" className="processed-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTheDog;
