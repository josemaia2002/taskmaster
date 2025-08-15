// --- IMPORTS ---
// Import the Express module to use its routing capabilities.
const express = require('express');

// Import the controller that contains the logic for handling authentication requests.
const authController = require('../controllers/authController');

// --- ROUTER SETUP ---
// Create a new router object. This works like a mini-Express application,
// allowing us to group related routes and export them as a single module.
const router = express.Router();

// --- ROUTE DEFINITIONS ---
// Define the specific routes for authentication. The actual request handling logic
// is delegated to the functions in authController (separation of concerns).

// Route to handle new user registration.
// METHOD: POST
// PATH: /register
// Example URL: POST /api/auth/register
router.post('/register', authController.register);

// Route to handle user login.
// METHOD: POST
// PATH: /login
// Example URL: POST /api/auth/login
router.post('/login', authController.login);

// --- EXPORT ---
// Export the configured router so it can be imported and used in the main app (index.js).
module.exports = router;