import type { APIRoute } from "astro";

/**
 * Crawling is allowed; indexing is decided per page by the `robots` meta tag,
 * which `site-release.ts` drives. Blocking crawlers here as well would stop
 * them ever reading that meta tag, and would keep the site out of search even
 * after the W8 flip to "public" — so this file stays permissive on purpose.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: https://getnotura.com/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
