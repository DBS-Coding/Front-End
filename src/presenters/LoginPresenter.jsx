import { useState } from "react";
import { z } from "zod";
import { loginUser } from "../api/authApi";
import useAuthStore from "../store/authStore";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const useLoginPresenter = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    try {
      loginSchema.parse(formState);
      setErrors({});
      return true;
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setLoginError("");
    
    try {
      console.log("Attempting login with:", { email: formState.email, password: "****" });
      
      const response = await loginUser({
        email: formState.email,
        password: formState.password,
      });
      
      console.log("Login API response:", response);
      
      if (response.data && response.data.data && response.data.data.token) {
        console.log("Token found, setting auth");
        setAuth(response.data.data.token);
        setLoginSuccess(true);
      } else {
        console.log("No token found in response:", response.data);
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      console.log("Full error response:", error.response);
      
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password");
      } else if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    errors,
    isLoading,
    loginSuccess,
    loginError,
  };
};