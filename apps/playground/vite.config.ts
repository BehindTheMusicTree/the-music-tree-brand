import path from "node:path";
import brandPackage from "../../packages/brand/package.json";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(brandPackage.version) },
  publicDir: path.resolve(import.meta.dirname, "../../docs"),
  resolve: {
    alias: {
      "@brand-dist": path.resolve(
        import.meta.dirname,
        "node_modules/@behindthemusictree/brand/src",
      ),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    // `file:..` links `@behindthemusictree/brand`; default watcher ignores node_modules,
    // so changes under dist/ would not refresh until restart without this.
    watch: {
      ignored: [
        "**/node_modules/**",
        "!**/node_modules/@behindthemusictree/brand/**",
      ],
    },
  },
});
