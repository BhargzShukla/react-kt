import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

let path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  }
});
