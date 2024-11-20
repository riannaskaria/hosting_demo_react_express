const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware to enable CORS
app.use(cors());

// Sample endpoint
app.get('/message', (req, res) => {
    console.log("GET endpoint contacted")
    res.json({ message: 'Hello from the server!' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
}) 

const PORT = process.env.PORT || 4000; // Use dynamic PORT for Vercel
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
