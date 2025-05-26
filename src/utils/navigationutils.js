import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { deleteUserAccount } from "../api/authApi";

export const useNavigationPresenter = () => {
  const navigate = useNavigate();
  const { clearAuth, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      clearAuth();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      if (token) {
        await deleteUserAccount(token);
      }
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
      clearAuth();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
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
    handleDeleteAccount,
    handleChatNavigation,
    handleCrudNavigation,
    isLoading,
  };
};
