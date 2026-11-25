import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sarperstudios.com",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  // No redirects: an address the site does not publish answers 404.
});
