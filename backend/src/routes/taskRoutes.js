// --- IMPORTS ---
// Import the Express module to create the router.
const express = require('express');

// Import the authentication middleware to protect the task-related routes.
const authMiddleware = require('../middlewares/authMiddleware');

// Import the controller that handles the business logic for tasks.
const taskController = require('../controllers/taskController');

// --- ROUTER SETUP ---
// Create a new router instance to define task-specific routes.
const router = express.Router();

// --- ROUTE DEFINITIONS ---
// All routes defined here are for managing tasks and are protected.

// Route to create a new task.
// METHOD: POST
// PATH: /
// Example URL: POST /api/tasks/ (assuming it's mounted with this prefix in index.js)
// This is a protected route. The `authMiddleware` will first verify the user's JWT.
// If authentication is successful, control is passed to `taskController.createTask`
// which will handle the logic of creating the task for the authenticated user.
router.post('/', authMiddleware, taskController.createTask);


// --- EXPORT ---
// Export the router so it can be mounted in the main application file (index.js).
module.exports = router;