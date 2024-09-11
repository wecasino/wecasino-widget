import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "wecasino widget",
  description: "wecasino widget",
  icon: "/we-logo.png",
  logo: {
    light: "/we-logo.png",
    dark: "/we-logo.png",
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/wecasino/wecasino-widget",
      },
    ],
  },
});
