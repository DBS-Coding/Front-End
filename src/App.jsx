import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          path="/home" 
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          } 
        />

        <Route path="/chatsoekarno" element={<ChatSoekarnoView/>} />
        <Route path="/crudsoekarno" element={<CrudSoekarnoView/>} />
        <Route path="/chathatta" element={<ChatHattaView/>} />
        <Route path="/crudhatta" element={<CrudHattaView/>} />

        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </Router>
  );
}

export default App;