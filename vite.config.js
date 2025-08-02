import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nexus-react-app/",  // <-- add leading and trailing slash
  plugins: [react()],
});
