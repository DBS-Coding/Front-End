import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../api/authApi";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

export const useRegisterPresenter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);
    
    try {
      const response = await registerUser(data);
      if (response && response.data) {
        setRegisterSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || 
        "Registration failed. Please try again.";
      setApiError(errorMessage);
      
      if (error.response?.status === 409) {
        if (error.response.data.message.includes("email")) {
          setError("email", { 
            type: "manual", 
            message: "Email already registered" 
          });
        } else if (error.response.data.message.includes("name")) {
          setError("name", { 
            type: "manual", 
            message: "Name already taken" 
          });
        }
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
    registerSuccess,
    apiError
  };
};