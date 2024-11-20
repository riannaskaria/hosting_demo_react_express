import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
  // State to hold the message returned by the backend
  const [message, setMessage] = useState('');

  // State to track step-by-step progress messages
  const [steps, setSteps] = useState([]);

  // State to store the full API URL for clarity (combines base URL and endpoint)
  const [fullApiURL, setFullApiURL] = useState('');

  // State to capture error messages if the API call fails
  const [errorMessage, setErrorMessage] = useState('');

  // The `useEffect` hook runs after the component is rendered
  // It is used here to call the API immediately when the app loads
  useEffect(() => {
    // 1. Read the backend URL from the environment variable
    // For local development, create a `.env` file and set REACT_APP_BACKEND to your local server URL (e.g., http://localhost:4000)
    // When deployed on Vercel, this environment variable should point to your live backend URL
    const backendURL = process.env.REACT_APP_BACKEND;

    // 2. Define the API endpoint we want to call
    const endpoint = '/message';

    // 3. Combine the backend URL and endpoint to construct the full API URL
    const fullURL = `${backendURL}${endpoint}`;
    setFullApiURL(fullURL); // Store it in state for display later

    // Function to add progress messages to the steps array
    const addStep = (step) => setSteps((prevSteps) => [...prevSteps, step]);

    // Add the first step to indicate that the fetch process is starting
    addStep('Preparing to fetch data...');

    // 4. Check if the REACT_APP_BACKEND environment variable is set
    if (!backendURL) {
      // If the backend URL is not set, inform the user and stop further execution
      addStep('Error: REACT_APP_BACKEND_URL environment variable is not set.');
      setMessage('Cannot proceed without backend URL.');
      return; // Exit early
    }

    // Add a step to confirm that the backend URL was detected
    addStep(`Backend URL detected: ${backendURL}`);

    // Add a step showing the full API URL for clarity
    addStep(`Full API URL constructed: ${fullURL}`);

    // 5. Attempt to fetch data from the backend
    addStep('Attempting to fetch data from the backend...');

    // Use Axios to make a GET request to the backend
    axios.get(fullURL)
      .then(response => {
        // If the request succeeds, display the fetched message
        addStep('Data fetched successfully.');
        setMessage(response.data.message); // Extract the message from the API response
      })
      .catch(error => {
        // If the request fails, display an error message
        addStep('Error: Failed to fetch data from the backend.');
        setErrorMessage(error.message); // Capture the error message for debugging
      });
  }, []); // The empty array ensures this effect only runs once, when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        {/* Display the React logo */}
        <img src={logo} className="App-logo" alt="logo" />
        
        <h2>API Fetch Status</h2>
        
        {/* List each step of the process */}
        <ul className="steps-list">
          {steps.map((step, index) => (
            <li key={index}>{step}</li> // Render each step as a list item
          ))}
        </ul>
        
        {/* Display the full API URL, useful for debugging */}
        {fullApiURL && (
          <p>
            Full API Call URL: <a href={fullApiURL} target="_blank" rel="noopener noreferrer">{fullApiURL}</a>
          </p>
        )}
        
        {/* Display the message from the API */}
        <p>
          Message: {message || 'No message received yet.'}
        </p>
        
        {/* Display the error message if one exists */}
        {errorMessage && (
          <p className="error-message">
            Error: {errorMessage}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;