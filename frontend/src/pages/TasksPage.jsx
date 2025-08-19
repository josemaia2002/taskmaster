import { useEffect, useState } from 'react';
import { getTasks } from '../services/api'; // 1. Importa nossa função da API

export default function TasksPage() {
  // 2. Cria estados para guardar as tarefas, o carregamento e os erros
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. useEffect para buscar os dados quando o componente montar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data); // Guarda as tarefas no estado
      } catch (err) {
        setError(err.message); // Guarda o erro no estado
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTasks();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // 4. Renderização condicional baseada nos estados
  if (loading) {
    return <div className="p-8 text-center">Carregando tarefas...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Minhas Tarefas</h1>
      
      {tasks.length === 0 ? (
        <p>Você ainda não tem tarefas.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}