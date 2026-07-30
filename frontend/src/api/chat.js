import { protectedAxiosInstance } from "./axios";

export const chatApi = {
  async sendMessage({ sessionKey, question, productId, email }) {
    const response = await protectedAxiosInstance.post("/chat/send/", {
      session_key: sessionKey,
      question: question,
      product_id: '71230bbf-132e-4f47-9a9a-96495340102c',
      email: email,
    });
    return response.data;
  },

  async getHistory(sessionKey) {
    const response = await protectedAxiosInstance.get(`/chat/history/${sessionKey}/`);
    return response.data;
  },

  async sendFeedback({ sessionId, rating, comment }) {
    const response = await protectedAxiosInstance.post("/chat/feedback/", {
      session: sessionId,
      rating: rating,
      comment: comment,
    });
    return response.data;
  },
};