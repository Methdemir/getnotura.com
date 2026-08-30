import type { APIRoute } from "astro";
import { publishedLocales } from "../i18n/locales";
import {
  alternateLinks,
  localizedPath,
  publishedDestinations,
  type Destination,
} from "../i18n/routes";

/**
 * The sitemap, generated from the same route config the pages and the build
 * validator read. Adding a locale or a destination adds it here with no second
 * edit, which is the only way a seven-language sitemap stays true.
 *
 * Each URL carries its full `xhtml:link` alternate set, so the language
 * relationships a crawler sees here match the `hreflang` tags on the pages.
 *
 * Scope note: this covers Notura. `/momentback/` is a separate product surface
 * published on its own schedule and is deliberately not enumerated here.
 */
const ORIGIN = "https://getnotura.com";

interface Entry {
  path: string;
  destination: Destination;
}

const entries: Entry[] = [
  { path: "/", destination: "home" },
  ...publishedLocales.flatMap((locale) =>
    publishedDestinations.map((destination) => ({
      path: localizedPath(locale.id, destination),
      destination: destination as Destination,
    })),
  ),
];

const absolute = (path: string) => new URL(path, ORIGIN).href;

const urlEntry = ({ path, destination }: Entry) => {
  const alternates = alternateLinks(destination)
    .map(
      (alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${absolute(alternate.href)}" />`,
    )
    .join("\n");

  return `  <url>\n    <loc>${absolute(path)}</loc>\n${alternates}\n  </url>`;
};

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlEntry).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
