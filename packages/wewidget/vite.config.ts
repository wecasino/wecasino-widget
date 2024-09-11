import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    target: ["es2020", "edge79", "firefox67", "chrome64", "safari12"],
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "gdsapi-ts-lib",
      fileName: `wecasino-widget-${pkg.version}`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          WeClient: "WeClient",
          WeCompoent: "WeCompoent",
        },
      },
    },
  },
});
