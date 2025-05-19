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
    <div className="flex h-screen bg-[#212529] text-white">
      <div className="hidden md:flex md:w-1/3 lg:w-5/10 flex-col justify-center items-center border-r border-[#ffffff34]">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold tracking-wider text-white"
        >
          HISTO<span className="text-[#9495a5]">TALK</span>
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

      <div className="w-full flex items-center justify-center p-8">
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
                className={`w-full px-4 py-3 rounded-md border border-neutral-700 ${
                  errors.name ? "border-red-500" : "border-neutral-500"
                } focus:outline-none focus:ring-2 focus:ring-neutral-600`}
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
                className={`w-full px-4 py-3 rounded-md border border-neutral-700 ${
                  errors.email ? "border-red-500" : "border-neutral-500"
                } focus:outline-none focus:ring-2 focus:ring-neutral-600`}
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
                  className={`w-full px-4 py-3 rounded-md border border-neutral-700 ${
                    errors.password ? "border-red-500" : "border-neutral-500"
                  } focus:outline-none focus:ring-2 focus:ring-neutral-600`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-400 hover:cursor-pointer"
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
              className="w-full py-3 bg-[#5e5e5e1c] hover:bg-[#5e5e5e3d] hover:cursor-pointer rounded-lg font-medium transition-colors duration-200 disabled:bg-neutral-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:underline hover:cursor-pointer focus:outline-none"
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