import axios from "axios";

import * as tf from "@tensorflow/tfjs";

let modelSoekarno = null;
let maxLenSoekarno;
let wordIndexSoekarno = {};
let responsesSoekarno = {};
let classLabelsSoekarno = [];

let modelHatta = null;
let maxLenHatta;
let wordIndexHatta = {};
let responsesHatta = {};
let classLabelsHatta = [];

let possibleResponses = [];
let predictionValue;
let predictedTag;

const API_BASE_URL = "https://capstone-five-dusky.vercel.app";
const API_MODEL_TFJS_URL = "https://dbs-coding.github.io/histotalk-model1-tfjs";
const API_MODEL_RAG_URL = "https://chatbot-character-1091601261833.us-central1.run.app/chat";
const API_TRIGGER_MODEL_TFJS = "https://model1-etl-repo-1091601261833.asia-southeast1.run.app";
const etlKey = import.meta.env.VITE_ETL_KEY;

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
  maxLenSoekarno = model.inputs[0].shape[1];

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
  // console.log(API_MODEL_TFJS_URL);

  modelHatta = await tf.loadGraphModel(
    `${API_MODEL_TFJS_URL}/hatta/model.json`
  );
  maxLenHatta = modelHatta.inputs[0].shape[1];
  // console.log("Inputs:", modelHatta.inputs);
  // console.log("Outputs:", modelHatta.outputs);
  // console.log("maxLen: ", maxLenHatta);

  const wordIndexResponse = await fetch(
    `${API_MODEL_TFJS_URL}/hatta/word_index.json`
  );
  wordIndexHatta = await wordIndexResponse.json();

  const contentHattaResponse = await fetch(
    `${API_MODEL_TFJS_URL}/hatta/content.json`
  );
  responsesHatta = await contentHattaResponse.json();
  
  classLabelsHatta = Object.keys(responsesHatta);
  // console.log("classLabelsHatta: ", classLabelsHatta);
  // console.log("responsesHatta: ", responsesHatta);
};

// Padding helper
const padSequences = (sequences, maxlen,
  padding = "post",
  truncating = "post") => {
  return sequences.map((seq) => {
    if (seq.length > maxlen) {
      // Truncate
      return truncating === "pre"
        ? seq.slice(seq.length - maxlen)
        : seq.slice(0, maxlen);
    }

    // Pad with zeros
    const padded = new Array(maxlen).fill(0);
    const offset = padding === "pre" ? maxlen - seq.length : 0;

    for (let i = 0; i < seq.length; i++) {
      padded[offset + i] = seq[i];
    }

    return padded;
  });
};

const predict = async (model, maxLen, word_index, inputText) => {
  const cleanedText = inputText.toLowerCase().replace(/[^\w\s]/gi, "");
  const tokens = [cleanedText.split(" ").map((word) => word_index[word] || 0)];
  // console.log("Tokens: ", tokens);

  const paddedSequences = padSequences(tokens, maxLen);
  // console.log("paddedSequences :", paddedSequences);

  const inputTensor = tf.tensor2d(paddedSequences, [1, maxLen]);
  inputTensor.print();

  const result = model.predict(inputTensor);

  // Dapatkan nilai prediksi sebagai array
  const arrayResult = await result.array();
  return arrayResult[0];
};

export const sendChatTfjs = async (inputText, npc) => {
  try {
    if (npc === 'soekarno') {
      await initModelSoekarno();

      const outputArray = await predict(
        modelSoekarno,
        maxLenSoekarno,
        wordIndexSoekarno,
        inputText
      );

      const predictionIndex = outputArray.indexOf(Math.max(...outputArray));
      predictionValue = outputArray[predictionIndex];
      predictedTag = classLabelsSoekarno[predictionIndex]; // Gunakan classLabelsSoekarno

      possibleResponses = responsesSoekarno[predictedTag] || [];

    } else {
      await initModelHatta();

      // [0.1, 0.2, 0.3, 0.4, 0.5]
      const outputArray = await predict(
        modelHatta,
        maxLenHatta,
        wordIndexHatta,
        inputText
      );
      // console.log("outputArray: ", outputArray);

      const predictionIndex = outputArray.indexOf(Math.max(...outputArray));
      predictionValue = outputArray[predictionIndex];
      predictedTag = classLabelsHatta[predictionIndex]; // Gunakan classLabelsHatta

      possibleResponses = responsesHatta[predictedTag] || [];

    }
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

export const sendChatMessageRag = async (inputText, npc) => {
  try {
    // console.log({ inputText, npc });
    const payload = {
      karakter: npc,
      prompt: inputText,
    };

    const response = await fetch(API_MODEL_RAG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // contoh hasil: { karakter: "soekarno", response: "SAUDARA-SAUDARA! ..." }
    const data = await response.json();
    // console.log(data);
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
    return response.data;
  } catch (error) {
    console.error("Create/Update Tag NPC API Error:", error);
    throw error;
  }
};

export const updateTag = async (tagId, tagData) => {
  try {
    const response = await apiClient.put(`/chatbot/update/${tagId}`, tagData);
    return response;
  } catch (error) {
    console.error("Update Tag NPC API Error:", error);
    throw error;
  }
}

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

export const etlSoekarno = async () => {
  try {
    await axios.post(`${API_TRIGGER_MODEL_TFJS}/etl-run-model1-soekarno`, {
      etl_key: etlKey,
    });
  } catch (error) {
    console.error("Proses ETL NPC Soekarno terdapat kendala: ", error);
    throw error;
  }
};

export const etlHatta = async () => {
  try {
    await axios.post(`${API_TRIGGER_MODEL_TFJS}/etl-run-model1-hatta`, {
      etl_key: etlKey,
    });
  } catch (error) {
    console.error("Proses ETL NPC Hatta terdapat kendala: ", error);
    throw error;
  }
};
