import { useState } from 'react';
import { sendChatMessage } from '../api/npcApi';

export const useChatHattaPresenter = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(message);
      console.log(response);
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.data.response,
        sender: 'soekarno',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      console.error("Error sending message:", err);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        sender: 'soekarno',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};