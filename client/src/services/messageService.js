import httpClient from "../api/httpClient";

export const getMessages = async (conversationId) => {
  const { data } = await httpClient.get(
    `/conversations/${conversationId}/messages`
  );

  return data.messages;
};

export const sendMessage = async (conversationId, content) => {
  const { data } = await httpClient.post(
    `/conversations/${conversationId}/messages`,
    {
      content,
    }
  );

  return data.message;
};