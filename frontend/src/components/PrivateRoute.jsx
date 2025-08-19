import { Navigate } from 'react-router-dom';

// Este componente funciona como um "invólucro" (wrapper).
// Ele recebe os 'children', que são os componentes que ele deve proteger.
export default function PrivateRoute({ children }) {
  // 1. Verifica se o token existe no localStorage
  const token = localStorage.getItem('token');

  // 2. Se NÃO houver token, redireciona para a página de login
  if (!token) {
    // O componente Navigate do React Router faz o redirecionamento
    return <Navigate to="/login" />;
  }

  // 3. Se houver um token, renderiza o componente filho (a página protegida)
  return children;
}