import { useState } from 'react';
import { sendChatMessageRag, sendChatTfjsSoekarno } from '../api/npcApi';

export const useChatSoekarnoPresenter = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictedTag, setPredictedTag] = useState(null);

  const saveToChatHistory = (userMsg, botMsg) => {
  const existing = JSON.parse(localStorage.getItem("chat-soekarno")) || [];

  const updated = [...existing, userMsg, botMsg];

  localStorage.setItem("chat-soekarno", JSON.stringify(updated));
  };

  const sendMessage = async (message, selectedModel) => {
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
      let response = null;
      let botMessage = {
        id: Date.now() + 1,
        sender: 'soekarno',
      };
      if (selectedModel === 'rag') {
        response = await sendChatMessageRag(message);
        botMessage.text = response;
        botMessage.timestamp = new Date().toLocaleTimeString();
      } else {
        response = await sendChatTfjsSoekarno(message);
        botMessage.text = response.randomResponse;
        botMessage.timestamp =
          new Date().toLocaleTimeString() +
          ` ${response.predictedTag} [${response.probability}%]`;
      }
      // console.log(response);
      setPredictedTag(response.predictedTag);
      setMessages((prev) => [...prev, botMessage]);
      saveToChatHistory(userMessage, botMessage);
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      console.error('Error sending message:', err);

      const errorMessage = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        sender: 'soekarno',
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    predictedTag,
    isLoading,
    error,
    sendMessage,
  };
};
