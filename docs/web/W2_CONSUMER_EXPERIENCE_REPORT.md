# Notura Web W2 Consumer Experience Report

## Public preview indexing gate

W2 is publicly previewable by URL, but it is not the indexed launch. The central
`siteReleaseStatus` setting in `src/config/site-release.ts` is intentionally set
to `"preview"`, causing substantive public pages to emit `noindex,follow`.
The existing 404 retains its explicit `noindex,follow` policy. W8 must
deliberately change and review this setting before search indexing is enabled.

No `robots.txt` is added for the preview: it is not a substitute for page-level
`noindex`, and a crawler must be allowed to access pages in order to see that
directive.

Date: 10 August 2026

Status: implemented on `feat/web-w2-consumer`; not deployed

## Base and scope

W2 was created directly from the verified W1 commit `fe48d8f86db607e663c6b2e0502d90e19a1c9ea9`. At verification time, `origin/main` was `0b769fd017c7359baf1177c4ab09296519930039`, `origin/feat/web-w1-foundation` was the expected W1 commit, and the branches diverged by zero commits on `main`'s side and one commit on W1's side. The known modification to `.claude/settings.local.json` remains only in the original `main` checkout and was not touched by the isolated worktree.

This phase implements the consumer homepage, Product, How it works, and Features overview on the W1 Astro/i18n/SEO foundation. It does not implement W3 legal/support, W4/W5 content, W6 Professionals, an authenticated web product, app-store distribution, or deployment.

## Product-truth audit

The mobile repository was read only. The audit covered `pubspec.yaml`, locale configuration and ARB files, authentication/profile repositories, quick-add and meal-entry actions, the food AI gateway/contracts, manual food entry, barcode scanning and Open Food Facts lookup, dashboard nutrition summaries, water and weight repositories/screens, daily/weekly/monthly statistics, food sync/storage, and the explicit PDF/community preview screens.

| Claim | Repository evidence | Status | Public wording decision |
|---|---|---|---|
| Add food from a photo | `lib/features/entry/quick_add.dart`, `lib/features/entry/meal_entry_actions.dart`, `lib/features/food_ai/edge_food_ai_gateway.dart` | Current | Presented as meal-image analysis that must be reviewed. |
| Add food with ordinary text | `lib/features/entry/quick_add.dart`, `lib/features/entry/meal_entry_actions.dart`, `lib/features/food_ai/food_ai_contracts.dart` | Current | Presented as describing what was eaten, including known portions. |
| Add food manually | `lib/features/food_entry/manual_food_entry_screen.dart`, `manual_food_form.dart` | Current | Presented as direct calorie/nutrition entry for control and precision. |
| Scan a packaged-food barcode | `lib/features/barcode/barcode_scanner_screen.dart`, `data/open_food_facts_lookup_gateway.dart`, `domain/barcode_product.dart` | Current | Presented as lookup whose returned label data should be checked. No universal product-coverage claim is made. |
| Use a bundled catalog and favorites | `lib/core/catalog/food_catalog.dart`, `lib/features/food_entry/catalog_search_tab.dart`, `my_foods_screen.dart`, favorite sync repository | Current | Included in Product and Features, without claiming catalog completeness. |
| See calories and protein/carbohydrate/fat context | `lib/features/dashboard/widgets/daily_summary_card.dart`, meal detail totals and stats widgets | Current | Presented as estimates/totals alongside daily targets, with incomplete results kept visible. |
| Track water | `lib/features/water/water_screen.dart`, `water_sync_repository.dart`, dashboard/stats water widgets | Current | Presented as water entries and a daily target. |
| Track weight and history | `lib/features/weight/weight_tracking_screen.dart`, `weight_sync_repository.dart`, weight history/chart widgets | Current | Presented as entries and history, with no outcome promise. |
| Review daily, weekly and monthly progress | `lib/features/stats/stats_screen.dart`, `daily_view.dart`, `weekly_view.dart`, `monthly_view.dart` | Current | Presented as time-range views and patterns, not medical analysis. |
| Account authentication and cross-device sync | `lib/features/auth/auth_repository.dart`, `auth_gate.dart`, remote profile and food/water/weight sync repositories | Current | Mentioned only as account-based synchronization. No provider marketing claim is made. |
| Seven runtime locales | `lib/core/localization/app_locale.dart`; `app_en/tr/de/es/fr/it/pt_BR.arb` | Current | W2 publishes `en`, `tr`, `de`, `es`, `fr`, `it`, and `pt-br`. |
| PDF progress reports | `lib/features/reports/pdf_report_preview_screen.dart` explicitly identifies a preview and future feature path | Planned | Omitted from W2 public feature navigation and claims. |
| Community/groups | `lib/features/community/community_preview_screen.dart` explicitly avoids claiming a working feature | Planned | Omitted. |
| Family sharing, coaching/dietitian, premium and professional web tools | Architecture/release documentation and future-code references; no production-ready consumer flow | Planned/conceptual | Omitted. |
| iOS or public store availability | No verified public store build or iOS release in the audited source | Not public-ready | No store button, store URL, platform badge or availability claim is rendered. |

## Pages, routes and localization

Published semantic destinations are centralized in `src/i18n/routes.json` and `routeAvailability`:

- `/{locale}/`
- `/{locale}/product/`
- `/{locale}/how-it-works/`
- `/{locale}/features/`

They are generated for `en`, `tr`, `de`, `es`, `fr`, `it`, and `pt-br`, producing 28 localized W2 pages. The neutral root `/` remains the lightweight `x-default` language entry. European Portuguese remains reserved: no `/pt/` directory is generated, it is not offered by either language selector, and a direct `/pt/` request reaches the `noindex,follow` 404 without redirecting.

Each localized dictionary has the same 104 non-empty keys. Copy uses current app terminology as a reference, but the new public translations have not been represented as professionally or legally reviewed. Human linguistic QA, with particular attention to German and French, remains a W8 release gate.

Language switching uses the central availability set. Equivalent W2 destinations remain equivalent: for example, Turkish Product switches to German Product, not the German homepage. `x-default` is emitted only for the home equivalence group.

## Consumer storytelling and design

The homepage follows one continuous story:

1. a restrained utility-first hero with truthful “See how Notura works” and Product calls to action;
2. four verified capture methods: photo, text, barcode and manual entry;
3. calorie/macronutrient context with visible estimate language;
4. water, weight and daily/weekly/monthly progress over time;
5. a prominent AI-estimate and non-medical boundary;
6. a closing transition to How it works.

Product is organized as Log, Understand, Track and Review. It uses editorial rows and restrained lists instead of a uniform card grid. A current-capability note explicitly states that the site does not link a public store build and does not present reports, community, family sharing or professional tools as available.

How it works explains a real four-step flow: add, review, adjust and see the wider pattern. Correction is presented as part of the normal process because photos, recipes, packages and AI results can vary.

Features is an overview hub for flexible meal capture, nutrition context, water/weight and progress views. W2 deliberately publishes no feature-detail routes: without approved current screenshots or enough distinct deeper content, those pages would repeat the overview and become thin marketing surfaces. The semantic architecture can add them later when they provide real user value.

The visual system uses the existing deep greens, warm cream, pale green, Plus Jakarta Sans, lockup and symbol. Layout relies on type scale, whitespace, full-width transitions, asymmetric compositions and editorial rules. The abstract capture/nutrition/progress compositions are explanatory HTML/CSS, not fabricated app screenshots or dashboard claims.

## Assets and provenance

The W1-copied `public/images/notura-lockup-primary.png` and `public/favicon/notura-symbol.png` remain byte-equivalent project-owned exports from DietProgram's canonical Notura branding directories. The existing self-hosted Plus Jakarta Sans Regular/SemiBold files and OFL license remain unchanged.

No trustworthy current screenshots were found in DietProgram. No app screenshot, external photo, third-party mockup, hotlinked image or generated fake product screen is used. Missing assets for later review are: privacy-safe screenshots from a reviewed current build, a professionally approved vector logo/lockup, and a dedicated social-preview image.

## Navigation and footer

Primary navigation now contains only real published links: Product, How it works and Features. Learn, Professionals and Support remain reserved semantic destinations but are not rendered as dead or disabled navigation. The footer repeats the three factual consumer destinations and the equivalent-page language selector. It does not invent legal, company, support or professional destinations.

The responsive header keeps a zero-JavaScript native `<details>/<summary>` language selector. Mobile navigation wraps to a separate row; important links remain visible rather than moving into a scripted menu.

## SEO and metadata

All 28 localized W2 pages have localized title/description, correct HTML `lang`, one self-canonical, reciprocal equivalent-page `hreflang`, locale-specific Open Graph metadata and one meaningful `h1`. Together with `/`, the validator checks 29 canonical pages. The 404 remains `noindex,follow` and has no canonical or locale inference.

No structured data was added. Organization data would be premature while controller/company facts remain a W0/W3 launch gate, and SoftwareApplication markup would risk implying unverified store availability. The visible site and metadata contain no ratings, prices, reviews, user counts or store links.

## JavaScript, dependencies and npm reproducibility

The built W2 artifact contains zero JavaScript files and no `<script>` elements. The native responsive navigation and language selector avoid a client runtime. The build validator continues to fail on JavaScript, trackers, analytics, remote font endpoints and now public app-store URLs.

W2 chooses the roadmap's npm reproducibility Option B: remove the exact `packageManager: npm@11.13.0` guarantee and rely on Node 24 plus the supported npm range already declared in `engines`. This matches CI, which uses the npm bundled with the selected Node release. The verified local run used Node `v24.16.0` and npm `11.13.0`; no package dependency or lockfile change was needed.

## Accessibility and responsive review

The implementation preserves semantic landmarks, skip link, one `h1`, ordered process steps, descriptive navigation labels, native language names, current-page states, 44px-or-larger controls, visible focus rings, meaningful or deliberately empty alt text, AA foundation colors, reduced-motion behavior and no essential animation.

Browser smoke checks covered 360×800, 390×844, 768×900, 1280×900 and 1440×900. A first 390px pass found a 12px overflow from decorative hero leaves; the composition was clipped locally and all five widths then reported `scrollWidth === clientWidth`. English home/Product/How it works, Turkish home and German Product were reviewed. German expansion remained readable at 768px. Turkish Product switched through the visible selector to German Product. The neutral root retained its URL and seven language links. `/pt/` rendered the `noindex,follow` 404. Browser console review returned no errors or warnings. A focused header link showed the intended high-visibility double ring.

Automated and browser checks are not a substitute for W8 screen-reader, 200%/400% zoom, full keyboard traversal across target browsers, or human linguistic review.

## Performance observations

The build produces one 17.8KB uncompressed CSS file, no JavaScript, a 9.9KB uncompressed English homepage and a 7.0KB uncompressed English Product page. The two project-owned raster brand assets total about 293KB in the complete artifact; the above-fold symbol is 158KB and remains under the architecture's 250KB mobile image target by itself. The two TTF font weights total about 264KB and use `font-display: swap`.

The current files meet a small static-site profile, but the 158KB symbol is oversized for its rendered dimensions and the TTF delivery is less efficient than a licensed, subset WOFF2 pipeline. Those optimizations are documented gaps rather than being performed from unverified font or logo sources in W2.

## Validation and review artifacts

Completed checks:

- `npm ci` — passed; 270 packages installed, 0 reported vulnerabilities.
- `npm run validate` — passed: seven dictionaries/104 keys, eight locale definitions/12 destinations, Astro check with zero errors/warnings/hints, 30 generated pages, and the full built-artifact gate.
- built routes, localized titles, canonical/hreflang reciprocity, HTML languages, internal links, navigation links, no `/pt/`, CNAME, no store URLs, no trackers/remote fonts and zero JavaScript — passed.
- `git diff --check` — required pre-commit check; result recorded in the final task report.

Local review screenshots are intentionally not committed:

- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\en-home-desktop-1440x900.png`
- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\en-product-desktop-1440x900.png`
- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\en-home-mobile-390x844.png`
- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\en-how-it-works-mobile-390x844.png`
- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\tr-home-mobile-390x844.png`
- `C:\Users\Metin\AppData\Local\Temp\getnotura-w2\review\w2\de-product-tablet-768x900.png`

## Deliberate deferrals and known gaps

- W3: legal center, final Health and AI Notice, support, contact, account deletion and data-rights surfaces.
- W4/W5: articles, recipes, guides, meal-plan examples, content collections and editorial schema.
- W6/W7: Professionals marketing and any authenticated professional product.
- Public app-store buttons, iOS, pricing, testimonials, user metrics, analytics, newsletter, forms and CMS.
- Feature-detail pages until distinct reviewed content and visual evidence exist.
- Human linguistic QA and formal product-copy approval.
- Current privacy-safe app screenshots, optimized vector brand exports, WOFF2 subsets and dedicated social cards.
- Full assistive-technology and cross-browser release approval.

No production deployment, `main` merge, DNS/Cloudflare change, Supabase/Edge change or DietProgram modification was performed.
