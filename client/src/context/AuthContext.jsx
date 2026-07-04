import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService.js';
import { clearToken, getToken, saveToken } from '../utils/tokenStorage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCurrentUser = useCallback(async () => {
    if (!getToken()) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const register = async (payload) => {
    const data = await registerUser(payload);
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (payload) => {
    const data = await loginUser(payload);
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      clearToken();
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      register,
      login,
      logout
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
