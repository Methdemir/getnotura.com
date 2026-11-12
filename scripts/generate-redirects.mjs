import { writeFile } from "node:fs/promises";
import { redirectsText, noturaRedirects } from "./notura-redirects.mjs";

await writeFile(new URL("../public/_redirects", import.meta.url), redirectsText);
console.log(`Generated HTTP 301 rules for ${noturaRedirects.length} published and legacy Notura URLs (including slashless aliases).`);
