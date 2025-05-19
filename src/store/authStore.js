import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (token) => {
        if (!token) return;

        try {
          const decodedToken = jwtDecode(token);
          const user = {
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
          };

          set({
            user,
            token,
            isAuthenticated: true,
          });

          return user;
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      isTokenValid: () => {
        const { token } = get();
        if (!token) return false;

        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          return decoded.exp > currentTime;
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          return false;
        }
      },
    }),
    {
      name: "histotalk-auth",
      version: 1,
    }
  )
);

export default useAuthStore;
