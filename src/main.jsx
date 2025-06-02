import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAuthToken } from "./api/authApi.js";
import useAuthStore from "./store/authStore.js";
import { registerSW } from 'virtual:pwa-register'

const { token, initialize } = useAuthStore.getState();
if (token) {
  setAuthToken(token);
}
initialize();

registerSW({
  onNeedRefresh() {
    console.log('[SW] Need refresh: New content is available.');
  },
  onOfflineReady() {
    console.log('[SW] App is ready to work offline.');
  },
  onRegistered(r) {
    console.log('[SW] Registered:', r);
  },
  onRegisterError(error) {
    console.error('[SW] Register error:', error);
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);