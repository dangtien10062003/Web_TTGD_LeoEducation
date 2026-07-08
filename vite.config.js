import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const requiredEnv = (env, key) => {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = mode === 'development';

  return {
    base: env.VITE_APP_BASE_PATH || '/',
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
    ...(isDevelopment && {
      server: {
        base: "/",
        port: Number(requiredEnv(env, 'VITE_DEV_SERVER_PORT')),
        proxy: {
          "/api": {
            target: requiredEnv(env, 'VITE_API_PROXY_TARGET'),
            changeOrigin: true,
          },
        },
      },
    }),
  };
});
