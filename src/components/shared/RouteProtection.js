import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const RoleRoute = ({ allowedRole }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (role === allowedRole) return <Outlet />;
  // Redirect to the correct dashboard based on actual role
  return <Navigate to={role === 'admin' ? '/admin' : '/employee'} />;
};