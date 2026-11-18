import { readFile, writeFile } from "node:fs/promises";

const base = process.argv[2];
if (!base) throw new Error("Usage: node scripts/validate-http.mjs https://preview.pages.dev [result.json]");
const results = [];
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(match[1]).pathname;
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  const body = await response.text();
  results.push({ path, status: response.status, pass: response.status === 200 && body.includes(match[1]) && !body.includes('http-equiv="refresh"') });
}
for (const path of ["/this-page-does-not-exist/", "/notura/", "/notura/en/", "/notura/tr/privacy/", "/en/", "/tr/", "/en/privacy/", "/de/terms/"]) {
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  results.push({ path, status: response.status, pass: response.status === 404 });
  await response.body?.cancel();
}
const output = { base, checkedAt: new Date().toISOString(), passed: results.filter((r) => r.pass).length, failed: results.filter((r) => !r.pass).length, results };
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ ...output, results: output.results.filter((r) => !r.pass) }, null, 2));
if (output.failed) process.exitCode = 1;
