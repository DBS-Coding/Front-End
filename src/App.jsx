import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import useOnlineStatus from "./hooks/statusInternetUtils";
import OfflineFeedbackCard from "./components/fallback/OfflineFeedbackCard";
import ForbiddenPage from "./views/ForbiddenPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuthStore();
  
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, token, user } = useAuthStore();
  
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.data?.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const isOnline = useOnlineStatus();

  return (
    <Router>
      <AnimatePresence>
        {!isOnline && <OfflineFeedbackCard key="global-offline-card" />}
      </AnimatePresence>

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
            <AdminRoute>
              <ChatSoekarnoView/>
            </AdminRoute>
          } 
        />
        
        <Route 
          path="/crudsoekarno" 
          element={
            <AdminRoute>
              <CrudSoekarnoView/>
            </AdminRoute>
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
        <Route path="/403" element={<ForbiddenPage/>} />
      </Routes>
    </Router>
  );
}

export default App;