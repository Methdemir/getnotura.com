# getnotura.com

Static website for Sarper Studios and its apps, built with Astro and deployed to GitHub Pages.

Served from two domains: `sarperstudios.com` (Cloudflare, canonical, the one that stays) and `getnotura.com` (GitHub Pages, `public/CNAME`, to be retired or redirected later). Canonicals, the sitemap and `robots.txt` point at `sarperstudios.com` on both.

| Path | Surface |
|---|---|
| `/` | Sarper Studios (publisher page) |
| `/notura/` | Notura, seven locales (old root URLs such as `/tr/privacy/` redirect here) |
| `/momentback/` | MomentBack |
| `/vergi-hesabim/` | Vergi Hesabım |
| `/999kb/` | 999KB, canonical at sarperstudios.com/999kb/ (English, Turkish under `tr/`) |
| `/jutsu/` | Jutsu (English, Turkish under `tr/`) |
| `/mergekin/` | MERGEKIN: Echo Defense (English; privacy at `privacy/`, Turkish at `gizlilik/`, text from `docs/mergekin/PRIVACY_CONTENT.md`) |
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

`npm run validate` checks UI translation completeness, locale and semantic-route configuration, Astro types, the static build, canonicals and reciprocal `hreflang`, internal links, `CNAME`, reserved-locale gating, tracking exclusions, and the zero-client-JavaScript budget.

The production Pages job can deploy only from a push to `main`. Pull requests run the same validation without deployment.
