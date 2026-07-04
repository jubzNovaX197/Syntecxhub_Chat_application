import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
