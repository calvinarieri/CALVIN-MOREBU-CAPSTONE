import React, { createContext, useContext, useState, useEffect } from "react";
import { chatApi } from "../api/chat";

const ChatContext = createContext(null);

export function ChatProvider({ children, productId }) {
  const [sessionKey, setSessionKey] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize or retrieve persistent session key
  useEffect(() => {
    let key = localStorage.getItem("chat_session_key");
    if (!key) {
      key = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("chat_session_key", key);
    }
    setSessionKey(key);

    // Load past message history from Django
    chatApi.getHistory(key)
      .then((history) => {
        setMessages(history);
        if (history.length > 0) {
          setSessionId(history[0].session);
        }
      })
      .catch((err) => console.error("History fetch error:", err));
  }, []);

  const sendMessage = async (question, email = null) => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);

    // Optimistic UI update for user message
    const tempUserMessage = {
      id: "temp-" + Date.now(),
      question,
      response: null,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const data = await chatApi.sendMessage({
        sessionKey,
        question,
        productId,
        email,
      });

      // Update with confirmed response from server
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempUserMessage.id ? data : msg))
      );
      if (data.session) setSessionId(data.session);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (rating, comment) => {
    if (!sessionId) return;
    return await chatApi.sendFeedback({ sessionId, rating, comment });
  };

  return (
    <ChatContext.Provider
      value={{
        sessionKey,
        messages,
        loading,
        error,
        sendMessage,
        submitFeedback,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);