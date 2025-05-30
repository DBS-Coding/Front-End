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
      navigate("/home");
    }
  }, [loginSuccess, navigate]);

return (
  <div className="flex flex-col md:flex-row h-screen bg-[#212529] text-white">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-[40%] flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#ffffff34] px-6 md:px-8 lg:px-10 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl lg:text-6xl font-bold tracking-wide text-center"
      >
        HISTO<span className="text-[#9495a5]">TALK</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-gray-400 text-center text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        Connect with history enthusiasts and explore the past through meaningful conversations.
      </motion.p>
    </motion.div>

    <div className="w-full h-screen lg:w-[60%] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          LOGIN
        </h2>

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
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-md bg-transparent border focus:outline-none focus:ring-2 focus:ring-neutral-600 ${
                errors.email ? "border-red-500" : "border-neutral-500"
              }`}
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
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-md bg-transparent border focus:outline-none focus:ring-2 focus:ring-neutral-600 ${
                  errors.password ? "border-red-500" : "border-neutral-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-medium bg-[#5e5e5e1c] hover:bg-[#5e5e5e3d] transition-colors duration-200 disabled:bg-neutral-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-white hover:underline"
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