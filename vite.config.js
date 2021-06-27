import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  if (command === "dev" || command === "serve") {
    return {
      // serve specific config
      server: {
        port: 3001,
      },
      plugins: [reactRefresh()],
    };
  } else if (command === "local") {
    return {
      // serve specific config
      server: {
        port: 3001,
      },
      plugins: [reactRefresh()],
    };
  } else {
    return {
      // build specific config
      build: {
        assetsDir: "./",
        rollupOptions: {
          input: {
            panel: resolve(__dirname, "panel.html"),
            broadcaster: resolve(__dirname, "broadcaster.html"),
            mobile: resolve(__dirname, "mobile.html"),
            video_component: resolve(__dirname, "video_component.html"),
            video_overlay: resolve(__dirname, "video_overlay.html"),
            config: resolve(__dirname, "config.html"),
          },
        },
      },
    };
  }
};
