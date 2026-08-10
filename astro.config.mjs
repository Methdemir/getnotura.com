import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://getnotura.com",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
});
