// taskController.js

// --- IMPORTS ---
const { PrismaClient } = require('../generated/prisma'); // ORM for database interaction.
const { z } = require('zod');                           // Library for data validation.

// --- SETUP ---
const prisma = new PrismaClient();

// --- VALIDATION SCHEMA ---
// Defines the required structure for creating a task.
// Ensures that every task must have a title.
const taskSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
});

// --- CONTROLLER FUNCTIONS ---

/**
 * Handles the creation of a new task for the authenticated user.
 * It validates the incoming data and associates the new task with the user ID
 * obtained from the JWT payload.
 */
exports.createTask = async (req, res) => {
  try {
    // 1. VALIDATE: Validate the request body to ensure it contains a title.
    const { title } = taskSchema.parse(req.body);
    
    // 2. GET USER ID: Retrieve the user ID from the `req.user` object.
    // This object was attached to the request by the `authMiddleware` after a successful token verification.
    // This is how we know WHO is creating the task.
    const userId = req.user.userId;

    // 3. CREATE TASK IN DB: Use Prisma to create a new task record in the database.
    // The `userId` is used to link this task to the user who created it.
    const task = await prisma.task.create({
        data: {
            title,
            userId // Associate the task with the authenticated user.
      }
    });

    // 4. RESPOND: Send a 201 Created status with the data of the newly created task.
    res.status(201).json(task);

  } catch (error) {
    // Handle validation errors from Zod.
    if (error instanceof z.ZodError) {
      // Using .issues is the modern, recommended way to handle Zod errors.
      return res.status(400).json({ errors: error.issues });
    }
    // Handle any other unexpected errors during task creation.
    console.error(error);
    res.status(500).json({ error: "Could not create the task." });
  }
};

/**
 * Retrieves all tasks that belong to the currently authenticated user.
 * The user's identity is determined by the JWT payload.
 */
exports.getTasks = async (req, res) => {
    try {
      // 1. GET USER ID: Just like in createTask, get the user's ID from the middleware.
      const userId = req.user.userId;
  
      // 2. FETCH TASKS: Query the database for all tasks that match the user's ID.
      const tasks = await prisma.task.findMany({
        // The `where` clause is critical for security and data privacy.
        // It ensures that we only retrieve tasks belonging to the logged-in user.
        where: {
          userId: userId,
        },
        // The `orderBy` clause sorts the results, showing the newest tasks first.
        orderBy: {
          createdAt: 'desc', 
        },
      });
  
      // 3. RESPOND: Send a 200 OK status with the array of tasks.
      // If the user has no tasks, this will be an empty array.
      res.status(200).json(tasks);
  
    } catch (error) {
      // Handle any unexpected errors during the database query.
      console.error(error);
      res.status(500).json({ error: "Could not fetch the tasks." });
    }
  };