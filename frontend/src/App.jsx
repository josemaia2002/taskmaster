import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Componente simples para a página inicial
function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Página Inicial</h1>
      <nav className="flex space-x-4 mt-4">
        <Link to="/login" className="text-blue-500 hover:underline">Ir para Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Ir para Registro</Link>
      </nav>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;