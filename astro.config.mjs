import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";

/**
 * Notura used to own the domain root (`/en/`, `/tr/privacy/`, ...). It now
 * lives under `/notura/` and the root belongs to Sarper Studios. The Notura
 * app and anyone holding an old link still point at the old URLs, so every
 * published old URL is kept as a static redirect page to its new home. The
 * list is generated from the same locale and route config the pages use, so it
 * cannot drift from what is actually published.
 */
const readJson = (relativePath) =>
  JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const locales = readJson("./src/i18n/locales.json").filter(
  (locale) => locale.publicationStatus === "published",
);
const routes = readJson("./src/i18n/routes.json");
const legacyNoturaDestinations = ["home", "product", "howItWorks", "features", "privacy", "terms"];

const legacyNoturaRedirects = Object.fromEntries(
  locales.flatMap((locale) =>
    legacyNoturaDestinations.map((destination) => {
      const suffix = routes[destination].path;
      const oldPath = suffix ? `/${locale.urlPrefix}/${suffix}/` : `/${locale.urlPrefix}/`;
      return [oldPath, `/notura${oldPath}`];
    }),
  ),
);

export default defineConfig({
  site: "https://getnotura.com",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  redirects: legacyNoturaRedirects,
});
