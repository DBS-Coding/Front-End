import axios from "axios";

import * as tf from "@tensorflow/tfjs";

let model = null;
let word_index = {};
let responsesSoekarno = {};
let responsesHatta = {};
let classLabels = [];
let maxLen = 10; // sesuai model kamu
let possibleResponses = [];

const API_BASE_URL = "https://capstone-five-dusky.vercel.app";
const API_MODEL_URL = "https://chatbot-character-1091601261833.asia-southeast2.run.app/chat";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Load & inisialisasi hanya sekali
const initModel = async () => {
  if (model) return; // Sudah dimuat

  model = await tf.loadGraphModel("/tfjs_saved_model/model.json");

  const wordIndexResponse = await fetch("/tfjs_saved_model/word_index.json");
  word_index = await wordIndexResponse.json();

  const contentSoekarnoResponse = await fetch("/tfjs_saved_model/content_soekarno.json");
  const dataSoekarno = await contentSoekarnoResponse.json();

  const labelSetSoekarno = new Set();
  dataSoekarno.intents.forEach((intent) => {
    responsesSoekarno[intent.tag] = intent.responses;
    labelSetSoekarno.add(intent.tag);
  });
  classLabels = Array.from(labelSetSoekarno); // pakai punya soekarno

  const contentHattaResponse = await fetch("/tfjs_saved_model/content_hatta.json");
  const dataHatta = await contentHattaResponse.json();

  dataHatta.intents.forEach((intent) => {
    responsesHatta[intent.tag] = intent.responses;
  });
};

// const preprocessing = (text) => {
//   const cleanedText = text.toLowerCase().replace(/[^\w\s]/gi, "");
//   const tokens = cleanedText.split(" ").map((word) => word_index[word] || 0);
//   return tokens;
// };

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

// Prediksi jawaban berdasarkan input
export const sendChatMessageTfjs = async (inputText, npc = "") => {
  try {
    await initModel();

    // Preprocessing
    const cleanedText = inputText.toLowerCase().replace(/[^\w\s]/gi, "");
    const tokens = cleanedText.split(" ").map((word) => word_index[word] || 0);
    const padded = padSequences([tokens], maxLen);
    const inputTensor = tf.tensor2d(padded, [1, maxLen]);

    // Predict
    const result = model.predict({ Identity: inputTensor });
    const probabilities = result.softmax();
    const outputData = await probabilities.data();
    const outputArray = Array.from(outputData);

    const predictionIndex = outputArray.indexOf(Math.max(...outputArray));
    const predictionValue = outputArray[predictionIndex];
    const predictedTag = classLabels[predictionIndex];

    if (npc  === "soekarno") {
      possibleResponses = responsesSoekarno[predictedTag] || [];
    } else {
      possibleResponses = responsesHatta[predictedTag] || [];
    }
    
    const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

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

function truncate(input, limit) {
  const firstPart = input.slice(0, limit);
  const remaining = input.slice(limit);

  const newlineIndex = remaining.indexOf("\n");
  const secondPart =
    newlineIndex !== -1 ? remaining.slice(0, newlineIndex) : remaining;

  return (firstPart + secondPart).trim();
}

export const sendChatMessageRag = async (inputText, npc = "") => {
  try {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      karakter: npc || "soekarno", // default ke soekarno jika npc kosong
      prompt: inputText
    };
    let responseDummy = "SAUDARA-SAUDARA! DENGARKANLAH GEMURUH SUARA BUNG KARNO!\n\nKemerdekaan yang kita raih bukanlah hadiah dari Tenno Heika!\n Bukan belas kasihan dari penjajah! Kemerdekaan ini adalah tetesan darah, cucuran keringat, dan kobaran semangat juang seluruh rakyat Indonesia dari Sabang \nsampai Merauke!";
    responseDummy = truncate(responseDummy, 100);
    return {response: responseDummy};
    // const response = await fetch(API_MODEL_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(payload)
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error ${response.status}`);
    // }

    // const data = await response.json();

    // // contoh hasil: { karakter: "soekarno", response: "SAUDARA-SAUDARA! ..." }
    // return data.response;
  } catch (error) {
    console.error("sendChatMessageRagModel Error:", error);
    return "Maaf, terjadi kesalahan dalam memproses pesan.";
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

export default apiClient;
