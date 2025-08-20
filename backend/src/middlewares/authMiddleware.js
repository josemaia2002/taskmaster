// authMiddleware.js

// --- IMPORTS ---
// Import the jsonwebtoken library to verify the authenticity of JWTs.
const jwt = require('jsonwebtoken');

/**
 * Middleware function to protect routes that require authentication.
 * It checks for a valid JSON Web Token (JWT) in the Authorization header.
 * If the token is valid, it attaches the decoded user payload to the request object
 * and passes control to the next function in the stack (the route handler).
 * If the token is missing or invalid, it sends an appropriate error response.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The callback function to pass control to the next middleware.
 */
const authMiddleware = (req, res, next) => {
    // 1. EXTRACT TOKEN: Look for the Authorization header from the incoming request.
    // This header is conventionally used to send tokens.
    const authHeader = req.headers['authorization'];
  
    // 2. CHECK FOR PRESENCE: If the header is missing, the user is not authenticated.
    // Immediately stop the request and send a 401 Unauthorized error.
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied: No token provided.' });
    }
  
    // The Authorization header format is typically "Bearer <token>".
    // We need to split the string by the space and get the second part, which is the token itself.
    const token = authHeader.split(' ')[1];
  
    // 3. CHECK FOR TOKEN FORMAT: If the token is missing after the split, the header was malformed.
    if (!token) {
      return res.status(401).json({ error: 'Access denied: Malformed token.' });
    }
  
    // 4. VERIFY TOKEN: Use a try-catch block to handle potential errors during verification.
    try {
      // Use jwt.verify() to decode and validate the token.
      // It checks the signature against the secret key stored in environment variables.
      // If the token is expired or the signature is invalid, it will throw an error.
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
  
      // 5. ATTACH USER TO REQUEST: If the token is valid, attach the decoded payload (e.g., { userId, email })
      // to the request object (`req`). This makes the authenticated user's information
      // available to any subsequent route handlers.
      req.user = decodedPayload;
  
      // 6. PROCEED: Call next() to pass control to the next middleware or the actual route handler.
      // This indicates that authentication was successful.
      next();
    } catch (error) {
      // If jwt.verify() fails, it means the token is invalid (e.g., expired, tampered).
      // Send a 403 Forbidden status because the user provided a token, but it's not valid.
      return res.status(403).json({ error: 'Access forbidden: Invalid token.' });
    }
  };
  
// --- EXPORT ---
// Export the middleware so it can be applied to routes in other files.
module.exports = authMiddleware;