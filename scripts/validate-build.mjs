import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteOrigin = "https://getnotura.com";
const locales = JSON.parse(await readFile(path.join(root, "src/i18n/locales.json"), "utf8"));
const routes = JSON.parse(await readFile(path.join(root, "src/i18n/routes.json"), "utf8"));
const published = locales.filter((locale) => locale.publicationStatus === "published");
const reservedPrefixes = new Set(
  locales.filter((locale) => locale.publicationStatus === "reserved").map((locale) => locale.urlPrefix),
);

const exists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const pageFile = (urlPath) =>
  urlPath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, ...urlPath.split("/").filter(Boolean), "index.html");
const absolute = (urlPath) => new URL(urlPath, siteOrigin).href;
const getAttribute = (tag, name) => tag.match(new RegExp(`${name}="([^"]+)"`, "i"))?.[1];
const linkTags = (html, rel) =>
  [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => getAttribute(tag, "rel") === rel);

const publishedDestinations = ["home", "product", "howItWorks", "features", "privacy", "terms"];
const metaTitleKeys = {
  home: "metaHomeTitle",
  product: "metaProductTitle",
  howItWorks: "metaHowTitle",
  features: "metaFeaturesTitle",
  privacy: "metaPrivacyTitle",
  terms: "metaTermsTitle",
};
const noturaBase = "/notura";
const legacyPath = (locale, destination) => {
  const suffix = routes[destination].path;
  return suffix ? `/${locale.urlPrefix}/${suffix}/` : `/${locale.urlPrefix}/`;
};
const destinationPath = (locale, destination) => `${noturaBase}${legacyPath(locale, destination)}`;
const dictionaries = new Map(
  await Promise.all(
    published.map(async (locale) => [
      locale.id,
      JSON.parse(
        await readFile(path.join(root, "src/i18n/translations", locale.translationFile), "utf8"),
      ),
    ]),
  ),
);
const expectedPages = [
  // Notura's neutral root is the x-default entry and serves the English home,
  // so it carries the English home title rather than a title of its own.
  {
    path: `${noturaBase}/`,
    lang: "en",
    selfHreflang: "x-default",
    destination: "home",
    title: dictionaries.get("en").metaHomeTitle,
  },
  ...published.flatMap((locale) =>
    publishedDestinations.map((destination) => ({
      path: destinationPath(locale, destination),
      lang: locale.htmlLang,
      selfHreflang: locale.hreflang,
      destination,
      title: dictionaries.get(locale.id)[metaTitleKeys[destination]],
    })),
  ),
];
const pageRecords = [];

for (const expected of expectedPages) {
  const file = pageFile(expected.path);
  if (!(await exists(file))) {
    throw new Error(`Missing generated page: ${expected.path}`);
  }

  const html = await readFile(file, "utf8");
  const htmlLang = html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1];
  if (htmlLang !== expected.lang) {
    throw new Error(`Incorrect HTML lang for ${expected.path}: ${htmlLang ?? "missing"}`);
  }

  const title = html
    .match(/<title>([^<]+)<\/title>/i)?.[1]
    ?.replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");
  if (title !== expected.title) {
    throw new Error(`Incorrect localized title for ${expected.path}: ${title ?? "missing"}`);
  }

  const canonicals = linkTags(html, "canonical");
  if (canonicals.length !== 1) {
    throw new Error(`${expected.path} must contain exactly one canonical link.`);
  }

  const canonical = getAttribute(canonicals[0], "href");
  if (canonical !== absolute(expected.path)) {
    throw new Error(`Incorrect self-canonical for ${expected.path}: ${canonical}`);
  }

  const alternates = new Map(
    linkTags(html, "alternate").map((tag) => [
      getAttribute(tag, "hreflang"),
      getAttribute(tag, "href"),
    ]),
  );
  const expectedAlternates = new Map(
    published.map((locale) => [
      locale.hreflang,
      absolute(destinationPath(locale, expected.destination)),
    ]),
  );
  if (expected.destination === "home") {
    expectedAlternates.set("x-default", absolute(`${noturaBase}/`));
  }

  if (alternates.size !== expectedAlternates.size) {
    throw new Error(`Incomplete hreflang set for ${expected.path}.`);
  }

  for (const [hreflang, href] of expectedAlternates) {
    if (alternates.get(hreflang) !== href) {
      throw new Error(`Invalid ${hreflang} alternate on ${expected.path}.`);
    }
  }

  if (alternates.get(expected.selfHreflang) !== canonical) {
    throw new Error(`Missing self hreflang on ${expected.path}.`);
  }

  pageRecords.push({ ...expected, html, canonical, alternates });
}

const canonicalToPage = new Map();
for (const page of pageRecords) {
  if (canonicalToPage.has(page.canonical)) {
    throw new Error(`Duplicate canonical: ${page.canonical}`);
  }
  canonicalToPage.set(page.canonical, page);
}

for (const source of pageRecords) {
  for (const [targetHreflang, targetCanonical] of source.alternates) {
    const target = canonicalToPage.get(targetCanonical);
    if (!target) {
      throw new Error(`Unknown hreflang target ${targetCanonical} on ${source.path}.`);
    }

    if (target.alternates.get(source.selfHreflang) !== source.canonical) {
      throw new Error(
        `Non-reciprocal hreflang: ${source.path} -> ${targetHreflang} ${target.path}.`,
      );
    }
  }
}

for (const reservedPrefix of reservedPrefixes) {
  if (await exists(path.join(dist, reservedPrefix))) {
    throw new Error(`Reserved locale was accidentally published: /${reservedPrefix}/`);
  }
}

const cname = (await readFile(path.join(dist, "CNAME"), "utf8")).trim();
if (cname !== "getnotura.com") {
  throw new Error(`Invalid built CNAME: ${cname}`);
}

const notFoundPath = path.join(dist, "404.html");
if (!(await exists(notFoundPath))) {
  throw new Error("Missing generated 404.html.");
}
const notFoundHtml = await readFile(notFoundPath, "utf8");
if (!/<meta\b[^>]*name="robots"[^>]*content="noindex,follow"/i.test(notFoundHtml)) {
  throw new Error("404.html must be noindex,follow.");
}

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name),
    ),
  );
  return nested.flat();
};
const files = await walk(dist);
const scriptFiles = files.filter((file) => file.endsWith(".js"));
if (scriptFiles.length) {
  throw new Error(`W1 client JavaScript budget exceeded: ${scriptFiles.join(", ")}`);
}

const inspectableFiles = files.filter((file) => /\.(?:html|css)$/i.test(file));
const inspectableText = (
  await Promise.all(inspectableFiles.map((file) => readFile(file, "utf8")))
).join("\n");
const bannedOutput = [
  /<script\b/i,
  /google-analytics/i,
  /googletagmanager/i,
  /facebook\.com\/tr/i,
  /connect\.facebook\.net/i,
  /fonts\.googleapis\.com/i,
  /fonts\.gstatic\.com/i,
];
for (const pattern of bannedOutput) {
  if (pattern.test(inspectableText)) {
    throw new Error(`Forbidden client output matched ${pattern}.`);
  }
}

/**
 * Store URLs are banned for exactly as long as nothing is published.
 *
 * The rule used to be absolute, which meant release day would have required
 * editing this validator as well as the store config — two edits in two places,
 * one of them easy to forget. Now the single source of truth is
 * `src/config/store-availability.ts`: a store hostname may appear in the output
 * only once a channel there is genuinely marked available. A half-finished flip,
 * where a badge links out but the config still says nothing is published, still
 * fails the build.
 */
const storeConfig = await readFile(path.join(root, "src/config/store-availability.ts"), "utf8");
const declaresAvailableChannel = /state:\s*"available"/.test(storeConfig);
const storeHosts = [/play\.google\.com/i, /apps\.apple\.com/i];
for (const pattern of storeHosts) {
  if (pattern.test(inspectableText) && !declaresAvailableChannel) {
    throw new Error(
      `Output contains ${pattern} but no channel in store-availability.ts is marked available.`,
    );
  }
}

if (/href="(?:https:\/\/getnotura\.com)?\/pt\/"/i.test(inspectableText)) {
  throw new Error("European Portuguese was substituted for Brazilian Portuguese.");
}

for (const file of files.filter((candidate) => candidate.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = match[1];
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    const url = new URL(href, siteOrigin);
    if (url.origin !== siteOrigin) {
      continue;
    }

    const targetPath = decodeURIComponent(url.pathname);
    const targetFile = targetPath.endsWith("/")
      ? pageFile(targetPath)
      : path.join(dist, ...targetPath.split("/").filter(Boolean));
    if (!(await exists(targetFile))) {
      throw new Error(`Broken internal link ${href} in ${path.relative(dist, file)}.`);
    }
  }
}

/**
 * The sitemap must describe pages that exist, and must describe all of them.
 * A sitemap is the one artefact nobody looks at until a crawler does, so it is
 * checked here rather than trusted.
 */
const sitemapPath = path.join(dist, "sitemap.xml");
if (!(await exists(sitemapPath))) {
  throw new Error("Missing generated sitemap.xml.");
}
const sitemapXml = await readFile(sitemapPath, "utf8");
const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = new Set(sitemapLocs.map((loc) => new URL(loc).pathname));

for (const loc of sitemapLocs) {
  const url = new URL(loc);
  if (url.origin !== siteOrigin) {
    throw new Error(`Sitemap entry is off-origin: ${loc}`);
  }
  if (!(await exists(pageFile(url.pathname)))) {
    throw new Error(`Sitemap lists a page that was not built: ${loc}`);
  }
}
for (const page of pageRecords) {
  if (!sitemapPaths.has(page.path)) {
    throw new Error(`Canonical page missing from sitemap: ${page.path}`);
  }
}

const robotsPath = path.join(dist, "robots.txt");
if (!(await exists(robotsPath))) {
  throw new Error("Missing generated robots.txt.");
}
const robotsTxt = await readFile(robotsPath, "utf8");
if (!robotsTxt.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
  throw new Error("robots.txt does not point at the sitemap.");
}
if (/^\s*Disallow:\s*\/\s*$/m.test(robotsTxt)) {
  throw new Error("robots.txt blocks the whole site; indexing is decided by the robots meta tag.");
}

/**
 * Vergi Hesabım is a Turkish-only product surface outside the Notura locale
 * matrix, so it is checked on its own: each page exists, is Turkish, carries
 * exactly one self-canonical and no hreflang set, and is indexable so store and
 * ad-network reviewers can read the privacy policy.
 */
const vergiPages = ["/vergi-hesabim/", "/vergi-hesabim/privacy/"];
for (const vergiPath of vergiPages) {
  const file = pageFile(vergiPath);
  if (!(await exists(file))) {
    throw new Error(`Missing generated page: ${vergiPath}`);
  }
  const html = await readFile(file, "utf8");
  if (html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1] !== "tr") {
    throw new Error(`${vergiPath} must be lang="tr".`);
  }
  const canonicals = linkTags(html, "canonical");
  if (canonicals.length !== 1 || getAttribute(canonicals[0], "href") !== absolute(vergiPath)) {
    throw new Error(`${vergiPath} must carry exactly one self-canonical.`);
  }
  if (linkTags(html, "alternate").length) {
    throw new Error(`${vergiPath} is Turkish-only and must not declare hreflang alternates.`);
  }
  if (!/<meta\b[^>]*name="robots"[^>]*content="index,follow"/i.test(html)) {
    throw new Error(`${vergiPath} must be index,follow.`);
  }
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) {
    throw new Error(`${vergiPath} must contain exactly one h1.`);
  }
}

/**
 * Notura moved from the domain root to /notura/. Every old published URL must
 * still exist as a static redirect page pointing at its new home, so the
 * Notura app's links and anyone's bookmarks keep working.
 */
for (const locale of published) {
  for (const destination of publishedDestinations) {
    const oldPath = legacyPath(locale, destination);
    const newPath = destinationPath(locale, destination);
    const file = pageFile(oldPath);
    if (!(await exists(file))) {
      throw new Error(`Missing legacy redirect page: ${oldPath}`);
    }
    const html = await readFile(file, "utf8");
    if (!html.includes(`http-equiv="refresh" content="0;url=${newPath}"`)) {
      throw new Error(`Legacy page ${oldPath} does not redirect to ${newPath}.`);
    }
    if (!/<meta\b[^>]*name="robots"[^>]*content="noindex"/i.test(html)) {
      throw new Error(`Legacy redirect ${oldPath} must be noindex.`);
    }
  }
}

/**
 * The domain root is the Sarper Studios page, and 999KB Arcade and Jutsu are
 * English + Turkish product surfaces with reciprocal hreflang. All are public
 * so store and ad-network reviewers can read them.
 */
const singlePage = async (pagePath, lang) => {
  const file = pageFile(pagePath);
  if (!(await exists(file))) {
    throw new Error(`Missing generated page: ${pagePath}`);
  }
  const html = await readFile(file, "utf8");
  if (html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1] !== lang) {
    throw new Error(`${pagePath} must be lang="${lang}".`);
  }
  const canonicals = linkTags(html, "canonical");
  if (canonicals.length !== 1 || getAttribute(canonicals[0], "href") !== absolute(pagePath)) {
    throw new Error(`${pagePath} must carry exactly one self-canonical.`);
  }
  if (!/<meta\b[^>]*name="robots"[^>]*content="index,follow"/i.test(html)) {
    throw new Error(`${pagePath} must be index,follow.`);
  }
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) {
    throw new Error(`${pagePath} must contain exactly one h1.`);
  }
  return html;
};

const studioHtml = await singlePage("/", "en");
if (linkTags(studioHtml, "alternate").length) {
  throw new Error("The studio root is English-only and must not declare hreflang alternates.");
}

const appBases = ["/999kb/", "/jutsu/"];
for (const base of appBases) {
  for (const suffix of ["", "privacy/"]) {
    const en = `${base}${suffix}`;
    const tr = `${base}tr/${suffix}`;
    const expected = new Map([
      ["en", absolute(en)],
      ["tr", absolute(tr)],
      ["x-default", absolute(en)],
    ]);
    for (const [pagePath, lang] of [
      [en, "en"],
      [tr, "tr"],
    ]) {
      const html = await singlePage(pagePath, lang);
      const alternates = new Map(
        linkTags(html, "alternate").map((tag) => [getAttribute(tag, "hreflang"), getAttribute(tag, "href")]),
      );
      if (alternates.size !== expected.size) {
        throw new Error(`Incomplete hreflang set for ${pagePath}.`);
      }
      for (const [hreflang, href] of expected) {
        if (alternates.get(hreflang) !== href) {
          throw new Error(`Invalid ${hreflang} alternate on ${pagePath}.`);
        }
      }
      if (!sitemapPaths.has(pagePath)) {
        throw new Error(`Product page missing from sitemap: ${pagePath}`);
      }
    }
  }
}
if (!sitemapPaths.has("/")) {
  throw new Error("The studio root is missing from the sitemap.");
}

/**
 * app-ads.txt is read by ad networks at the domain root. The AdMob line must
 * appear exactly once; other sellers' lines are allowed alongside it.
 */
const appAdsPath = path.join(dist, "app-ads.txt");
if (!(await exists(appAdsPath))) {
  throw new Error("Missing app-ads.txt at the site root.");
}
const admobLine = "google.com, pub-8687761371122116, DIRECT, f08c47fec0942fa0";
const appAdsLines = (await readFile(appAdsPath, "utf8")).split(/\r?\n/).map((line) => line.trim());
if (appAdsLines.filter((line) => line === admobLine).length !== 1) {
  throw new Error("app-ads.txt must contain the AdMob publisher line exactly once.");
}
if (/^\s*Disallow:\s*\/app-ads\.txt/im.test(robotsTxt)) {
  throw new Error("robots.txt must not block app-ads.txt.");
}

console.log(
  `Build validation passed for ${expectedPages.length} canonical pages, localized titles, 404, CNAME, ` +
    `reciprocal hreflang, internal links, ${sitemapLocs.length} sitemap entries, robots.txt, ` +
    `no unpublished store URLs, zero client JavaScript, the Notura legacy redirects, the studio root, ` +
    `the Vergi Hesabım, 999KB Arcade and Jutsu pages and app-ads.txt.`,
);
