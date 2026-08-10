import localeData from "./locales.json";

export type PublicationStatus = "published" | "reserved";
export type MobileRuntimeStatus = "active" | "reserved";

export interface LocaleDefinition {
  id: string;
  urlPrefix: string;
  nativeName: string;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  publicationStatus: PublicationStatus;
  mobileLocale: string;
  mobileRuntimeStatus: MobileRuntimeStatus;
  translationFile: string | null;
}

export const locales = localeData as LocaleDefinition[];
export const publishedLocales = locales.filter(
  (locale) => locale.publicationStatus === "published",
);
export const reservedLocales = locales.filter(
  (locale) => locale.publicationStatus === "reserved",
);

export type LocaleId = (typeof locales)[number]["id"];

export function getLocale(id: string): LocaleDefinition {
  const locale = locales.find((candidate) => candidate.id === id);

  if (!locale) {
    throw new Error(`Unknown web locale: ${id}`);
  }

  return locale;
}

export function getPublishedLocale(id: string): LocaleDefinition {
  const locale = getLocale(id);

  if (locale.publicationStatus !== "published") {
    throw new Error(`Web locale is not published: ${id}`);
  }

  return locale;
}

export function mapMobileLocaleToWeb(input: string | null | undefined): LocaleDefinition {
  const normalized = input?.trim().replace("_", "-").toLowerCase();
  const match = locales.find(
    (locale) =>
      locale.mobileRuntimeStatus === "active" &&
      locale.mobileLocale.toLowerCase() === normalized,
  );

  return match ?? getPublishedLocale("en");
}
