import { useNavigate, Link } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <header className="bg-white shadow-md dark:bg-slate-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/tasks" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TaskMaster
            </Link>
            <ThemeToggler />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}