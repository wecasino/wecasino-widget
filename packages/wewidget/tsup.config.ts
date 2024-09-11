import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "tsup";
import pkg from "./package.json";

export default defineConfig([
  {
    dts: true,
    minify: true,
    sourcemap: true,
    target: "es2020",
    format: "esm",
    entry: ["src/index.ts"],
    clean: true,
    shims: true,
  },
  {
    dts: true,
    minify: true,
    sourcemap: true,
    target: "es2020",
    format: "cjs",
    entry: ["src/index.ts"],
    shims: true,
  },
  {
    platform: "browser",
    minify: true,
    target: "es2020",
    format: "iife",
    entry: ["src/index.ts"],
    replaceNodeEnv: true,
    shims: true,
    noExternal: [/(.*)/],
    splitting: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    globalName: "wewidget",
    onSuccess: async () => {
      await fs.copyFile(
        `dist/index.global.js`,
        `dist/wewidget-v${pkg.version}.js`
      );
      await fs.copyFile(
        `dist/wewidget-v${pkg.version}.js`,
        `../../examples/demo/wewidget-v${pkg.version}.js`
      );
    },
  },
]);
