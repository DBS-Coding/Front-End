import { useState } from "react";
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
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    try {
      registerSchema.parse(formState);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.errors.forEach((err) => {
        const path = err.path[0];
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsLoading(true);
    try {
      const response = await registerUser(formState);
      if (response && response.data) {
        setRegisterSuccess(true);

        setFormState({
          name: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || 
        "Registration failed. Please try again.";
      setApiError(errorMessage);
      
      if (error.response?.status === 409) {
        if (error.response.data.message.includes("email")) {
          setErrors(prev => ({ ...prev, email: "Email already registered" }));
        } else if (error.response.data.message.includes("name")) {
          setErrors(prev => ({ ...prev, name: "Name already taken" }));
        }
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
    registerSuccess,
    apiError
  };
};