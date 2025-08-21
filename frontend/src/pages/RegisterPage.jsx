// --- IMPORTS ---
// Import the `useState` hook from React to manage the component's state (form fields, errors).
import { useState } from 'react';
// Import the `useNavigate` hook from react-router-dom to programmatically redirect the user after registration.
import { useNavigate } from 'react-router-dom';

// Import the specific API service function for user registration.
import { registerUser } from '../services/api';

/**
 * Renders the registration page component.
 * It includes a form for new users to create an account,
 * handles the API request for registration, and provides user feedback.
 */
export default function RegisterPage() {
  // --- STATE MANAGEMENT ---
  // `useState` hooks to store the values of the name, email, and password fields.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to hold and display any error messages that occur during the registration attempt.
  const [error, setError] = useState(null);

  // The `useNavigate` hook provides a function to programmatically change routes.
  const navigate = useNavigate();

  /**
   * Handles the form submission event when the user clicks the "Registrar" button.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    // Prevent the browser's default behavior of reloading the page on form submission.
    e.preventDefault();
    // Clear any previous error messages before making a new API request.
    setError(null);
  
    try {
      // Call the `registerUser` function from the API service, passing the user's data.
      // This abstracts away the `fetch` logic into a reusable service.
      await registerUser({ name, email, password });
      
      // If the registration is successful, inform the user and redirect them.
      alert('Registration successful! You will be redirected to the login page.');
      // Programmatically navigate the user to the '/login' page so they can sign in.
      navigate('/login');
  
    } catch (err) {
      // If the `registerUser` function throws an error, catch it and update the state
      // to display the error message to the user.
      setError(err.message);
    }
  };

  // --- JSX RENDER ---
  // The UI of the registration form.
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
        
        {/* Conditionally render the error message only if the `error` state is not null. */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* Link the form's `onSubmit` event to our `handleSubmit` function. */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            {/* This is a "controlled component": its value is directly tied to the React state (`name`). */}
            <input
              type="text"
              value={name}
              // The `onChange` event handler updates the state on every keystroke.
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
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
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}