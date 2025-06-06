import axios from "axios";

const API_BASE_URL = "https://capstone-five-dusky.vercel.app";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response;
  } catch (error) {
    // Need handling error
    throw error;
  }
};

export const loginUser = async (credentials) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiClient.post("/auth/login", credentials);
    console.log("Data akun: ", response);
    return response;
  } catch (error) {
    // Need handling error
    throw error;
  }
};

export const getUserProfile = async (token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Get - authuser: ${response}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAccount = async (token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiClient.delete("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export default apiClient;
