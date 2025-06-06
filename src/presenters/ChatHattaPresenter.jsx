import { useState } from 'react';
import { sendChatMessageRag, sendChatTfjsHatta } from '../api/npcApi';

export const useChatHattaPresenter = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictedTag, setPredictedTag] = useState(null);

  const saveToChatHistory = (userMsg, botMsg) => {
  const existing = JSON.parse(localStorage.getItem("chat-hatta")) || [];

  const updated = [...existing, userMsg, botMsg];

  localStorage.setItem("chat-hatta", JSON.stringify(updated));
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
        sender: 'hatta'
      };

      if(selectedModel === "rag") {
        response = await sendChatMessageRag(message, 'hatta');
        console.log('RAG Response:', response); // Debug log
        
        // Fix: response sudah berupa object dengan property response
        botMessage.text = response.response || response;
        botMessage.timestamp = new Date().toLocaleTimeString();
        
        // RAG tidak memiliki predictedTag, set null
        setPredictedTag(null);
      } else {
        response = await sendChatTfjsHatta(message);
        console.log('TFJS Response:', response); // Debug log
        
        // Validasi response dari TFJS
        if (!response || !response.randomResponse) {
          throw new Error('Invalid response from TFJS model');
        }
        
        botMessage.text = response.randomResponse;
        botMessage.timestamp = new Date().toLocaleTimeString() + 
          ` ${response.predictedTag || 'unknown'} [${response.probability || 0}%]`;
        
        setPredictedTag(response.predictedTag);
      }

      setMessages(prev => [...prev, botMessage]);
      saveToChatHistory(userMessage, botMessage);
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      console.error("Error sending message:", err);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        sender: 'hatta', // Fix: seharusnya 'hatta', bukan 'soekarno'
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
    setMessages,
    predictedTag,
    isLoading,
    error,
    sendMessage,
  };
};
