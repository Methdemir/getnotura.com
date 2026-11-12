import { readFile, writeFile } from "node:fs/promises";
import { noturaRedirects } from "./notura-redirects.mjs";

const base = process.argv[2];
if (!base) throw new Error("Usage: node scripts/validate-http.mjs https://preview.pages.dev [result.json]");
const results = [];
for (const { source, destination } of noturaRedirects) {
  for (const variant of [source, source.slice(0, -1)]) {
    const response = await fetch(new URL(variant, base), { redirect: "manual" });
    const location = response.headers.get("location");
    results.push({ path: variant, expectedLocation: destination, status: response.status, location, pass: response.status === 301 && location === destination });
    await response.body?.cancel();
  }
}
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(match[1]).pathname;
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  const body = await response.text();
  results.push({ path, status: response.status, pass: response.status === 200 && body.includes(match[1]) && !body.includes('http-equiv="refresh"') });
}
for (const path of ["/this-page-does-not-exist/", "/notura/unknown/"]) {
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  results.push({ path, status: response.status, pass: response.status === 404 });
  await response.body?.cancel();
}
const output = { base, checkedAt: new Date().toISOString(), passed: results.filter((r) => r.pass).length, failed: results.filter((r) => !r.pass).length, results };
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ ...output, results: output.results.filter((r) => !r.pass) }, null, 2));
if (output.failed) process.exitCode = 1;
