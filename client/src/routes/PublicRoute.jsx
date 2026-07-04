import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
