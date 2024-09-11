import { defineConfig } from "tsup";

export default defineConfig({
  platform: "browser",
  dts: true,
  minify: true,
  target: "es2020",
  format: ["esm", "cjs", "iife"],
  entry: ["src/index.ts"],
  replaceNodeEnv: true,
  clean: true,
  shims: true,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  // loader: {
  //   ".svg": "text",
  // },
  globalName: "wewidget",
});
