import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { version } from "../package.json";

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {
    port: 5174,
    strictPort: true,
    // `file:..` links `@behindthemusictree/assets`; default watcher ignores node_modules,
    // so changes under dist/ would not refresh until restart without this.
    watch: {
      ignored: [
        "**/node_modules/**",
        "!**/node_modules/@behindthemusictree/assets/**",
      ],
    },
  },
});
