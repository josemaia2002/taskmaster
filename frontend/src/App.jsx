// --- IMPORTS ---
// Import core components from `react-router-dom` for defining the app's navigation structure.
import { Routes, Route, Link } from 'react-router-dom';

// Import page components, which represent the different views of the application.
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

// Import custom components for handling route protection and UI structure.
import PrivateRoute from './components/PrivateRoute'; // A wrapper to protect routes that require authentication.
import Layout from './components/Layout';             // A component that provides a consistent page structure (e.g., navbar, footer).

/**
 * A simple component for the application's home page.
 * It serves as a landing page with navigation links.
 */
function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Página Inicial</h1>
      {/* The <Link> component creates navigation links that update the URL without a full page refresh. */}
      <nav className="flex space-x-4 mt-4">
        <Link to="/login" className="text-blue-500 hover:underline">Ir para Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Ir para Registro</Link>
      </nav>
    </div>
  );
}

/**
 * The main App component, which acts as the root for all route definitions.
 */
function App() {
  return (
    // The `<Routes>` component is a container for a collection of `<Route>` elements.
    // It will render the UI of the first `<Route>` that matches the current URL.
    <Routes>
      {/* --- Public Routes --- */}
      {/* These routes are accessible to any user, authenticated or not. */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- Private Routes --- */}
      {/* This route is protected. Only authenticated users will be able to access it. */}
      <Route
        path="/tasks"
        element={
          // 1. `<PrivateRoute>` acts as a gatekeeper. It checks if the user is logged in.
          //    If not, it redirects them to the login page.
          //    If they are logged in, it renders its `children`.
          <PrivateRoute>
            {/* 2. `<Layout>` provides a consistent visual structure (like a header and sidebar)
                   for the protected parts of the application. */}
            <Layout>
              {/* 3. `<TasksPage />` is the actual page content that is displayed inside the Layout
                     if the user is successfully authenticated. */}
              <TasksPage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;