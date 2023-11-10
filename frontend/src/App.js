import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
  const [message, setMessage] = useState('');
  const [fetchStatus, setFetchStatus] = useState('Preparing to fetch data...');
  const [fullApiURL, setFullApiURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND;

    // Set the full API URL state, including the endpoint
    const endpoint = '/message';
    const fullURL = `${backendURL}${endpoint}`;
    setFullApiURL(fullURL);

    // Ensure the REACT_APP_BACKEND_URL environment variable is set
    if (!backendURL) {
      setMessage("REACT_APP_BACKEND_URL environment variable is not set.");
      setFetchStatus("Failed to fetch data");
      return;
    }

    // Set the status to fetching and proceed to make the API call
    setFetchStatus(`Attempting to fetch data from ${fullURL}`);

    // Fetch data from the backend API when the component mounts
    axios.get(fullURL)
      .then(response => {
        setMessage(response.data.message);
        setFetchStatus("Data fetched successfully");
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setMessage("Error fetching data from the server!!!!");
        setFetchStatus("Failed to fetch data");
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {fetchStatus}
        </p>
        {fullApiURL && (
          <p>
            Full API Call URL: <a href={fullApiURL} target="_blank" rel="noopener noreferrer">{fullApiURL}</a>
          </p>
        )}
        <p>
          Message: {message}
        </p>
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