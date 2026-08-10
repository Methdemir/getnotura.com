# Notura Web

Static, locale-prefixed public website foundation for Notura, built with Astro and designed for GitHub Pages.

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
