const TOKEN_KEY = 'mern_chat_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
