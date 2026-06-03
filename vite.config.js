import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Web_TTGD_LeoEducation/",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    base: "/",
    port: 5173,
  },
});
