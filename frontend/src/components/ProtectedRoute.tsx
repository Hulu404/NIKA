import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;  // ← правильный тип для children
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });  // replace: true — чтобы не оставлять /chat в истории
    }
  }, [token, navigate]);

  // Если токена нет — ничего не рендерим (или можно показать лоадер)
  if (!token) {
    return null;  // или <div>Загрузка...</div>
  }

  return <>{children}</>;  // ← правильный возврат
}