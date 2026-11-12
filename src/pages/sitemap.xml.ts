import type { APIRoute } from "astro";
import { appPages, appPath, type AppLocale } from "../content/studio";
import { mergekin } from "../content/mergekin";
import { vergiHesabim } from "../content/vergi-hesabim";
import { momentBackLocales, momentBackPath, momentBackAlternates, type MomentBackPage } from "../content/momentback";

/** Only Sarper Studios pages belong here; Notura is hosted independently. */
const ORIGIN = "https://sarperstudios.com";

const absolute = (path: string) => new URL(path, ORIGIN).href;

const plainEntry = (path: string) => `  <url>\n    <loc>${absolute(path)}</loc>\n  </url>`;

const appLocales: AppLocale[] = ["en", "tr"];
const appEntries = Object.values(appPages).flatMap((app) =>
  (["home", "privacy"] as const).flatMap((page) => {
    const alternates = [
      ...appLocales.map((locale) => ({ hreflang: locale, href: appPath(app, locale, page) })),
      { hreflang: "x-default", href: appPath(app, "en", page) },
    ]
      .map(
        (alternate) =>
          `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${absolute(alternate.href)}" />`,
      )
      .join("\n");
    return appLocales.map(
      (locale) =>
        `  <url>\n    <loc>${absolute(appPath(app, locale, page))}</loc>\n${alternates}\n  </url>`,
    );
  }),
);

/** MERGEKIN: an English product page and its policy in English and Turkish. */
const mergekinPolicyAlternates = [
  { hreflang: "en", href: mergekin.paths.privacy },
  { hreflang: "tr", href: mergekin.paths.gizlilik },
  { hreflang: "x-default", href: mergekin.paths.privacy },
]
  .map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${absolute(alternate.href)}" />`,
  )
  .join("\n");
const mergekinEntries = [
  plainEntry(mergekin.paths.home),
  ...[mergekin.paths.privacy, mergekin.paths.gizlilik].map(
    (path) => `  <url>\n    <loc>${absolute(path)}</loc>\n${mergekinPolicyAlternates}\n  </url>`,
  ),
];

const momentBackEntries = (["home", "privacy", "terms"] as const).flatMap((page: MomentBackPage) => {
  const alternates = momentBackAlternates(page).map((alternate) =>
    `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${absolute(alternate.href)}" />`,
  ).join("\n");
  return momentBackLocales.map((locale) =>
    `  <url>\n    <loc>${absolute(momentBackPath(locale, page))}</loc>\n${alternates}\n  </url>`,
  );
});

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[
  plainEntry("/"),
  ...mergekinEntries,
  plainEntry("/kimo/"),
  ...momentBackEntries,
  ...Object.values(vergiHesabim.paths).map(plainEntry),
  ...appEntries,
].join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
