import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useLoginPresenter } from "../../presenters/LoginPresenter";

const LoginView = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    loginSuccess,
    loginError
  } = useLoginPresenter();

  useEffect(() => {
    if (loginSuccess) {
      navigate("/dashboard");
    }
  }, [loginSuccess, navigate]);

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
          Connect with history enthusiasts and explore the past through meaningful conversations.
        </motion.p>
      </div>

      <div className="w-full flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">LOGIN</h2>
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-md text-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-md border border-neutral-700 ${
                  errors.email ? "border-red-500" : "border-neutral-500"
                } focus:outline-none focus:ring-2 focus:ring-neutral-600`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-md border border-neutral-700 ${
                    errors.password ? "border-red-500" : "border-neutral-500"
                  } focus:outline-none focus:ring-2 focus:ring-neutral-600`}
                  placeholder="Enter your password"
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
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#5e5e5e1c] hover:bg-[#5e5e5e3d] hover:cursor-pointer rounded-lg font-medium transition-colors duration-200 disabled:bg-neutral-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-white hover:underline hover:cursor-pointer focus:outline-none"
            >
              Register
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;