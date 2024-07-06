import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
const x = 23;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://knowledge-sharing-1.onrender.com",
});
