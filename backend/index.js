
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    res.send('API working');
});

  
// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
}); 