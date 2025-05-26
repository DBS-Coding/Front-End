import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAuthToken } from "./api/authApi.js";
import useAuthStore from "./store/authStore.js";

const { token, initialize } = useAuthStore.getState();
if (token) {
  setAuthToken(token);
}
initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);