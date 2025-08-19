const API_URL = 'http://localhost:5000/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Nenhum token encontrado.');
  }
  return token;
};

// READ
export const getTasks = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Falha ao buscar as tarefas.');
  return response.json();
};

// CREATE
export const createTask = async (title) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Falha ao criar a tarefa.');
  return response.json();
};

// UPDATE
export const updateTask = async (id, updates) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Falha ao atualizar a tarefa.');
  // O PUT não retorna a tarefa atualizada, então retornamos sucesso
  return { success: true }; 
};

// DELETE
export const deleteTask = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Falha ao deletar a tarefa.');
  // O DELETE retorna 204, sem conteúdo
  return { success: true };
};