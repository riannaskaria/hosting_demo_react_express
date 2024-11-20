import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
  // State to hold the message returned by the backend
  const [message, setMessage] = useState('');

  // State to track step-by-step progress messages
  const [steps, setSteps] = useState([]);

  // State to capture error messages if the API call fails
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Step 1: Hardcoded backend URL (initially for local development)
    const backendURL = 'http://localhost:4000'; // Hardcoded for initial local setup
    const endpoint = '/message';
    const fullURL = `${backendURL}${endpoint}`;

    // Function to add progress messages to the steps array
    const addStep = (step) => setSteps((prevSteps) => [...prevSteps, step]);

    // Add steps to describe the process
    addStep('Preparing to fetch data...');
    addStep(`Using this backend URL: ${backendURL}`);
    addStep(`Full API URL constructed: ${fullURL}`);
    addStep('Attempting to fetch data from the backend...');

    // Use Axios to make a GET request to the backend
    axios
      .get(fullURL)
      .then((response) => {
        // If the request succeeds, display the fetched message
        addStep('Data fetched successfully.');
        setMessage(response.data.message); // Extract the message from the API response
      })
      .catch((error) => {
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