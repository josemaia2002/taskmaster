// --- IMPORTS ---
// Import React hooks for managing state (`useState`) and side effects (`useEffect`).
import { useEffect, useState } from 'react';

/**
 * A component that renders a button to toggle between light and dark themes.
 * It persists the user's theme choice in localStorage.
 */
export default function ThemeToggler() {
  // --- STATE MANAGEMENT ---
  // Initialize the `theme` state. It first tries to get the saved theme from localStorage.
  // If no theme is found (e.g., on a user's first visit), it defaults to 'light'.
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // --- SIDE EFFECT FOR THEME CHANGES ---
  // The `useEffect` hook runs after every render where the `theme` state has changed.
  // It synchronizes the theme with the DOM and localStorage.
  useEffect(() => {
    // Check the current theme state.
    if (theme === 'dark') {
      // If the theme is 'dark', add the 'dark' class to the root <html> element.
      // This is how Tailwind CSS's dark mode variants (`dark:...`) are activated.
      document.documentElement.classList.add('dark');
    } else {
      // If the theme is 'light', remove the 'dark' class.
      document.documentElement.classList.remove('dark');
    }
    // Save the current theme choice to localStorage so it persists across page reloads.
    localStorage.setItem('theme', theme);
  }, [theme]); // The dependency array `[theme]` ensures this effect only runs when the theme state changes.

  /**
   * Toggles the theme state between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    // Use a ternary operator to set the theme to the opposite of its current value.
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // --- JSX RENDER ---
  return (
    // The button's `onClick` event is linked to the `toggleTheme` function.
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
      {/* Conditionally render an icon based on the current theme state. */}
      {theme === 'light' ? (
        // If the theme is 'light', show the Moon icon (to switch to dark).
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      ) : (
        // If the theme is 'dark', show the Sun icon (to switch to light).
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      )}
    </button>
  );
}