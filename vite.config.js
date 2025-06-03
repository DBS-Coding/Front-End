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
    port: 3001,
  },
});
