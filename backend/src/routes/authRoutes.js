// --- IMPORTS ---
// Import the Express module to use its routing capabilities.
const express = require('express');

// Import the controller that contains the logic for handling authentication requests.
const authController = require('../controllers/authController');

// Import the middleware that will protect specific routes.
const authMiddleware = require('../middlewares/authMiddleware');

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

// --- Protected Routes ---
// These routes require a valid JWT for access.

// Route to get the authenticated user's profile.
// METHOD: GET
// PATH: /profile
// Example URL: GET /api/auth/profile
// This route is protected by the authMiddleware. When a request is made:
// 1. The `authMiddleware` function runs first.
// 2. It checks for and verifies the JWT from the Authorization header.
// 3. If the token is valid, it calls `next()` and passes control to the `authController.getProfile` function.
// 4. If the token is invalid or missing, the middleware sends an error response and the controller is never reached.
router.get('/profile', authMiddleware, authController.getProfile);

// --- EXPORT ---
// Export the configured router so it can be imported and used in the main app (index.js).
module.exports = router;