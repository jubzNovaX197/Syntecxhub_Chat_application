import httpClient from "../api/httpClient";

export const getConversations = async () => {
  const { data } = await httpClient.get("/conversations");
  return data.conversations;
};

export const createConversation = async (participantId) => {
  const { data } = await httpClient.post("/conversations", {
    participantId,
  });

  return data.conversation;
};

export const getConversation = async (conversationId) => {
  const { data } = await httpClient.get(
    `/conversations/${conversationId}`
  );

  return data.conversation;
};