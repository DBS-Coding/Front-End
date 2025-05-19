import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import useAuthStore from "./store/authStore";
import LoginView from "./views/auth/LoginView";
import LandingPage from "./views/LandingPage";
import NotFoundPage from "./views/NotFoundPage";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isTokenValid } = useAuthStore();
  
  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" replace/>;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginView/>} />
        <Route path="/" element={<LandingPage/>}/>

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div>Dashboard (Not Implemented)</div>
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;