# Sarper Studios website

Static website for Sarper Studios and its apps at `sarperstudios.com`, built with Astro and deployed by Cloudflare Pages from the `studio-production` branch (`npm run build`, output `dist`).

Every app owns one top-level path. A new app is added the same way: its own copy file in `src/content/`, layout, stylesheet and pages, plus an entry in `studioApps` (`src/content/studio.ts`) and, once it is live, its Play listing in `src/config/store-availability.ts`.

| Path | Surface |
|---|---|
| `/` | Sarper Studios (publisher page) |
| `/momentback/` | MomentBack (English, Turkish under `tr/`; privacy and terms) |
| `/vergi-hesabim/` | Vergi Hesabım (Turkish; privacy at `privacy/`) |
| `/999kb/` | 999KB (English, Turkish under `tr/`) |
| `/jutsu/` | Jutsu (English, Turkish under `tr/`) |
| `/mergekin/` | Mergekin: Rune Legion (English; privacy at `privacy/`, Turkish at `gizlilik/`, text from `docs/mergekin/PRIVACY_CONTENT.md`) |
| `/kimo/` | Kim O? (placeholder) |
| `/app-ads.txt` | AdMob seller declaration for every app |

## Requirements

- Node.js 24 (Astro requires Node.js 22.12 or newer)
- npm 9.6.5 or newer

## Commands

```sh
npm ci
npm run check
npm run build
npm run validate
```

`npm run validate` runs the Astro type check, the static build and `scripts/validate-build.mjs`: canonicals and reciprocal `hreflang`, the sitemap, internal links, `CNAME`, store links (only listings in `store-availability.ts`), tracking exclusions, `app-ads.txt` and the zero-client-JavaScript budget.
