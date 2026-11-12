import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sarperstudios.com",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  // Cloudflare serves real HTTP 301s from public/_redirects. No HTML redirects.
});
