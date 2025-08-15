// taskController.js

// --- IMPORTS ---
const { PrismaClient } = require('../generated/prisma'); // ORM for database interaction.
const { z } = require('zod');                           // Library for data validation.

// --- SETUP ---
const prisma = new PrismaClient();

// --- VALIDATION SCHEMAS ---
// Defines the required structure for creating a task.
// Ensures that every task must have a title.
const taskSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
});

// Defines the structure for updating a task.
// Both `title` and `completed` are optional, allowing the user
// to update one or both fields in a single request.
const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    completed: z.boolean().optional(),
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
    const userId = req.user.userId;

    // 3. CREATE TASK IN DB: Use Prisma to create a new task record in the database.
    const task = await prisma.task.create({
        data: {
            title,
            userId // Associate the task with the authenticated user.
      }
    });

    // 4. RESPOND: Send a 201 Created status with the data of the newly created task.
    res.status(201).json(task);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
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
      const userId = req.user.userId;
  
      const tasks = await prisma.task.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc', 
        },
      });
  
      res.status(200).json(tasks);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not fetch the tasks." });
    }
  };

/**
 * Updates an existing task for the authenticated user.
 * It ensures that a user can only update tasks that they own.
 */
exports.updateTask = async (req, res) => {
    try {
      // 1. GET IDENTIFIERS: Extract the task ID from URL parameters and the user ID from the token.
      const taskId = parseInt(req.params.id);
      const userId = req.user.userId;

      // 2. VALIDATE INPUT: Validate the request body against the update schema.
      const dataToUpdate = updateTaskSchema.parse(req.body);
  
      // 3. CHECK FOR EMPTY DATA: If the validated data is an empty object, there's nothing to update.
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "No data provided for update." });
      }
  
      // 4. UPDATE TASK IN DB: Perform the update using a compound `where` clause.
      // This is the critical security check: it will only update a record if the `id` matches
      // AND the `userId` matches the ID of the currently logged-in user.
      const result = await prisma.task.updateMany({
        where: {
          id: taskId,
          userId: userId, // Ensures a user cannot update another user's tasks.
        },
        data: dataToUpdate,
      });
  
      // 5. CHECK IF UPDATE OCCURRED: `updateMany` returns a count of updated records.
      // If the count is 0, it means no task was found that matched BOTH the taskId and userId.
      if (result.count === 0) {
        // This could be because the task doesn't exist or the user doesn't own it.
        // A generic 404 is a good security practice to not reveal which is the case.
        return res.status(404).json({ error: "Task not found or you are not authorized to update it." });
      }
  
      // 6. RESPOND: Send a success message.
      res.status(200).json({ message: "Task updated successfully." });
  
    } catch (error) {
       if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      console.error(error);
      res.status(500).json({ error: "Could not update the task." });
    }
  };