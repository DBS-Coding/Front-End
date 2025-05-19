import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import useAuthStore from "./store/authStore";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isTokenValid } = useAuthStore();
  
  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<div>Login Page (Not Implemented)</div>} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div>Dashboard (Not Implemented)</div>
            </ProtectedRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;