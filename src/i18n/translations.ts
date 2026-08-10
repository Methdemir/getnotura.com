import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import it from "./translations/it.json";
import ptBr from "./translations/pt-br.json";
import tr from "./translations/tr.json";

const dictionaries = {
  de,
  en,
  es,
  fr,
  it,
  "pt-br": ptBr,
  tr,
} as const;

export type TranslationKey = keyof typeof en;
export type PublishedTranslationLocale = keyof typeof dictionaries;

export function translate(localeId: string, key: TranslationKey): string {
  if (!(localeId in dictionaries)) {
    throw new Error(`No published UI dictionary for locale: ${localeId}`);
  }

  const dictionary = dictionaries[localeId as PublishedTranslationLocale];
  const value = dictionary[key];

  if (!value) {
    throw new Error(`Missing required UI translation: ${localeId}.${key}`);
  }

  return value;
}
