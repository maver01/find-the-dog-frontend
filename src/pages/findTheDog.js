import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import './findTheDog.css';

const FindTheDog = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [classLabel, setClassLabel] = useState(null); // State to store the class label
  const [analysing, setAnalysing] = useState(false); // State to manage analyse status
  const [error, setError] = useState(false); // State to manage error status
  const [requestId, setRequestId] = useState(null); // State to store the request ID

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

  // Poll the server to get the processed class label
  const pollForProcessedLabel = async (requestId) => {
    try {
      
      // Poll the backend for the processed label
      const response = await fetch(`http://localhost:8080/api/processed-label/${requestId}`, {
      });

      if (response.status === 200) {
        // If the label is ready, parse and display it
        const label = await response.text();
        setClassLabel(label); // Set the class label to state
      } else if (response.status === 204) {
        // Continue polling if no content yet
        pollForProcessedLabel(requestId);
      }
    } catch (error) {
      console.error('Error fetching processed label:', error);
      setError(true); // Set error state to true
    }
  };

  // Function to handle the analyse button click
  const handleAnalyseClick = async () => {
    if (!image) return;

    setAnalysing(true);
    setError(false); // Reset error state

    try {
      const requestId = uuidv4(); // Generate a unique ID for the image
      setRequestId(requestId); // Set the unique ID in state

      // Create a FormData object and append the image data
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]); // Add the image file to the form data
        formData.append('requestId', requestId); // Append the unique ID to the form data
      }

      console.log("Sending the image to the server:", "http://localhost:8080/api/analyze");
      // print IP address
      console.log('IP address:', window.location.hostname);
      // Send the image to the server via POST request
      const response = await fetch("http://localhost:8080/api/analyze", {
        method: 'POST',
        body: formData, // Send the FormData containing the image
      });

      if (response.ok) {
        // Start polling the server for the processed label
        console.log('Polling from the server: ', `http://localhost:8080/api/processed-label/${requestId}`);
        pollForProcessedLabel(requestId);
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
    <div className="home-background">
      <div>
        <h1 className='home-title'>Find the Dog</h1>
        <div className="home-subtitle">Upload a picture, we will find what is in it.</div>
      </div>
      <div className="vertical-sections-container">
        <div className="upload-section">
          <h2 className="home-subtitle">Upload a picture</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {image && (
            <>
              <h3 className="home-subtitle">Uploaded Image:</h3>
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
          <h2 className="home-subtitle">Result:</h2>
          <p>The class label after processing.</p>
          {classLabel && (
            <div>
              <h2>Class Label:</h2>
              <h1>{classLabel}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTheDog;
