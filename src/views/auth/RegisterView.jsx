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
    register,
    handleSubmit,
    errors,
    isLoading,
    registerSuccess,
    apiError
  } = useRegisterPresenter();

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [registerSuccess, navigate]);

return (
  <div className="flex flex-col md:flex-row h-screen bg-[#212529] text-white">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-[40%] flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#ffffff34] px-8 py-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl lg:text-6xl font-bold tracking-wider text-white text-center"
      >
        HISTO<span className="text-[#9495a5]">TALK</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-gray-400 text-center max-w-sm md:max-w-md lg:max-w-lg px-2"
      >
        Join our community of history enthusiasts and discover the past through engaging conversations.
      </motion.p>
    </motion.div>

    <div className="w-full lg:w-[60%] flex items-center h-screen justify-center px-6 sm:px-12 md:px-16 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">REGISTER</h2>

        {registerSuccess && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-md text-green-200">
            Registration successful! Redirecting to login...
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-md text-red-200">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.name ? "border-red-500" : "border-neutral-500"
              } focus:outline-none focus:ring-2 focus:ring-neutral-600 bg-transparent`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.email ? "border-red-500" : "border-neutral-500"
              } focus:outline-none focus:ring-2 focus:ring-neutral-600 bg-transparent`}
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
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.password ? "border-red-500" : "border-neutral-500"
                } focus:outline-none focus:ring-2 focus:ring-neutral-600 bg-transparent`}
                placeholder="Create a password"
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
            className="w-full py-3 bg-[#5e5e5e1c] hover:bg-[#5e5e5e3d] rounded-lg font-medium transition-colors duration-200 disabled:bg-neutral-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white hover:underline"
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