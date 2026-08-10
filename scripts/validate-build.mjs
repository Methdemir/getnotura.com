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

const publishedDestinations = ["home", "product", "howItWorks", "features"];
const metaTitleKeys = {
  home: "metaHomeTitle",
  product: "metaProductTitle",
  howItWorks: "metaHowTitle",
  features: "metaFeaturesTitle",
};
const destinationPath = (locale, destination) => {
  const suffix = routes[destination].path;
  return suffix ? `/${locale.urlPrefix}/${suffix}/` : `/${locale.urlPrefix}/`;
};
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
  { path: "/", lang: "en", selfHreflang: "x-default", destination: "home", title: "Notura | Language selection" },
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

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
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
    expectedAlternates.set("x-default", absolute("/"));
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
  /play\.google\.com/i,
  /apps\.apple\.com/i,
  /googletagmanager/i,
];
for (const pattern of bannedOutput) {
  if (pattern.test(inspectableText)) {
    throw new Error(`Forbidden client output matched ${pattern}.`);
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

console.log(`Build validation passed for ${expectedPages.length} W2 canonical pages, localized titles, 404, CNAME, reciprocal hreflang, internal links, no store URLs, and zero client JavaScript.`);
