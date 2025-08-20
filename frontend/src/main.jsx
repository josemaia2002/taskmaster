// --- IMPORTS ---
// Import necessary libraries and components for the React application.

// `StrictMode` is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants (runs only in development mode).
import { StrictMode } from 'react';

// `createRoot` is the new API for rendering a React app in the browser,
// enabling concurrent features.
import { createRoot } from 'react-dom/client';

// Import the main stylesheet for the application. This applies global styles.
import './index.css';

// `App` is the main root component that contains all other components of the application.
import App from './App.jsx';

// `BrowserRouter` provides routing capabilities to the application,
// using the browser's history API to keep the UI in sync with the URL.
import { BrowserRouter } from 'react-router-dom';


// --- APPLICATION INITIALIZATION ---

// 1. Get the root DOM element: Find the `div` with the ID 'root' in the `index.html` file.
//    This is the container where the entire React application will be mounted.
const rootElement = document.getElementById('root');

// 2. Create a React root: Use the new `createRoot` API to manage rendering in the root element.
const root = createRoot(rootElement);

// 3. Render the application: Use the `render` method to display the component tree.
root.render(
  // <StrictMode> wraps the entire app to help catch common mistakes and unsafe lifecycles.
  <StrictMode>
    {/* <BrowserRouter> wraps the App component to provide routing context to all child
        components, allowing the use of components like <Route>, <Link>, and <Navigate>. */}
    <BrowserRouter>
      {/* <App /> is the main component of your application, where everything starts. */}
      <App />
    </BrowserRouter>
  </StrictMode>
);