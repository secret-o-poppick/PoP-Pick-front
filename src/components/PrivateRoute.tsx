import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function PrivateRoute() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    // 인증이 반드시 필요한 페이지
    return <Outlet />;
  }

  return <Navigate replace to='/' />;
}
