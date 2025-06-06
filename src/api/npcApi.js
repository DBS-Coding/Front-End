import axios from "axios";

import * as tf from "@tensorflow/tfjs";

let modelSoekarno = null;
let wordIndexSoekarno = {};
let responsesSoekarno = {};
let classLabelsSoekarno = [];

let modelHatta = null;
let wordIndexHatta = {};
let responsesHatta = {};
let classLabelsHatta = [];
let maxLen = 10;
let possibleResponses = [];

const API_BASE_URL = "https://capstone-five-dusky.vercel.app";
const API_MODEL_TFJS_URL = "https://dbs-coding.github.io/histotalk-model1-tfjs";
const API_MODEL_RAG_URL =
  "https://chatbot-character-1091601261833.asia-southeast2.run.app/chat";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const initModelSoekarno = async () => {
  if (modelSoekarno) return;

  modelSoekarno = await tf.loadGraphModel(
    `${API_MODEL_TFJS_URL}/soekarno/model.json`
  );

  const wordIndexResponse = await fetch(
    `${API_MODEL_TFJS_URL}/soekarno/word_index.json`
  );
  wordIndexSoekarno = await wordIndexResponse.json();

  const contentSoekarnoResponse = await fetch(
    `${API_MODEL_TFJS_URL}/soekarno/content.json`
  );
  responsesSoekarno = await contentSoekarnoResponse.json();

  classLabelsSoekarno = Object.keys(responsesSoekarno);
};

const initModelHatta = async () => {
  if (modelHatta) return;

  modelHatta = await tf.loadGraphModel(
    `${API_MODEL_TFJS_URL}/hatta/model.json`
  );

  const wordIndexResponse = await fetch(
    `${API_MODEL_TFJS_URL}/hatta/word_index.json`
  );
  wordIndexHatta = await wordIndexResponse.json();

  const contentHattaResponse = await fetch(
    `${API_MODEL_TFJS_URL}/hatta/content.json`
  );
  responsesHatta = await contentHattaResponse.json();

  classLabelsHatta = Object.keys(responsesHatta);
};

// Padding helper
const padSequences = (sequences, maxlen = 10) => {
  return sequences.map((seq) => {
    if (seq.length > maxlen) {
      return seq.slice(0, maxlen);
    }

    const padded = new Array(maxlen).fill(0);
    for (let i = 0; i < seq.length; i++) {
      padded[i] = seq[i];
    }
    return padded;
  });
};

const predict = async (model, word_index, inputText) => {
  const cleanedText = inputText.toLowerCase().replace(/[^\w\s]/gi, "");
  const tokens = cleanedText.split(" ").map((word) => word_index[word] || 0);
  const padded = padSequences([tokens], maxLen);
  const inputTensor = tf.tensor2d(padded, [1, maxLen]);

  const result = model.predict({ Identity: inputTensor });
  const probabilities = result.softmax();
  const outputData = await probabilities.data();
  const outputArray = Array.from(outputData);
  return outputArray;
};

export const sendChatTfjsSoekarno = async (inputText) => {
  try {
    await initModelSoekarno();

    const outputArray = await predict(
      modelSoekarno,
      wordIndexSoekarno,
      inputText
    );

    const predictionIndex = outputArray.indexOf(Math.max(...outputArray));
    const predictionValue = outputArray[predictionIndex];
    const predictedTag = classLabelsSoekarno[predictionIndex]; // Gunakan classLabelsSoekarno

    possibleResponses = responsesSoekarno[predictedTag] || [];
    const randomResponse =
      possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

    return {
      predictedTag,
      probability: Math.round(predictionValue * 100),
      randomResponse,
    };
  } catch (error) {
    console.error("Chat model error:", error);
    throw error;
  }
};

export const sendChatTfjsHatta = async (inputText) => {
  try {
    await initModelHatta();

    const outputArray = await predict(modelHatta, wordIndexHatta, inputText);

    const predictionIndex = outputArray.indexOf(Math.max(...outputArray));
    const predictionValue = outputArray[predictionIndex];
    const predictedTag = classLabelsHatta[predictionIndex]; // Gunakan classLabelsHatta

    possibleResponses = responsesHatta[predictedTag] || [];
    const randomResponse =
      possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

    return {
      predictedTag,
      probability: Math.round(predictionValue * 100),
      randomResponse,
    };
  } catch (error) {
    console.error("Chat model error:", error);
    throw error;
  }
};

export const sendChatMessageRag = async (inputText, npc = "") => {
  try {
    const payload = {
      karakter: npc || "soekarno",
      prompt: inputText,
    };

    const response = await fetch(API_MODEL_RAG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    return {
      response: data.response || data,
      karakter: data.karakter || npc,
    };
  } catch (error) {
    console.error("sendChatMessageRagModel Error:", error);
    return {
      response: "Maaf, terjadi kesalahan dalam memproses pesan.",
      karakter: npc,
    };
  }
};

export const createOrUpdateTag = async (tagData) => {
  try {
    const response = await apiClient.post("/chatbot/tags", {
      nama: tagData.nama,
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

export const getSoekarnoTags = async () => {
  try {
    const response = await apiClient.get("/chatbot/tags/nama/Soekarno");
    return response;
  } catch (error) {
    console.error("Get soekarno Tags API Error:", error);
    throw error;
  }
};

export const getHattaTags = async () => {
  try {
    const response = await apiClient.get("/chatbot/tags/nama/Hatta");
    return response;
  } catch (error) {
    console.error("Get Hatta Tags API Error:", error);
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

export const deleteTag = async (tagId) => {
  try {
    const response = await apiClient.delete(`/chatbot/tags/${tagId}`);
    return response;
  } catch (error) {
    console.error("Delete Tag API Error:", error);
    throw error;
  }
};
