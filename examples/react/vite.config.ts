import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = process.env.NODE_ENV === "development";
  return {
    //for serving subpath
    base: isDev ? "" : "/public/widget/",
    plugins: [react()],
  };
});
