import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const astroCli = path.join(root, "node_modules", "astro", "bin", "astro.mjs");
const result = spawnSync(process.execPath, [astroCli, ...process.argv.slice(2)], {
  cwd: root,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
