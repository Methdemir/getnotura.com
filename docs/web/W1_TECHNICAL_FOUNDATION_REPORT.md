# Notura Web W1 Technical Foundation Report

Date: 10 August 2026

Status: implemented on `feat/web-w1-foundation`; not deployed

## Stack and dependencies

W1 uses Astro 7.2.0 in explicit static-output mode, TypeScript's strictest Astro configuration, Node.js 24 for development/CI, and npm with a committed lockfile. W2 removed the exact npm-version declaration and instead relies on the supported npm range declared in `engines`, matching the CI setup. Astro is the sole site framework and produces static HTML. There is no React, Vue, client router, component library, CMS, analytics, tracking, or external font service.

The development dependencies are intentionally limited:

- `astro`: static page generation, layouts, and typed component composition required by the approved W0 architecture.
- `@astrojs/check`: Astro template and TypeScript validation used by the required `npm run check` gate.
- `typescript`: the compiler used by Astro's strict type-validation gate.

No runtime browser dependency is installed. W1 ships zero client JavaScript.

## Repository structure

The repository now contains the Astro configuration, strict TypeScript configuration, npm manifest/lockfile, source layouts/components/pages/styles, one canonical locale configuration, scoped UI dictionaries, semantic route data, focused build validators, approved public brand/font assets, and a GitHub Pages workflow. The unrelated gallery implementation and photograph are removed on the feature branch while remaining recoverable from Git history. `dist/` and Astro's local cache are ignored.

## Locale architecture

`src/i18n/locales.json` is the canonical locale inventory used by both site code and validation. Published W1 locales are `en`, `tr`, `de`, `es`, `fr`, `it`, and `pt-br`. Their substantive foundation pages are generated at explicit locale prefixes.

European Portuguese (`pt`) is represented in the canonical configuration as reserved for both publication and mobile runtime. W1 does not generate `/pt/`, does not show it in either language selector, and validates that the build contains neither that directory nor a link substituting it for Brazilian Portuguese. Mobile `pt-BR`/`pt_BR` maps to `pt-br`; reserved `pt` and invalid internal input map to English. Updating `pt` to published later requires an explicit configuration and dictionary change.

The root `/` is the language-neutral `x-default` entry. It never redirects and provides direct links using native language names. Explicit locale URLs remain authoritative.

## UI translations and language switching

The W1 interface dictionaries live under `src/i18n/translations/`, separate from future editorial, recipe, guide, and legal content. Every published dictionary must contain the exact non-empty English reference-key set; `npm run validate:translations` fails on missing, extra, empty, or unconfigured dictionaries. Runtime lookup throws instead of silently returning English on a published locale page.

The reusable language selector uses native `<details>`, `<summary>`, lists, and links. It needs no client script, exposes the current language in visible text and its accessible label, supports keyboard operation and mobile touch targets, and excludes the reserved locale. `localeSwitchPath` selects an equivalent destination when available and follows the semantic destination's section fallback until an available locale landing page is found. W1's only published destination is each locale home, so all switches are equivalent.

## Semantic routes

`src/i18n/routes.json` defines stable destination identifiers and normalized locale-independent paths for home, product, how-it-works, learn, professionals, support, privacy, terms, Health and AI Notice, account deletion, and data rights. `localizedPath("de", "privacy")` therefore produces `/de/legal/privacy/` from one route source. Publication is separately gated by route availability; W1 does not generate future pages or dead links. Reserved locales are rejected by the normal public path builder.

## Metadata and international relationships

`SeoHead.astro` and the layouts provide titles, descriptions, self-canonicals, reciprocal published-locale `hreflang`, `x-default`, Open Graph, basic social metadata, robots directives, favicons, and document `lang`. W1 locale pages and `/` form one complete equivalence set. The 404 page is `noindex,follow` and intentionally has no canonical or fake locale inference.

The post-build validator fails on missing/duplicate/incorrect canonicals, missing self-canonicals, unknown alternate targets, non-reciprocal relationships, incorrect HTML language values, an incomplete locale set, or `pt`/`pt-br` substitution.

## Design tokens and assets

The compact token layer defines the approved deep green `#2F5E3E`, dark green `#1E4A2E`, warm surface `#F7F1E6`, pale green `#B7D8BE`, and dark text `#1B241E`, plus a two-weight type scale, spacing, justified radii, content widths, a high-visibility focus ring, motion timing, and the 48rem navigation breakpoint.

The site copies the project-owned primary Notura lockup and symbol PNGs from DietProgram without modifying or upscaling them. It also copies the existing Plus Jakarta Sans Regular/SemiBold TTF files and their OFL license. Fonts are self-hosted; system UI fonts remain the fallback. A professionally approved vector logo remains a future asset improvement, as documented by the mobile brand specification.

## Accessibility and responsive behavior

The foundation targets WCAG 2.2 AA with a skip link, visible `:focus-visible` treatment, semantic header/navigation/main/footer landmarks, one page heading, native disclosure behavior, meaningful link labels, native language names instead of flags, minimum 44px interactive targets, wrapping mobile-first navigation, readable content widths, and reduced-motion handling. Future navigation labels are visible but deliberately not links; assistive text says they are not yet available.

Automated W1 checks validate document languages and the absence of broken links, but they are not a substitute for manual keyboard, screen-reader, zoom, reflow, and contrast review. A browser-heavy accessibility suite was intentionally not added for the small static W1 surface because it would add a disproportionate dependency/runtime stack; manual review and proportionate automation should expand with W2 content and interactions.

## Performance and JavaScript

W1 has no hydration directives, client scripts, third-party requests, remote fonts, analytics, trackers, hero media, or layout-unstable images. The logo declares intrinsic dimensions. The post-build gate fails if a JavaScript asset or `<script>` tag appears, or if common tracking/font-CDN endpoints appear. Static asset caching remains GitHub Pages/CDN behavior; no DNS or host settings are changed.

## GitHub Pages and CI

`.github/workflows/pages.yml` validates pull requests to `main` and pushes to `main` with `npm ci` plus the complete validation suite. Only a push whose ref is exactly `refs/heads/main` configures Pages, uploads `dist/`, and enters the official `actions/deploy-pages` job. The deploy job alone receives `pages: write` and `id-token: write`; all other workflow access is read-only. Concurrency is scoped by ref and does not cancel an in-progress production deployment.

`public/CNAME` contains only `getnotura.com`; Astro copies it into the build artifact. No secrets are required. The feature branch push does not match the workflow trigger and cannot deploy production.

## Validation coverage

The combined `npm run validate` gate runs translation validation, locale/route validation, Astro checking, the static build, then built-artifact validation. Artifact checks cover root and locale output, 404, `CNAME`, HTML languages, unique self-canonicals, complete reciprocal `hreflang`, `x-default`, reserved-locale exclusion, internal links, tracking/CDN exclusions, and zero client JavaScript. `git diff --check` is a separate pre-commit gate.

The completed W1 verification used a clean `npm ci` dependency tree and passed the combined gate with zero Astro errors, warnings, or hints. A local browser smoke test at 360×800 and 1280×800 found no horizontal overflow or console warnings, confirmed the Turkish-to-German equivalent-route language switch, and confirmed that `/pt/` receives the `noindex,follow` 404 rather than locale content. Canonical foreground/background contrast ratios are 14.18:1 for dark text on warm surface, 6.69:1 for deep green on warm surface, 9.01:1 for dark green on warm surface, and 10.12:1 for white on dark green.

## Known limitations and deferred work

- W1 is a technical/demo shell, not final product marketing or visual storytelling.
- Future navigation destinations are modeled but not published.
- Final legal, support, product, professional, and platform-availability claims are deferred to W2/W3.
- Editorial content collections, schemas, sitemaps, recipes, guides, and meal-plan examples are deferred to W4 when real content exists.
- Manual assistive-technology and multi-browser approval remains a release responsibility.
- The approved raster logo is suitable for this foundation; a professional vector master remains an acknowledged brand-asset gap.
- GitHub Pages repository settings, DNS, Cloudflare, Supabase, Edge Functions, and DietProgram are outside this implementation and remain unchanged.

No W0 contradiction was found during W1 implementation.
