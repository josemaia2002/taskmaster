// --- IMPORTS ---
// Import required external modules.
const express = require('express'); // The main framework for building the web server.
const cors = require('cors');       // Middleware to enable Cross-Origin Resource Sharing.
const dotenv = require('dotenv');   // Module to load environment variables from a .env file.

// --- INITIALIZATION ---
// Load environment variables from the .env file into process.env.
// This should be done before any configuration that needs them.
dotenv.config();

// Create an instance of the Express application.
const app = express();

// Define the port the server will listen on.
// It uses the PORT from the .env file, or defaults to 5000 for local development.
const port = process.env.PORT || 5000;

// Import route modules. This helps in organizing the application's endpoints.
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// --- MIDDLEWARE SETUP ---
// Middleware are functions that execute during the request-response cycle.

// Enable Cross-Origin Resource Sharing (CORS).
// This is crucial for allowing web frontends from different domains to access this API.
app.use(cors());

// Enable the Express built-in JSON parser.
// This allows the application to accept and understand JSON in request bodies.
app.use(express.json());

// --- ROUTES ---
// Define the application's endpoints (URLs).

// A simple root route for health checks or a welcome message.
// Useful for quickly verifying that the API is running.
app.get('/', (req, res) => {
    res.send('API working');
});

// Mount the authentication routes.
// All routes defined in authRoutes will be prefixed with '/api/auth'.
// For example, a '/login' route in authRoutes becomes '/api/auth/login'.
app.use('/api/auth', authRoutes);

// Mount the tasks routes.
// All routes defined in taskRoutes will be prefixed with '/api/tasks'.
app.use('/api/tasks', taskRoutes);

// --- SERVER STARTUP ---
// Start the server and make it listen for incoming requests on the specified port.
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});