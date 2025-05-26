import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import useAuthStore from "./store/authStore";
import LoginView from "./views/auth/LoginView";
import LandingPage from "./views/LandingPage";
import NotFoundPage from "./views/NotFoundPage";
import ChatHattaView from "./views/ChatHattaView";
import ChatSoekarnoView from "./views/ChatSoekarnoView";
import CrudHattaView from "./views/CrudHattaView";
import CrudSoekarnoView from "./views/CrudSoekarnoView";
import HomeView from "./views/HomeView";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuthStore();
  
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
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
          path="/home" 
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/chatsoekarno" 
          element={
            <ProtectedRoute>
              <ChatSoekarnoView/>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/crudsoekarno" 
          element={
            <ProtectedRoute>
              <CrudSoekarnoView/>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chathatta" 
          element={
            <ProtectedRoute>
              <ChatHattaView/>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/crudhatta" 
          element={
            <ProtectedRoute>
              <CrudHattaView/>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;