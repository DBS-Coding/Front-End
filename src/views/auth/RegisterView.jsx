import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterPresenter } from "../../presenters/RegisterPresenter";

const RegisterView = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState,
    handleChange,
    handleSubmit,
    errors,
    isLoading,
    registerSuccess
  } = useRegisterPresenter();

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [registerSuccess, navigate]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="hidden md:flex md:w-1/3 lg:w-1/2 flex-col justify-center items-center bg-gray-900 border-r border-gray-800">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold tracking-wider text-white"
        >
          HISTO<span className="text-blue-500">TALK</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-gray-400 text-center max-w-md px-8"
        >
          Join our community of history enthusiasts and discover the past through engaging conversations.
        </motion.p>
      </div>

      <div className="w-full md:w-2/3 lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">REGISTER</h2>
          
          {registerSuccess && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-md text-green-200">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 rounded-md border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Masuk"}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline hover:cursor-pointer focus:outline-none"
            >
              Login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterView;