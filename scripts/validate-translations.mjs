import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const locales = await readJson("src/i18n/locales.json");
const translationDirectory = path.join(root, "src/i18n/translations");
const published = locales.filter((locale) => locale.publicationStatus === "published");
const english = published.find((locale) => locale.id === "en");

if (!english?.translationFile) {
  throw new Error("Published English must define the reference UI dictionary.");
}

const englishDictionary = await readJson(`src/i18n/translations/${english.translationFile}`);
const requiredKeys = Object.keys(englishDictionary).sort();

if (requiredKeys.length === 0) {
  throw new Error("The English UI dictionary is empty.");
}

for (const locale of published) {
  if (!locale.translationFile) {
    throw new Error(`Published locale ${locale.id} has no UI dictionary.`);
  }

  const dictionary = await readJson(`src/i18n/translations/${locale.translationFile}`);
  const keys = Object.keys(dictionary).sort();
  const missing = requiredKeys.filter((key) => !keys.includes(key));
  const unexpected = keys.filter((key) => !requiredKeys.includes(key));
  const empty = requiredKeys.filter(
    (key) => typeof dictionary[key] !== "string" || dictionary[key].trim() === "",
  );

  if (missing.length || unexpected.length || empty.length) {
    throw new Error(
      [
        `Invalid UI dictionary for ${locale.id}.`,
        missing.length ? `Missing: ${missing.join(", ")}.` : "",
        unexpected.length ? `Unexpected: ${unexpected.join(", ")}.` : "",
        empty.length ? `Empty: ${empty.join(", ")}.` : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }
}

const configuredFiles = new Set(published.map((locale) => locale.translationFile));
const actualFiles = (await readdir(translationDirectory)).filter((file) => file.endsWith(".json"));
const unconfigured = actualFiles.filter((file) => !configuredFiles.has(file));

if (unconfigured.length) {
  throw new Error(`Unconfigured UI dictionaries: ${unconfigured.join(", ")}`);
}

console.log(`Translation validation passed for ${published.length} published locales and ${requiredKeys.length} keys.`);
