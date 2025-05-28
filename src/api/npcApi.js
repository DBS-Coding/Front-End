import axios from "axios";

const API_BASE_URL = "https://capstone-five-dusky.vercel.app";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendChatMessage = async (input) => {
  try {
    const response = await apiClient.post("/chatbot/process", {
      input: input,
    });
    return response;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
};

export const createOrUpdateTag = async (tagData) => {
  try {
    const response = await apiClient.post("/chatbot/tags", {
      tag: tagData.tag,
      input: tagData.input,
      responses: tagData.responses,
    });
    return response;
  } catch (error) {
    console.error("Create/Update Tag API Error:", error);
    throw error;
  }
};

export const getAllTags = async () => {
  try {
    const response = await apiClient.get("/chatbot/tags");
    return response;
  } catch (error) {
    console.error("Get All Tags API Error:", error);
    throw error;
  }
};

export const getSpecificTag = async (tagName) => {
  try {
    const response = await apiClient.get(`/chatbot/tags/${tagName}`);
    return response;
  } catch (error) {
    console.error("Get Specific Tag API Error:", error);
    throw error;
  }
};

export const deleteTag = async (tagName) => {
  try {
    const response = await apiClient.delete(`/chatbot/tags/${tagName}`);
    return response;
  } catch (error) {
    console.error("Delete Tag API Error:", error);
    throw error;
  }
};

export default apiClient;
