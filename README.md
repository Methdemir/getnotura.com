# getnotura.com

Static website for Sarper Studios and its apps, built with Astro and deployed to GitHub Pages.

| Path | Surface |
|---|---|
| `/` | Sarper Studios (publisher page) |
| `/notura/` | Notura, seven locales (old root URLs such as `/tr/privacy/` redirect here) |
| `/momentback/` | MomentBack |
| `/vergi-hesabim/` | Vergi Hesabım |
| `/999kb/` | 999KB Arcade (English, Turkish under `tr/`) |
| `/jutsu/` | Jutsu (English, Turkish under `tr/`) |
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
