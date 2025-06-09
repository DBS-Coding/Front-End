import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["histotalkicon.jpg"],
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Naikkan limit jadi 5MB
      },
      manifest: {
        name: "Histotalk",
        short_name: "Histotalk",
        start_url: "/",
        display: "standalone",
        background_color: "#212529",
        theme_color: "#BF642A",
        icons: [
          {
            src: "/histotalkicon.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/histotalkicon.jpg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    // for bypassing CORS issues during development by proxying API requests
    proxy: {
      "/api/etl": {
        target: "https://model1-etl-repo-1091601261833.asia-southeast1.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/etl/, ""),
      },
      "/model/rag": {
        target:
          "https://chatbot-character-1091601261833.us-central1.run.app/chat",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/model\/rag/, ""),
      },
    },
    port: 3001,
  },
  optimizeDeps: {
    include: ["@tensorflow/tfjs"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          tensorflow: ["@tensorflow/tfjs"],
        },
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
