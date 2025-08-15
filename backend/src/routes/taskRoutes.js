// taskRoute.js

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

// Route to get all tasks for the authenticated user.
// METHOD: GET
// PATH: /
// Example URL: GET /api/tasks/
// Like the creation route, this is protected. The `authMiddleware` runs first to ensure
// the user is logged in. Then, `taskController.getTasks` will fetch only the tasks
// that belong to that specific user.
router.get('/', authMiddleware, taskController.getTasks);

// Route to update an existing task.
// METHOD: PUT
// PATH: /tasks/:id
// Example URL: PUT /api/tasks/123e4567-e89b-12d3-a456-426614174000
// The `:id` in the path is a URL parameter representing the unique ID of the task to be updated.
// The `authMiddleware` ensures the user is logged in. The `taskController.updateTask`
// will then need to perform an additional check to ensure the authenticated user
// is the actual owner of the task before applying any changes.
router.put('/:id', authMiddleware, taskController.updateTask);


// --- EXPORT ---
// Export the router so it can be mounted in the main application file (index.js).
module.exports = router;