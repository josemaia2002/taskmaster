// The base URL for all API requests. This makes it easy to change the API endpoint in one place.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * A helper function to retrieve the authentication token from local storage.
 * This token is required for all authenticated API requests.
 * @returns {string} The authentication token.
 * @throws {Error} If no token is found in local storage.
 */
const getToken = () => {
  // Retrieve the token that was saved during the login process.
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token exists, the user is not authenticated. Throw an error
    // to prevent making an unauthenticated request.
    throw new Error('No token found.');
  }
  return token;
};

// --- CRUD Functions ---

/**
 * Fetches all tasks for the authenticated user.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */
export const getTasks = async () => {
  const token = getToken();
  // Make a GET request to the /tasks endpoint.
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      // The Authorization header is required to prove the user's identity.
      // The 'Bearer' scheme is a standard way to send JWTs.
      'Authorization': `Bearer ${token}`,
    },
  });
  // If the server responds with an error status (e.g., 401, 500), throw an error.
  if (!response.ok) throw new Error('Failed to fetch tasks.');
  // Parse the JSON response body and return the data.
  return response.json();
};

/**
 * Creates a new task.
 * @param {string} title - The title of the new task.
 * @returns {Promise<object>} A promise that resolves to the newly created task object.
 */
export const createTask = async (title) => {
  const token = getToken();
  // Make a POST request to create a new resource.
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      // 'Content-Type' tells the server that we are sending data in JSON format.
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    // The `body` contains the data for the new task, converted to a JSON string.
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
  // Make a PUT request to a specific task's URL (e.g., /api/tasks/123).
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update task.');
  // Many PUT endpoints return a success status without a body.
  // We return a simple success object to confirm the operation completed.
  return { success: true };
};

/**
 * Deletes a task by its ID.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<object>} A promise that resolves to an object indicating success.
 */
export const deleteTask = async (id) => {
  const token = getToken();
  // Make a DELETE request to a specific task's URL.
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete task.');
  // A successful DELETE request typically returns a 204 No Content status.
  // We return a success object to signal completion in our application.
  return { success: true };
};