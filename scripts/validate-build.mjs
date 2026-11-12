import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { createHash } from "node:crypto";
import { noturaRedirects, redirectsText } from "./notura-redirects.mjs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteOrigin = "https://sarperstudios.com";
const locales = JSON.parse(await readFile(path.join(root, "src/i18n/locales.json"), "utf8"));
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

for (const reservedPrefix of reservedPrefixes) {
  if (await exists(path.join(dist, reservedPrefix))) {
    throw new Error(`Reserved locale was accidentally published: /${reservedPrefix}/`);
  }
}

const cname = (await readFile(path.join(dist, "CNAME"), "utf8")).trim();
if (cname !== "sarperstudios.com") {
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
const isTracker = (file) => file.startsWith(path.join(dist, "takip") + path.sep);
// HMM Garaj customer quote approval: unlisted, noindex, one scoped script (checked below).
const isQuote = (file) => file.startsWith(path.join(dist, "hmm", "onay") + path.sep);
const scriptFiles = files.filter((file) => file.endsWith(".js") && !isTracker(file) && !isQuote(file));
if (scriptFiles.length) {
  throw new Error(`W1 client JavaScript budget exceeded: ${scriptFiles.join(", ")}`);
}

const inspectableFiles = files.filter((file) => /\.(?:html|css)$/i.test(file) && !isTracker(file) && !isQuote(file));
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

if (/href="(?:https:\/\/sarperstudios\.com)?\/pt\/"/i.test(inspectableText)) {
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

/** HTTP rules replace every former Notura HTML page, including root-locale aliases. */
const builtRedirects = await readFile(path.join(dist, "_redirects"), "utf8");
if (builtRedirects !== redirectsText) throw new Error("Built HTTP redirect rules have drifted from config.");
const redirectSources = new Set();
for (const line of builtRedirects.split("\n").filter((line) => line && !line.startsWith("#"))) {
  const [source, destination, status, extra] = line.split(/\s+/);
  if (extra || status !== "301" || !destination.startsWith("https://getnotura.com/")) throw new Error(`Invalid HTTP redirect: ${line}`);
  if (redirectSources.has(source)) throw new Error(`Duplicate redirect source: ${source}`);
  redirectSources.add(source);
}
for (const { source, destination } of noturaRedirects) {
  if (await exists(pageFile(source))) throw new Error(`Old Notura content or HTML redirect remains: ${source}`);
  if (sitemapPaths.has(source)) throw new Error(`Redirect source remains in sitemap: ${source}`);
  for (const variant of [source, source.slice(0, -1)]) {
    if (!builtRedirects.includes(`${variant} ${destination} 301\n`)) throw new Error(`Missing HTTP 301: ${variant}`);
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
 * MERGEKIN: Echo Defense — an English product page (no alternates) and one
 * privacy policy in English and Turkish at /mergekin/privacy/ and
 * /mergekin/gizlilik/, with reciprocal hreflang. All carry a share image, and
 * the policy pages must render the source text from docs/mergekin/.
 */
const mergekinHome = await singlePage("/mergekin/", "en");
if (linkTags(mergekinHome, "alternate").length) {
  throw new Error("/mergekin/ is English-only and must not declare hreflang alternates.");
}
const mergekinExpected = new Map([
  ["en", absolute("/mergekin/privacy/")],
  ["tr", absolute("/mergekin/gizlilik/")],
  ["x-default", absolute("/mergekin/privacy/")],
]);
for (const [pagePath, lang] of [
  ["/mergekin/", "en"],
  ["/mergekin/privacy/", "en"],
  ["/mergekin/gizlilik/", "tr"],
]) {
  const html = await singlePage(pagePath, lang);
  if (!/<meta\b[^>]*property="og:image"[^>]*content="https:\/\/sarperstudios\.com\/mergekin\/og\.jpg"/i.test(html)) {
    throw new Error(`${pagePath} must carry the MERGEKIN og:image.`);
  }
  if (!sitemapPaths.has(pagePath)) {
    throw new Error(`MERGEKIN page missing from sitemap: ${pagePath}`);
  }
  if (pagePath === "/mergekin/") continue;
  const alternates = new Map(
    linkTags(html, "alternate").map((tag) => [getAttribute(tag, "hreflang"), getAttribute(tag, "href")]),
  );
  if (alternates.size !== mergekinExpected.size) {
    throw new Error(`Incomplete hreflang set for ${pagePath}.`);
  }
  for (const [hreflang, href] of mergekinExpected) {
    if (alternates.get(hreflang) !== href) {
      throw new Error(`Invalid ${hreflang} alternate on ${pagePath}.`);
    }
  }
}

/**
 * The policy text is owned by docs/mergekin/PRIVACY_CONTENT.md. Every
 * paragraph, heading and table cell of the English and Turkish blocks must
 * appear, unchanged, in the visible text of its page; the "Notes for Claude"
 * section must not.
 */
const decodeEntities = (text) =>
  text
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replaceAll("&amp;", "&");
const visibleText = (html) =>
  decodeEntities(
    html
      .replace(/<head>[\s\S]*?<\/head>/i, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<\/(p|h[1-6]|li|th|td|tr|div|section|header|footer|nav|time)>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
const privacySource = (await readFile(path.join(root, "docs/mergekin/PRIVACY_CONTENT.md"), "utf8")).replace(
  /\r\n/g,
  "\n",
);
const policyBlock = (title) => {
  const start = privacySource.indexOf(`\n## ${title}\n`);
  if (start < 0) throw new Error(`PRIVACY_CONTENT.md has no "## ${title}" block.`);
  const rest = privacySource.slice(start + title.length + 5);
  const end = rest.search(/\n---\n|\n## /);
  return end < 0 ? rest : rest.slice(0, end);
};
for (const [pagePath, title, footnoteLabel] of [
  ["/mergekin/privacy/", "English", "Footnote:"],
  ["/mergekin/gizlilik/", "Türkçe", "Dipnot:"],
]) {
  const pageText = visibleText(await readFile(pageFile(pagePath), "utf8"));
  const expectedPieces = [];
  for (const chunk of policyBlock(title).split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines[0].startsWith("|")) {
      for (const row of lines.filter((line) => !/^\|[-|\s]+\|$/.test(line))) {
        expectedPieces.push(...row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      }
      continue;
    }
    let text = lines.join(" ");
    if (text.startsWith("### ")) {
      text = text.slice(4);
      if (text === "Intro" || text === "Giriş") continue;
    }
    if (text.startsWith(footnoteLabel)) text = text.slice(footnoteLabel.length).trim();
    expectedPieces.push(text);
  }
  if (expectedPieces.length < 20) {
    throw new Error(`PRIVACY_CONTENT.md (${title}) parsed into too few pieces: ${expectedPieces.length}.`);
  }
  for (const piece of expectedPieces) {
    if (!pageText.includes(piece)) {
      throw new Error(`${pagePath} does not render this policy text verbatim: "${piece.slice(0, 90)}…"`);
    }
  }
  if (/Notes for Claude|UMP privacy options|Track both in the/.test(pageText)) {
    throw new Error(`${pagePath} renders the internal notes from PRIVACY_CONTENT.md.`);
  }
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
  `Build validation passed for the studio pages, 404, CNAME, ` +
    `reciprocal hreflang, internal links, ${sitemapLocs.length} sitemap entries, robots.txt, ` +
    `no unpublished store URLs, zero client JavaScript, ${noturaRedirects.length} Notura HTTP 301 mappings, the studio root, ` +
    `the Vergi Hesabım, 999KB Arcade, Jutsu and MERGEKIN pages (with the verbatim MERGEKIN policy text) and app-ads.txt.`,
);

// The unlisted tracker may use JavaScript only within its own PWA scope.
const trackerHtml = await readFile(pageFile("/takip/"), "utf8");
if (!trackerHtml.includes('content="noindex,nofollow,noarchive"')) throw new Error("Tracker must be noindex.");
if (sitemapPaths.has("/takip/")) throw new Error("Tracker must not appear in sitemap.");
for (const file of files.filter(f=>f.endsWith(".html")&&!isTracker(f)&&!isQuote(f))) {
  if (/href=["'][^"']*\/takip(?:\/|["'])/.test(await readFile(file,"utf8"))) throw new Error("Public page links to tracker.");
}
const trackerScripts = files.filter(f=>f.endsWith(".js")&&isTracker(f));
if (trackerScripts.length !== 2 || trackerScripts.some(f=>!["install.js","sw.js"].includes(path.basename(f)))) throw new Error("Unexpected tracker scripts.");
console.log("Unlisted tracker: no public links, no sitemap entry, noindex, scoped PWA scripts verified.");

// HMM Garaj quote approval page: same unlisted rules, one script, strict CSP, no public links.
const quoteHtml = await readFile(pageFile("/hmm/onay/"), "utf8");
if (!quoteHtml.includes('content="noindex,nofollow,noarchive"')) throw new Error("Quote page must be noindex.");
if (!/script-src 'self';/.test(quoteHtml) || /unsafe-inline'; connect/.test(quoteHtml)) throw new Error("Quote page CSP must forbid inline script.");
if (/<script\b(?![^>]*\bsrc="\/hmm\/onay\/onay\.js")/i.test(quoteHtml)) throw new Error("Quote page may only load its own script.");
if ([...sitemapPaths].some((p) => p.startsWith("/hmm/"))) throw new Error("Quote page must not appear in sitemap.");
for (const file of files.filter((f) => f.endsWith(".html") && !isQuote(f))) {
  if (/href=["'][^"']*\/hmm\/onay/.test(await readFile(file, "utf8"))) throw new Error("Public page links to quote page.");
}
const quoteFiles = files.filter(isQuote).map((f) => path.basename(f)).sort();
if (quoteFiles.join(",") !== "index.html,onay.js") throw new Error(`Unexpected quote page files: ${quoteFiles}`);
console.log("HMM quote page: unlisted, noindex, strict CSP, single scoped script verified.");

// Every public HTML page is a self-canonical, crawlable document represented in the sitemap.
const canonicalSet = new Set();
for (const file of files.filter((f) => f.endsWith(".html") && !isTracker(f) && !isQuote(f) && f !== notFoundPath)) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(dist, file).replaceAll(path.sep, "/");
  const urlPath = "/" + relative.replace(/index\.html$/, "");
  const canonical = linkTags(html, "canonical");
  if (canonical.length !== 1 || getAttribute(canonical[0], "href") !== absolute(urlPath)) throw new Error(`Incorrect canonical: ${urlPath}`);
  if (canonicalSet.has(absolute(urlPath))) throw new Error(`Duplicate canonical: ${urlPath}`);
  canonicalSet.add(absolute(urlPath));
  if (!sitemapPaths.has(urlPath)) throw new Error(`Public HTML missing from sitemap: ${urlPath}`);
  if (!/<meta\b[^>]*name="robots"[^>]*content="index,follow"/i.test(html)) throw new Error(`Public page is not indexable: ${urlPath}`);
  if (/http-equiv="refresh"/i.test(html)) throw new Error(`Unexpected HTML redirect: ${urlPath}`);
  const alternates = linkTags(html, "alternate");
  for (const alternate of alternates) {
    const targetUrl = getAttribute(alternate, "href");
    const target = new URL(targetUrl);
    if (target.origin !== siteOrigin || !(await exists(pageFile(target.pathname)))) throw new Error(`Broken alternate: ${targetUrl}`);
    const targetHtml = await readFile(pageFile(target.pathname), "utf8");
    const reciprocal = linkTags(targetHtml, "alternate").some((tag) => getAttribute(tag, "href") === absolute(urlPath));
    if (!reciprocal) throw new Error(`Nonreciprocal alternate from ${urlPath} to ${target.pathname}`);
  }
}
if (canonicalSet.size !== sitemapPaths.size || sitemapPaths.size !== sitemapLocs.length) throw new Error("Sitemap must list each public canonical exactly once.");
if (!studioHtml.includes('href="https://getnotura.com/"') || !studioHtml.includes('href="https://getnotura.com/en/privacy/"')) throw new Error("Notura card links must use the standalone domain.");
const baseline = JSON.parse(await readFile(path.join(root, "docs/seo-domain-split/studio-baseline-hashes.json"), "utf8"));
for (const [relative, hash] of Object.entries(baseline.hashes)) {
  const actual = createHash("sha256").update(await readFile(path.join(dist, relative))).digest("hex");
  if (actual !== (baseline.allowedLinkMigrationHashes?.[relative] ?? hash)) throw new Error(`Preserved product/tracker content changed: ${relative}`);
}
console.log(`All ${canonicalSet.size} public canonical pages, reciprocal alternates and ${Object.keys(baseline.hashes).length} unchanged product/tracker/ad-file hashes verified.`);
