import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const locales = await readJson("src/i18n/locales.json");
const routes = await readJson("src/i18n/routes.json");
const unique = (values) => new Set(values).size === values.length;
const requiredLocaleFields = [
  "id",
  "urlPrefix",
  "nativeName",
  "htmlLang",
  "hreflang",
  "ogLocale",
  "publicationStatus",
  "mobileLocale",
  "mobileRuntimeStatus",
];

if (!unique(locales.map((locale) => locale.id))) {
  throw new Error("Locale IDs must be unique.");
}

if (!unique(locales.map((locale) => locale.urlPrefix))) {
  throw new Error("Locale URL prefixes must be unique.");
}

for (const locale of locales) {
  const missing = requiredLocaleFields.filter((field) => !locale[field]);
  if (missing.length) {
    throw new Error(`Locale ${locale.id ?? "<unknown>"} is missing: ${missing.join(", ")}`);
  }

  if (!/^[a-z]{2}(?:-[a-z]{2})?$/.test(locale.urlPrefix)) {
    throw new Error(`Invalid locale prefix: ${locale.urlPrefix}`);
  }

  if (!["published", "reserved"].includes(locale.publicationStatus)) {
    throw new Error(`Invalid publication status for ${locale.id}.`);
  }

  if (locale.publicationStatus === "published" && !locale.translationFile) {
    throw new Error(`Published locale ${locale.id} must have a translation file.`);
  }
}

const pt = locales.find((locale) => locale.id === "pt");
const ptBr = locales.find((locale) => locale.id === "pt-br");

if (!pt || pt.publicationStatus !== "reserved" || pt.mobileRuntimeStatus !== "reserved") {
  throw new Error("European Portuguese must remain reserved in W1.");
}

if (!ptBr || ptBr.publicationStatus !== "published" || ptBr.mobileLocale !== "pt-BR") {
  throw new Error("Brazilian Portuguese must publish at pt-br and map from pt-BR.");
}

const mobileMap = new Map(
  locales
    .filter((locale) => locale.mobileRuntimeStatus === "active")
    .map((locale) => [locale.mobileLocale.toLowerCase(), locale.id]),
);
const mapMobile = (input) => mobileMap.get(input.replace("_", "-").toLowerCase()) ?? "en";

if (mapMobile("pt-BR") !== "pt-br" || mapMobile("pt_BR") !== "pt-br") {
  throw new Error("pt-BR mobile mapping must resolve to /pt-br/.");
}

if (mapMobile("pt") !== "en" || mapMobile("invalid") !== "en") {
  throw new Error("Reserved or invalid mobile locales must resolve to English.");
}

const requiredDestinations = [
  "home",
  "product",
  "howItWorks",
  "learn",
  "professionals",
  "support",
  "privacy",
  "terms",
  "healthAiNotice",
  "accountDeletion",
  "dataRights",
];
const missingDestinations = requiredDestinations.filter((destination) => !routes[destination]);

if (missingDestinations.length) {
  throw new Error(`Missing semantic destinations: ${missingDestinations.join(", ")}`);
}

const routePaths = Object.values(routes).map((route) => route.path);
if (!unique(routePaths)) {
  throw new Error("Semantic destination paths must be unique.");
}

for (const [destination, route] of Object.entries(routes)) {
  if (route.path.startsWith("/") || route.path.endsWith("/")) {
    throw new Error(`Route ${destination} must store a normalized relative path.`);
  }

  if (!routes[route.sectionFallback]) {
    throw new Error(`Route ${destination} has an unknown section fallback.`);
  }
}

console.log(`Locale and semantic route validation passed for ${locales.length} locale definitions and ${Object.keys(routes).length} destinations.`);
