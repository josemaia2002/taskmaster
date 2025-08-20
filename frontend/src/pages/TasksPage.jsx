import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar as tarefas iniciais
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Função para ADICIONAR uma nova tarefa
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return; // Não adiciona tarefas vazias
    try {
      const newTask = await createTask(newTaskTitle);
      // Adiciona a nova tarefa à lista na tela sem precisar recarregar
      setTasks([newTask, ...tasks]);
      setNewTaskTitle(''); // Limpa o input
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para DELETAR uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      // Remove a tarefa da lista na tela
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para ATUALIZAR (marcar/desmarcar) uma tarefa
  const handleToggleTask = async (id, completed) => {
    try {
      await updateTask(id, { completed: !completed });
      // Atualiza a tarefa na lista na tela
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Carregando tarefas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-100">Minhas Tarefas</h1>
      
      {/* Formulário para adicionar nova tarefa */}
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

      {/* Lista de tarefas */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Você ainda não tem tarefas.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                  className="h-6 w-6"
                />
                <span className={task.completed ? 'line-through text-gray-500' : 'dark:text-gray-100'}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 flex items-center gap-1"
              >
                {/* Ícone de lixeira (sempre visível) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {/* Texto "Deletar" (visível apenas em telas 'sm' e maiores) */}
                <span className="hidden sm:inline">Deletar</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}