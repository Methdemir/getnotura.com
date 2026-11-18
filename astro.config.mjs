import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sarperstudios.com",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  // No redirects: every former Notura address simply answers 404.
});
