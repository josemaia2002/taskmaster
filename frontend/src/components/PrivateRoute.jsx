// --- IMPORTS ---
// Import the `Maps` component from `react-router-dom`. This component is used
// to programmatically redirect the user to a different route.
import { Navigate } from 'react-router-dom';

/**
 * A wrapper component that protects routes from unauthenticated access.
 * It checks for the presence of an authentication token in localStorage.
 * If the token exists, it renders the child components (the protected page).
 * If not, it redirects the user to the login page.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The component(s) to render if the user is authenticated.
 */
export default function PrivateRoute({ children }) {
  // --- AUTHENTICATION CHECK ---
  // 1. Look for the 'token' in the browser's localStorage. This is the primary
  //    method in this app to determine if a user has previously logged in.
  const token = localStorage.getItem('token');

  // --- CONDITIONAL RENDERING LOGIC ---
  // 2. If no token is found (i.e., `token` is null or undefined), the user is
  //    considered unauthenticated.
  if (!token) {
    // Redirect the user to the '/login' page. The `Maps` component handles
    // the redirection declaratively within the component tree.
    return <Navigate to="/login" replace />; // `replace` prevents the user from going back to the protected page via the browser's back button.
  }

  // 3. If a token exists, the user is considered authenticated.
  //    The component then renders its `children`. In the context of `App.jsx`,
  //    `children` would be the `<Layout>` and `<TasksPage>` components.
  return children;
}