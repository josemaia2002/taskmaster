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
// Example URL: POST /api/tasks/
router.post('/', authMiddleware, taskController.createTask);

// Route to get all tasks for the authenticated user.
// METHOD: GET
// PATH: /
// Example URL: GET /api/tasks/
router.get('/', authMiddleware, taskController.getTasks);

// Route to update an existing task.
// METHOD: PUT
// PATH: /:id
// Example URL: PUT /api/tasks/123
// The `:id` is a URL parameter for the task's unique ID. The controller
// must verify that the authenticated user is the owner of this task.
router.put('/:id', authMiddleware, taskController.updateTask);

// Route to delete a task.
// METHOD: DELETE
// PATH: /:id
// Example URL: DELETE /api/tasks/123
// This route also uses a URL parameter (`:id`) to identify which task to delete.
// The `authMiddleware` confirms the user is logged in, and the `taskController.deleteTask`
// will confirm the user owns the task before deleting it from the database.
router.delete('/:id', authMiddleware, taskController.deleteTask);


// --- EXPORT ---
// Export the router so it can be mounted in the main application file (index.js).
module.exports = router;