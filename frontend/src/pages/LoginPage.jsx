// --- IMPORTS ---
// Import the `useState` hook from React to manage the component's state (form fields, errors).
import { useState } from 'react';
// Import the `useNavigate` hook from react-router-dom to programmatically redirect the user after login.
import { useNavigate } from 'react-router-dom';

// Import the specific API service function for user login.
import { loginUser } from '../services/api';

/**
 * Renders the login page component.
 * It includes a form for users to enter their email and password,
 * handles API requests for authentication, and manages user feedback.
 */
export default function LoginPage() {
  // --- STATE MANAGEMENT ---
  // `useState` hooks to store and update the values of the form inputs.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to hold any error messages from the login attempt to display to the user.
  const [error, setError] = useState(null);
  // `useNavigate` hook provides a function to change routes.
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * This function is called when the user clicks the "Entrar" button.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    // Prevent the default browser action of reloading the page on form submission.
    e.preventDefault();
    // Clear any previous error messages before making a new request.
    setError(null);
  
    try {
      // Call the `loginUser` function from the API service, passing the user's credentials.
      // This abstracts the `fetch` logic into a reusable service function.
      const data = await loginUser({ email, password });
      
      // --- LOGIN SUCCESS ---
      // If login is successful, store the returned token in localStorage to maintain the session.
      localStorage.setItem('token', data.token);
      
      // Redirect the user to the protected '/tasks' page.
      navigate('/tasks');
  
    } catch (err) {
      // If the `loginUser` function throws an error (e.g., wrong credentials),
      // catch it and update the state to display the error message.
      setError(err.message);
    }
  };

  // --- JSX RENDER ---
  // The UI of the login form.
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {/* Conditionally render the error message only if the `error` state is not null. */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {/* The `onSubmit` event on the form is linked to our `handleSubmit` function. */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            {/* This is a "controlled component". Its value is controlled by the React state (`email`). */}
            <input
              type="email"
              value={email}
              // The `onChange` event updates the state every time the user types.
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}