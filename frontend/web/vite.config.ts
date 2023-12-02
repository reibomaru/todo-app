import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: [{ find: "~/", replacement: `${__dirname}/src/` }],
  },
  plugins: [react()],
});
