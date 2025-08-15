// --- IMPORTS ---
// Import necessary modules for database interaction, password hashing, validation, and token generation.
const { PrismaClient } = require('../generated/prisma');    // ORM for interacting with the database.
const bcrypt = require('bcrypt');                           // Library for hashing and comparing passwords securely.
const { z } = require('zod');                               // Library for data validation to ensure data integrity.
const jwt = require('jsonwebtoken');                        // Library to create and manage JSON Web Tokens for authentication.                    


// --- SETUP & CONFIGURATION ---
// Initialize the Prisma Client to connect to the database.
const prisma = new PrismaClient();

// Define the complexity of the password hashing algorithm.
// A higher number means more processing time to hash, making it more secure against brute-force attacks.
const saltRounds = 10;

// --- VALIDATION SCHEMAS ---
// Define the structure and rules for the data expected in the request body for registration.
// This prevents invalid or malicious data from reaching the database.
const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Define the structure and rules for the data expected for login.
const loginSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password must not be empty" }),
});



// --- CONTROLLER FUNCTIONS ---

/**
 * Handles new user registration.
 * It validates input, checks for existing users, hashes the password, and creates a new user in the database.
 */
exports.register = async (req, res) => {
    try {
        // 1. VALIDATE: Parse and validate the request body against the registerSchema.
        // If validation fails, Zod throws an error which is caught by the catch block.
        const userData = registerSchema.parse(req.body);

        // 2. CHECK FOR EXISTING USER: Query the database to see if a user with this email already exists.
        const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
        if (existingUser) {
            // If the email is already taken, return a 409 Conflict status.
            return res.status(409).json({ error: 'Email already registered' });
        }

        // 3. HASH PASSWORD: Securely hash the user's password before storing it.
        // NEVER store plain-text passwords in the database.
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        // 4. CREATE USER: Create a new user record in the database with the validated and secured data.
        const createdUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword  // Store the hashed password, not the original one.
            }
        });
        
        // 5. RESPOND: Send a 201 Created status and the new user's data (excluding the password).
        res.status(201).json({ id: createdUser.id, name: createdUser.name, email: createdUser.email });

    } catch (error) {
        // Handle validation errors from Zod.
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        // Handle any other unexpected errors.
        console.error(error); 
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Handles user login.
 * It validates input, finds the user, verifies the password, and returns a JWT if successful.
 */
exports.login = async (req, res) => {
    try {
        // 1. VALIDATE: Parse and validate the login credentials from the request body.
        const { email, password } = loginSchema.parse(req.body);    

        // 2. FIND USER: Look for a user in the database with the provided email.
        const user = await prisma.user.findUnique({ where: { email } });

        // 3. VERIFY USER AND PASSWORD: Check if the user exists AND if the provided password is correct.
        // Use bcrypt.compare to securely check the password against the stored hash.
        // This check is done in a way that prevents timing attacks.
        const isPasswordCorrect = user && await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            // If the user doesn't exist or the password is wrong, return a 401 Unauthorized status.
            // Use a generic error message to avoid revealing which field was incorrect (email or password).
            return res.status(401).json({ error: "Wrong email or password" });
        }

        // 4. GENERATE TOKEN: If credentials are correct, create a JSON Web Token (JWT).
        const token = jwt.sign(
            { userId: user.id, email: user.email },  // Payload: Data to store in the token. Keep it minimal.
            process.env.JWT_SECRET,                  // Secret Key: A secret string stored in .env to sign the token.
            { expiresIn: '8h' }                      // Options: Set an expiration time for the token.
        );

        // 5. RESPOND: Send a 200 OK status with the generated token.
        res.status(200).json({ token });

    } catch (error) {
        // Handle validation errors from Zod.
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        // Handle any other unexpected errors.
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};