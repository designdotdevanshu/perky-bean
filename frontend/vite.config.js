import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://perky-bean-server.vercel.app",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
