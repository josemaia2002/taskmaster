// --- IMPORTS ---
// Import hooks and components from react-router-dom for navigation.
import { useNavigate, Link } from 'react-router-dom';
// Import a custom component for toggling the theme (light/dark mode).
import ThemeToggler from './ThemeToggler';

/**
 * A reusable Layout component that wraps protected page content.
 * It provides a consistent header with a title, theme toggler, and a logout button.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The page content to be rendered inside the layout.
 */
export default function Layout({ children }) {
  // The `useNavigate` hook provides a function to programmatically navigate between routes.
  const navigate = useNavigate();

  /**
   * Handles the user logout process.
   */
  const handleLogout = () => {
    // 1. Remove the authentication token from localStorage. This effectively logs the user out.
    localStorage.removeItem('token');
    // 2. Redirect the user to the login page.
    navigate('/login');
  };

  // --- JSX RENDER ---
  return (
    // Main container with full-screen height and background colors for light/dark modes.
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <header className="bg-white shadow-md dark:bg-slate-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* The `<Link>` component acts as a clickable title that navigates to the main tasks page. */}
            <Link to="/tasks" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TaskMaster
            </Link>

            {/* Component to switch between light and dark themes. */}
            <ThemeToggler />

            {/* The logout button triggers the `handleLogout` function when clicked. */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      {/* The `<main>` element is where the actual page content will be rendered. */}
      {/* `{children}` is a special prop in React that renders whatever components
          were nested inside the `<Layout>` component in `App.jsx`. */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}