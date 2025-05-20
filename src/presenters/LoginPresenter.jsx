import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      console.log("Attempting login with:", { email: data.email, password: "****" });
      
      const response = await loginUser({
        email: data.email,
        password: data.password,
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
      console.error("Email & Password tidak ditemukan:", error);
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
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    loginSuccess,
    loginError,
    reset
  };
};