import axios from 'axios';
import { clearToken, getToken } from '../utils/tokenStorage.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
    }

    return Promise.reject(error);
  }
);

export default httpClient;
