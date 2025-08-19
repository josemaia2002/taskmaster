const API_URL = 'http://localhost:5000/api';

// Função para buscar as tarefas do usuário logado
export const getTasks = async () => {
  // 1. Pega o token do localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Nenhum token encontrado.');
  }

  // 2. Faz a chamada GET para /tasks, enviando o token no cabeçalho
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      // É assim que o backend sabe quem está fazendo a requisição
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar as tarefas.');
  }

  // 3. Retorna os dados (a lista de tarefas)
  return response.json();
};