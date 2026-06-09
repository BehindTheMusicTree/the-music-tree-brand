import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    // `file:..` links `@themusictree/brand`; default watcher ignores node_modules,
    // so changes under dist/ would not refresh until restart without this.
    watch: {
      ignored: [
        "**/node_modules/**",
        "!**/node_modules/@themusictree/brand/**",
      ],
    },
  },
});
