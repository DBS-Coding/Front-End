import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserProfile } from "../api/authApi";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      initialize: () => {
        const { token } = get();
        if (token) {
          set({ isAuthenticated: true });
          get().validateToken();
        }
      },

      setAuth: async (token) => {
        if (!token) return null;

        try {
          set({ isLoading: true });

          const response = await getUserProfile(token);
          const user = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return user;
        } catch (error) {
          console.error("Failed to get user profile:", error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return null;
        }
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      validateToken: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return false;
        }

        try {
          set({ isLoading: true });

          const response = await getUserProfile(token);
          const user = response.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          console.error("Token validation failed:", error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },

      refreshUser: async () => {
        const { token } = get();
        if (!token) return null;

        try {
          const response = await getUserProfile(token);
          const user = response.data;

          set({ user });
          return user;
        } catch (error) {
          console.error("Failed to refresh user data:", error);
          return null;
        }
      },

      isTokenValid: async () => {
        return await get().validateToken();
      },
    }),
    {
      name: "histotalk-auth",
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);

export default useAuthStore;
