import httpClient from '../api/httpClient.js';

export const registerUser = async (payload) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await httpClient.post('/auth/logout');
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await httpClient.get('/auth/me');
  return data;
};
