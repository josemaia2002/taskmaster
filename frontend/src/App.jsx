import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

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
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rotas Privadas */}
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Layout>
              <TasksPage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;