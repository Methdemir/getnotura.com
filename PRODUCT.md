# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The website's primary visitor is **someone new to food tracking**: an everyday person who wants to understand what they eat but has never used a calorie tracker and does not know the vocabulary. They are not fitness-experienced and should not be assumed to know what a macro is, why a number would be an estimate, or why a log would ever need correcting. The site has to explain the concept before it explains the product.

The audience is global rather than single-market. The product ships seven runtime languages and the site publishes the same seven, so no locale is a translation afterthought.

Secondary visitors who must not be misled, but who do not set the design: people who already encountered Notura and are checking that it is real, and prospective professional/dietitian users whose product line does not exist yet.

## Product Purpose

Notura is an account-based mobile nutrition tracker (Flutter, Android-only today) that lets people record food several ways, see calorie and macronutrient context against their own targets, and review patterns over time.

`getnotura.com` is its **public, static, pre-launch home**. Confirmed by the user: success for this site is *credibility and readiness, not conversion*. A visitor should leave understanding what Notura is, believing it is a serious and honest product, and able to reach legal and support material. There is nothing to install yet, so there is no install to optimize for.

This matches the repository's own posture: `siteReleaseStatus` in [src/config/site-release.ts](src/config/site-release.ts) is `"preview"`, which emits `noindex,follow` on substantive pages until a deliberate W8 change.

## Positioning

Notura's defensible difference is **honesty about its own numbers**, and it is implemented, not aspirational:

- Nutrition figures are treated as estimates, and correction is a normal step in the flow rather than an error path.
- When a day's data is incomplete, the product says so instead of rendering a confident total. `IncompleteNutritionNote` with `NutritionNoteScope.budget` exists specifically because a missing total makes the remaining budget an *upper bound*, and overstating the remaining budget would cause someone to eat more than they intended.
- The "what should I eat today" recommender has a deterministic, offline, no-AI core that always works; the AI layer personalizes on top of it and degrades gracefully. AI capacity is a visible, quota-bounded resource, not an invisible promise.

A neighboring tracker could copy the feature list. It could not truthfully copy a product that is built to show its own uncertainty.

Notura is **not** a medical device, diagnosis service, or a substitute for a qualified clinician or dietitian. This is a permanent boundary, not a disclaimer to be minimized.

## Operating Context

- The visitor arrives with no way to install the app and no prior Notura vocabulary. Reading is the entire experience.
- The site is a static build served from GitHub Pages at the apex domain `getnotura.com`, deployed only by a push to `main`.
- The site is currently URL-previewable but deliberately excluded from search indexing.
- Seven locales publish at explicit URL prefixes (`/en/`, `/tr/`, `/de/`, `/es/`, `/fr/`, `/it/`, `/pt-br/`). The neutral root `/` is the `x-default` entry and never redirects. Since 30 August 2026 it serves the English home in full rather than a language-selection page: a static, zero-JavaScript site has no redirect and no content negotiation, so the fix for the language wall was to stop gating on the choice, not to guess at it. Locale is still never inferred from IP or browser language, and the selector sits in the masthead and the footer of every page.
- The mobile app and the website are separate products that share one locale vocabulary.

## Capabilities and Constraints

### Current app capabilities — verified present in release builds

Source of truth: `C:\Users\Metin\Desktop\Projects\Mobile-Portfolio\apps\DietProgram` (read-only).

- Google authentication via Supabase Auth; onboarding captures gender, birth year, height, activity level, current weight, goal type, target weight, weekly pace, calorie/macro/water targets, and unit/locale preferences.
- **Six food-logging entry points**, all release-visible via `visibleAddEntryChoices()`: camera photo, gallery photo, text description, My Foods (saved items and favorites), manual entry, and barcode scan. Barcode was explicitly moved out from behind the pre-release gate because a complete flow exists behind it (scan → product → quantity → save).
- Barcode lookup resolves packaged products through Open Food Facts; returned label data is presented as something to check, with no universal product-coverage claim.
- AI food-text parsing and food-image analysis through a Supabase Edge gateway, with a user-visible usage quota.
- A bundled offline food catalog.
- Calorie and protein/carbohydrate/fat context against daily targets, with nutrition-completeness notes when the underlying data is partial.
- Water tracking with a daily target; weight tracking with history.
- Daily, weekly, and monthly progress views.
- **An Explore surface** (`AppDestination.explore`, one of four bottom-nav destinations): a remaining-budget "what should I eat today" module, an offline deterministic meal recommender that consumes no AI quota, local diet programs as discovery content, and an AI personal suggestion carrying a labeled quota indicator.
- Cross-device sync and private food-photo storage.
- Seven runtime locales: `en`, `tr`, `de`, `es`, `fr`, `it`, `pt-BR`.
- App navigation is Today · Progress · [+] · Explore · Profile, where `+` is a global add action rather than a tab.
- **Copy yesterday's entries** into today, from the Today screen.
- **Reminders**, scheduled on the device: water, breakfast, lunch, dinner, a weight check on chosen days, and a daily check-in.
- **A visible AI allowance**: the profile shows the plan and both the daily and the monthly counter, so the quota is a stated resource rather than a silent limit.
- **Data export**: the user's records into a single file they keep or share.
- Unit system (metric / imperial / automatic) and appearance (light / dark / system) are user settings.

### PDF progress reports and Community — shipped, verified 30 August 2026

Both were previously gated behind `showPreReleaseSurfaces` (`kDebugMode`). **That gate no longer exists**: the symbol is absent from `lib/`, and `cd0d49e feat(community): show community in normal builds` (26 August 2026) was the last step. `CommunityPreviewScreen` survives as dead, unreferenced code and its "Community is not active yet" strings must not be quoted as current.

**PDF progress reports** — `lib/features/reports/`:

- A user-picked date range, floor `today − 59` and ceiling today, validated to a maximum of 60 inclusive days. Default range is the last 30 days. There are **no 1 / 14 / 60 day presets**; 1, 14 and 42 are thresholds in `ReportPresentationPolicy` that decide how much detail the document carries (single day → daily → full → weekly).
- Sections: energy chart, macronutrients, weight and BMI when weight exists, weekly rhythm, meal distribution, hydration, target comparison, registration coverage, plus a medical disclaimer the renderer emits itself.
- `includeFoodDiary` is off by default and appends the diary when switched on.
- `ReportArchive` stores each PDF on the device in a directory keyed by the signed-in user id. Signing out does not delete them; identity is re-checked at the moment of the write so a report cannot land in another account's folder.
- Reachable from Progress ("Create PDF report") and from Profile ("My PDF reports").

**Community** — `lib/features/community/`:

- Friends are added by email; a request must be accepted before anything is shared.
- `CommunitySharePreferences` defaults to both permissions off. Meal sharing and daily goal-progress sharing are independent flags.
- Turning meal sharing on asks for a scope: `today` (local midnight) or `last30Days`.
- `communityRetention` is 30 days, in one place, read by the visibility query, the cleanup job, the week navigation bound and the product copy.
- Removing a post from Community is a separate, permanent decision from turning sharing off; re-enabling sharing does not bring a manually removed meal back, and the user's own diary entry is never affected.
- Comments (max 300 characters) and reactions from friends; blocking ends the friendship both ways and unblocking does not restore it; a blocked-people list exists.

### Not current — must never be presented as available

- Family sharing, coaching/dietitian features, premium tiers, and professional web tools: architecture and documentation only.
- **iOS**: no `ios/` directory exists in the mobile repository. `docs/product_roadmap.md` states Android is the priority and iOS a later version, and lists iOS among explicitly deferred post-v1 work. iOS must therefore never be described as imminent or as launching alongside Android.
- **Pricing**: the roadmap plans a free tier with a paid subscription above it, but no amount, currency or billing period is decided. The site publishes no price and no pricing table. `src/config/store-availability.ts` carries a `pricing` marker set to `undecided` so there is one place for the figures when they exist.

### Distribution posture — user decision, 30 August 2026

Notura is still **not distributed**: there is no public store listing on any platform. The earlier rule — render no store element at all — is replaced by the user's instruction to show visible pre-launch store areas, under these conditions, which are stricter than a badge:

- No fake or placeholder `href`, no "Download now", and no control that looks actionable but does nothing.
- The platform is named and its status stated in words, translated in all seven locales.
- The markup is not a link, a button, or anything with a role, so a screen reader meets a statement rather than a control.
- One central structure — `src/config/store-availability.ts` — drives every surface, so release day is a state change and a URL in one file.

Statuses are per platform and are not equal, because the facts are not equal: Google Play is `coming-soon` (the first release target), the App Store is `planned` ("after the first release"), matching the roadmap rather than implying a parallel launch. `scripts/validate-build.mjs` keeps store hostnames out of the build output for as long as no channel is marked available.

### Website technical constraints — preserve these

- Astro 7.2.0, `output: "static"`, `trailingSlash: "always"`, TypeScript strictest. No React/Vue, no client router, no component library, no CMS, no backend, no forms, no analytics.
- **Zero client JavaScript.** [scripts/validate-build.mjs](scripts/validate-build.mjs) fails the build on any emitted `.js` file or any `<script>` tag. Interactive patterns must be native HTML (the language selector uses `<details>`/`<summary>`).
- The same validator bans Google Analytics, Tag Manager, Facebook pixels, `fonts.googleapis.com` and `fonts.gstatic.com` from build output outright, and bans `play.google.com` and `apps.apple.com` conditionally — for as long as no channel in `src/config/store-availability.ts` is marked `available`. It also checks that `sitemap.xml` lists every canonical page and only pages that were built, and that `robots.txt` points at it without blocking the site.
- Fonts are self-hosted Plus Jakarta Sans TTF in **two weights only** (400 Regular, 600 SemiBold) under OFL. No remote font service.
- Every published page needs a localized title and description, correct `lang`, exactly one self-canonical, reciprocal `hreflang` across all seven locales, `x-default` on the home group only, and one meaningful `h1`. The post-build validator enforces all of it.
- `pt` (European Portuguese) is **reserved**: no `/pt/` directory may be generated, it must not appear in either language selector, and `/pt-br/` must never be substituted for it.
- All UI copy lives in seven dictionaries that must carry an identical non-empty key set. Adding one string means adding seven translations or the build fails.
- `public/CNAME` must contain exactly `getnotura.com`. Deployment is GitHub Pages, triggered only by a push to `main`.
- No structured data is currently emitted; Organization and SoftwareApplication markup are gated on unresolved company facts and nonexistent store availability.

### Product demonstrations — revised 11 August 2026 by user decision

The earlier blanket ban on any fabricated or mocked-up interface imagery was too strict as a design constraint and is replaced by the following. **Authored, clearly stylized product demonstrations are permitted**, provided every one of these holds:

- they are **not presented as literal screenshots** of the shipping app;
- they **depict only implemented capabilities** — nothing planned or conceptual, and nothing that a current release build does not do;
- they **invent no product claim and no data presented as real** — no fabricated user metrics, ratings, prices, or results asserted as actual readings;
- they stay **faithful to Notura's real interaction and visual semantics** — the fixed macro colors keep their meaning, real flows are not rearranged into flows the app does not have, and terminology matches the product;
- they are **visually distinguishable as designed demonstrations** rather than documentary screenshots.

Real, privacy-safe screenshots from a reviewed build remain the preferred material and should replace authored demonstrations once they exist. This permission covers demonstration; it does not loosen any claim rule elsewhere in this document.

### Undecided product facts — record, do not invent

- Controlling company/legal identity, contact channel, launch markets, and age floor are open W0 launch gates.
- Whether European Portuguese becomes a real eighth locale is undecided.
- In-app legal links currently point to `sarperstudios.com/terms` and `/privacy`, not to getnotura.com. This must be reconciled before legal pages are published.
- Human linguistic QA and formal legal review of published copy have not happened.

## Brand Commitments

- **Name:** Notura. Confirmed in the app title and the Android manifest label.
- **Assets (project-owned, exported from the mobile repo's canonical branding directories):** `public/images/notura-lockup-primary.png`, `public/favicon/notura-symbol.png`. Reverse and monochrome lockup/symbol variants, app-icon masters, and splash exports exist in the mobile repo if needed.
- **Typeface:** Plus Jakarta Sans, bundled and self-hosted.
- **Canonical light brand palette** (`AppBrandColors.light`): primary `#2F5E3E`, primary dark `#1E4A2E`, on-primary `#F5EFE3`, surface `#F7F1E6`, accent `#B7D8BE`, on-surface `#1B241E`, outline `#5C7A66`.
- **A canonical dark palette also exists** (`AppBrandColors.dark`): primary `#8FC7A2`, surface `#121A15`, on-surface `#F5EFE3`, outline `#7D9A87`.
- **Semantic data colors, applied consistently across rings, charts, and badges in-app:** protein `#5B8DEF`, carbohydrate `#F2A63B`, fat `#E86A92`, calories `#2E7D5B`, water `#3BA9F2` (deep `#0E6FB8`), weight `#8C6DE0`, target-exceeded `#E5484D`. These carry fixed meaning; the mobile code explicitly warns that fat must never be confused with the error color.
- **Recorded brand-direction finding:** the mobile branding audit flags the water screen's "cyber-neon" glow treatment as conflicting with Notura's brand character. Neon and glow are treated as off-brand.
- **Tone:** calm, approachable, modern, non-clinical. Never sensational, never diagnostic, never promising outcomes.
- **Standing direction preference (user decision, 10 August 2026):** when offered a derived visual world against the category standard, the user chose **the category standard, executed at full craft**. Convention is the commitment for this site: the familiar nutrition-product page arrangement, played straight, without irony or smuggled quirk. This preference stands until the user revokes it and applies to future visual rounds.
- **Craft bar (user decision):** Oura, Whoop, and Zoe. Their marketing craft level — editorial layout, elevated typography, generous scale, calm and premium finish — is the bar this site must reach.
- **Device imagery:** a product/device slot may appear in the canonical arrangement. What may fill it is governed by the product-demonstration rule under Capabilities and Constraints.

## Evidence on Hand

**Real and usable:**

- **Four privacy-safe app screenshots**, captured 30 August 2026 from a Samsung SM-M215F (Android 12, SDK 31, 1080×2340) running `com.metindemir.diet_ai_app` 1.0.0 (versionCode 1), with the app temporarily switched to English and restored afterwards. Each is cropped to one consistent 1080×1500 window chosen so no personal figure enters the frame; nothing inside the interface was altered. Published as WebP and AVIF at 1080w and 640w under `public/images/app/`: `add-a-meal`, `explore`, `pdf-report`, `depth`.
- Project-owned brand assets listed above.
- A source-verified feature inventory drawn from the mobile repository.
- Seven complete website UI dictionaries (104 keys each) and seven complete app ARB files.
- Prior architecture research in [docs/web/](docs/web/): platform spec, research sources, roadmap, and the W1/W2 implementation reports.

**Absent — future work must not fabricate any of it:**

- **Community has no publishable capture.** The build installed on the test device (versionCode 1, installed 22 August 2026) predates `cd0d49e`, so Community is not reachable on it, and the only account available holds real personal data. The Community figure on the site is therefore authored and labelled as such. Replacing it needs a newer build and a safe account — not a redesign: `AppScreen` takes the screenshot instead of the slot.
- **No screenshot of a day with data.** The signed-in account is the developer's own production account; every screen showing logged food, weight history, targets or profile carries real personal data and is out of bounds. The four published plates were chosen because they carry none.
- **Screenshots exist in English only.** All seven locales render the same English captures with localized alt text and captions, which is a deliberate maintenance decision rather than an oversight: `src` is a per-call prop, so a locale-specific set can be added later without touching the layout.
- No vector logo master; only raster PNG exports exist.
- No dedicated social-preview image.
- No store listing, download count, rating, or review.
- No testimonials, user counts, case studies, press coverage, awards, partnerships, or customer logos.
- No pricing.
- No clinical validation, scientific claims, medical endorsement, or performance statistics.

Where persuasion is needed and proof does not exist, the answer is stronger presentation of genuine capability — never manufactured social proof.

## Product Principles

1. **An estimate is never dressed as a measurement.** AI-derived numbers appear with their limits attached, and correcting a log is presented as part of the normal flow, not as failure.
2. **Incompleteness stays visible.** When the product does not know something, it says so rather than rendering a confident number. Erring toward an overstated remaining budget is the specific harm this guards against.
3. **Only what ships in a release build may be claimed.** The pre-release gate is the line. Planned surfaces are omitted entirely rather than teased, labeled "coming soon," or implied by layout.
4. **No borrowed credibility.** With no store listing, no reviews, and no user base, trust must be earned through clarity, precision, and evident care — never through invented social proof.
5. **Seven locales or none.** Copy ships in every published language or it does not ship. No locale carries placeholder or untranslated content.
6. **Notura is not medical.** It does not diagnose, prescribe, or replace a clinician or dietitian, and no copy may blur that line.

## Accessibility & Inclusion

Target standard is **WCAG 2.2 AA**, treated as a definition-of-done concern rather than a final polish pass.

- Full keyboard access, visible focus, skip link, logical focus order, no keyboard traps.
- Semantic landmarks and headings; labels never dependent on placeholder text.
- AA contrast including interactive states and any text over imagery.
- Touch targets consistent with WCAG 2.2 Target Size; the current implementation holds a 44px minimum.
- Reduced-motion support, with no information conveyed by animation alone.
- Correct page `lang`, in-content language changes marked, and a locale selector that shows each language's name in its own language with the current selection exposed. Flags are never used to represent languages.
- The zero-JavaScript constraint means every disclosure, menu, and interactive pattern must work as native HTML.
- Because the primary visitor is new to food tracking, plain language is an accessibility requirement here, not a style preference: unexplained jargon excludes the actual audience.
