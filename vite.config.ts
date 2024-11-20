import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import qiankun from 'vite-plugin-qiankun';
const port = 8991;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    qiankun('main-app', {
    useDevMode: true
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    origin: `http://localhost:${ port }`,
    cors: true,
    port,
    headers: {

    },
    proxy: {
      "/api": {
        target: 'http://127.0.0.1',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/")
      },
    },
  },
});
