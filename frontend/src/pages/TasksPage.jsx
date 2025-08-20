// --- IMPORTS ---
// Import React hooks for managing state (`useState`) and side effects (`useEffect`).
import { useEffect, useState } from 'react';
// Import the API functions that will communicate with the backend.
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

/**
 * Renders the main tasks page, allowing users to view, add, update, and delete their tasks.
 */
export default function TasksPage() {
  // --- STATE MANAGEMENT ---
  // `tasks`: An array to store the list of tasks fetched from the API.
  const [tasks, setTasks] = useState([]);
  // `newTaskTitle`: A string to control the value of the "add task" input field.
  const [newTaskTitle, setNewTaskTitle] = useState('');
  // `loading`: A boolean to track the initial data fetching state, used to show a loading message.
  const [loading, setLoading] = useState(true);
  // `error`: A string to store any error messages from API calls.
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  // `useEffect` hook to fetch the initial list of tasks when the component first mounts.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Call the API to get the user's tasks.
        const data = await getTasks();
        // Update the state with the fetched tasks.
        setTasks(data);
      } catch (err) {
        // If an error occurs, update the error state.
        setError(err.message);
      } finally {
        // `finally` ensures that loading is set to false whether the fetch succeeds or fails.
        setLoading(false);
      }
    };
    // Call the async function to start the fetch.
    fetchTasks();
  }, []); // The empty dependency array `[]` means this effect runs only once, on component mount.

  // --- HANDLER FUNCTIONS (CRUD) ---

  /** Handles the creation of a new task. */
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission.
    if (!newTaskTitle.trim()) return; // Prevent adding tasks with empty titles.
    try {
      const newTask = await createTask(newTaskTitle);
      // Optimistic UI Update: Add the new task to the top of the local state list immediately
      // without needing to re-fetch all tasks from the server. This makes the UI feel faster.
      setTasks([newTask, ...tasks]);
      setNewTaskTitle(''); // Clear the input field after submission.
    } catch (err) {
      setError(err.message);
    }
  };

  /** Handles the deletion of a task. */
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      // Optimistic UI Update: Filter the deleted task out of the local state.
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /** Handles toggling a task's 'completed' status. */
  const handleToggleTask = async (id, completed) => {
    try {
      await updateTask(id, { completed: !completed });
      // Optimistic UI Update: Map over the tasks and update the specific task that was changed.
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // --- CONDITIONAL RENDERING ---
  // Display a loading message while the initial tasks are being fetched.
  if (loading) return <div className="p-8 text-center">Carregando tarefas...</div>;
  // Display an error message if the fetch fails.
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  // --- JSX RENDER ---
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-100">Minhas Tarefas</h1>
      
      {/* Form for adding a new task */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="flex-grow p-2 border rounded-lg dark:bg-slate-800"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Adicionar
        </button>
      </form>

      {/* Renders the list of tasks or a message if no tasks exist. */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Você ainda não tem tarefas.</p>
      ) : (
        <ul className="space-y-4">
          {/* Map over the `tasks` array to render each task as a list item. */}
          {tasks.map((task) => (
            <li
              key={task.id} // The `key` prop is essential for React's list rendering performance.
              className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {/* Checkbox to toggle the task's completed status. */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                  className="h-6 w-6"
                />
                {/* Task title with conditional styling: line-through if completed. */}
                <span className={task.completed ? 'line-through text-gray-500' : 'dark:text-gray-100'}>
                  {task.title}
                </span>
              </div>
              {/* Button to delete the task. */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 flex items-center gap-1"
              >
                {/* SVG icon for the delete button. */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {/* The "Deletar" text is hidden on small screens for a more compact UI. */}
                <span className="hidden sm:inline">Deletar</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}