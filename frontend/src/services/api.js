// The base URL for all API requests, configured to use an environment variable
// for production and a fallback for local development.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * A helper function to retrieve the authentication token from local storage.
 * This token is required for all authenticated API requests.
 * @returns {string} The authentication token.
 * @throws {Error} If no token is found in local storage.
 */
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found.');
  }
  return token;
};

// --- Task CRUD Functions (Authenticated) ---

/**
 * Fetches all tasks for the authenticated user.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */
export const getTasks = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch tasks.');
  return response.json();
};

/**
 * Creates a new task for the authenticated user.
 * @param {string} title - The title of the new task.
 * @returns {Promise<object>} A promise that resolves to the newly created task object.
 */
export const createTask = async (title) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Failed to create task.');
  return response.json();
};

/**
 * Updates an existing task by its ID.
 * @param {number} id - The ID of the task to update.
 * @param {object} updates - An object containing the fields to update (e.g., { title, completed }).
 * @returns {Promise<object>} A promise that resolves to an object indicating success.
 */
export const updateTask = async (id, updates) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update task.');
  return { success: true };
};

/**
 * Deletes a task by its ID.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<object>} A promise that resolves to an object indicating success.
 */
export const deleteTask = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete task.');
  return { success: true };
};

// --- Auth Functions (Public) ---

/**
 * Registers a new user. This is a public endpoint and does not require a token.
 * @param {object} userData - An object containing the user's name, email, and password.
 * @returns {Promise<object>} A promise that resolves to the new user's data.
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  // If the response is not ok, parse the error message from the body for better feedback.
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to register');
  }
  return response.json();
};

/**
 * Logs in a user. This is a public endpoint.
 * @param {object} credentials - An object containing the user's email and password.
 * @returns {Promise<object>} A promise that resolves to an object containing the auth token.
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  // Handle potential errors, such as wrong credentials, by parsing the server's response.
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to login');
  }
  // On success, the response body will contain the JWT.
  return response.json();
};