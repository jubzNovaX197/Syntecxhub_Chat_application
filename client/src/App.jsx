import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
