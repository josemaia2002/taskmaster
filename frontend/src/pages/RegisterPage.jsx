import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  // 1. ESTADO PARA OS CAMPOS DO FORMULÁRIO
  // Usamos useState para criar variáveis que guardam os valores dos inputs.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para guardar mensagens de erro

  // O hook useNavigate nos permite redirecionar o usuário
  const navigate = useNavigate();

  // 2. FUNÇÃO DE SUBMISSÃO
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página.
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      // 3. CHAMADA À API USANDO FETCH
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a resposta não for bem-sucedida, lança um erro com a mensagem do backend.
        // O `data.error` vem do `res.json({ error: '...' })` no seu backend.
        throw new Error(data.error || 'Falha ao registrar');
      }

      // Se o registro for bem-sucedido:
      alert('Registro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login'); // Redireciona para a página de login

    } catch (err) {
      // Captura qualquer erro (de rede ou da API) e o exibe para o usuário
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
        
        {/* Exibe a mensagem de erro, se houver */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* 4. CONECTANDO ESTADO E SUBMISSÃO AO JSX */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              value={name} // O valor do input é controlado pelo estado
              onChange={(e) => setName(e.target.value)} // Atualiza o estado a cada digitação
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="Seu Nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="voce@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}