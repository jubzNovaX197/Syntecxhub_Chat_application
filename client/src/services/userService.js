import httpClient from "../api/httpClient";

export const getUsers = async () => {
  const { data } = await httpClient.get("/users");

  return data.users;
};