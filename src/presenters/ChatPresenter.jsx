import { useState } from "react";
import { sendChatMessageRag, sendChatTfjs } from "../api/npcApi";

export const useChatPresenter = ({ npc }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictedTag, setPredictedTag] = useState(null);

  const saveToChatHistory = (userMsg, botMsg) => {
    const existing = JSON.parse(localStorage.getItem(`chat-${npc}`)) || [];
    const updated = [...existing, userMsg, botMsg];
    localStorage.setItem(`chat-${npc}`, JSON.stringify(updated));
  };

  const sendMessage = async (message, selectedModel) => {
    if (!message.trim()) return;

    const startTime = Date.now(); // ⏱️ Mulai hitung durasi

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: formatTimestamp(startTime),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      let response = null;
      let botMessage = {
        id: startTime + 1,
        sender: npc,
      };

      if (selectedModel === "rag") {
        response = await sendChatMessageRag(message, npc);
        // console.log("RAG Response:", response);

        // Fix: response sudah berupa object dengan property response
        botMessage.text = 
          typeof response.response === "string"
            ? response.response
            : JSON.stringify(response);

        botMessage.timestamp = new Date().toLocaleTimeString();
      } else {
        response = await sendChatTfjs(message, npc);
        botMessage.text = response.randomResponse;
      }

      const endTime = Date.now(); // ⏱️ Selesai hitung durasi
      const durationSeconds = Math.round((endTime - startTime) / 1000); // Dalam detik

      botMessage.timestamp =
        formatTimestamp(endTime) +
        ` (${durationSeconds}s${
          selectedModel !== "rag"
            ? `, ${response.predictedTag} [${response.probability}%]`
            : ""
        })`;

      // console.log(response);
      setPredictedTag(response.predictedTag);
      setMessages((prev) => [...prev, botMessage]);
      saveToChatHistory(userMessage, botMessage);
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      console.error("Error sending message:", err);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        sender: "soekarno",
        timestamp: formatTimestamp(Date.now()),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]); // cth: "14:05, 10 June (7s, proklamasi [92.5%])""
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

// 🔧 Fungsi bantu: format waktu ke cth "13:59, 10 June"
const formatTimestamp = (dateValue) => {
  const date = new Date(dateValue);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${hours}:${minutes}, ${day} ${month}`;
};
