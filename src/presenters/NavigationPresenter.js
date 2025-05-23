import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const useNavigationPresenter = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleChatNavigation = (character) => {
    const path = character === "soekarno" ? "/chatsoekarno" : "/chathatta";
    navigate(path);
  };

  const handleCrudNavigation = (character) => {
    const path = character === "soekarno" ? "/crudsoekarno" : "/crudhatta";
    navigate(path);
  };

  return {
    handleNavigation,
    handleLogout,
    handleChatNavigation,
    handleCrudNavigation,
  };
};
