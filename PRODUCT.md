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
- Seven locales publish at explicit URL prefixes (`/en/`, `/tr/`, `/de/`, `/es/`, `/fr/`, `/it/`, `/pt-br/`). The neutral root `/` is the `x-default` language entry and never redirects. Locale is never inferred from IP or browser language.
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

### Not current — must never be presented as available

- **PDF progress reports** and **community/groups**: both sit behind `showPreReleaseSurfaces`, which is `kDebugMode`, so release builds tree-shake them away entirely.
- Family sharing, coaching/dietitian features, premium tiers, and professional web tools: architecture and documentation only.
- **iOS**: no `ios/` directory exists in the mobile repository.
- **Any distribution at all.** Confirmed by the user: Notura is **not yet distributed** — there is no public store listing. The site must render no download button, no store URL, no platform badge, and no availability claim. The truthful call to action is understanding, e.g. "see how Notura works."

### Website technical constraints — preserve these

- Astro 7.2.0, `output: "static"`, `trailingSlash: "always"`, TypeScript strictest. No React/Vue, no client router, no component library, no CMS, no backend, no forms, no analytics.
- **Zero client JavaScript.** [scripts/validate-build.mjs](scripts/validate-build.mjs) fails the build on any emitted `.js` file or any `<script>` tag. Interactive patterns must be native HTML (the language selector uses `<details>`/`<summary>`).
- The same validator bans Google Analytics, Tag Manager, Facebook pixels, `fonts.googleapis.com`, `fonts.gstatic.com`, `play.google.com`, and `apps.apple.com` from build output.
- Fonts are self-hosted Plus Jakarta Sans TTF in **two weights only** (400 Regular, 600 SemiBold) under OFL. No remote font service.
- Every published page needs a localized title and description, correct `lang`, exactly one self-canonical, reciprocal `hreflang` across all seven locales, `x-default` on the home group only, and one meaningful `h1`. The post-build validator enforces all of it.
- `pt` (European Portuguese) is **reserved**: no `/pt/` directory may be generated, it must not appear in either language selector, and `/pt-br/` must never be substituted for it.
- All UI copy lives in seven dictionaries that must carry an identical non-empty key set. Adding one string means adding seven translations or the build fails.
- `public/CNAME` must contain exactly `getnotura.com`. Deployment is GitHub Pages, triggered only by a push to `main`.
- No structured data is currently emitted; Organization and SoftwareApplication markup are gated on unresolved company facts and nonexistent store availability.

### Product demonstrations — revised 11 August 2026 by user decision

The earlier blanket ban on any fabricated or mocked-up interface imagery was too strict as a design constraint and is replaced by the following. **Authored, clearly stylized product demonstrations are permitted**, provided every one of these holds:

- they are **not presented as literal screenshots** of the shipping app;
- they **depict only implemented capabilities** — nothing behind the `showPreReleaseSurfaces` gate, nothing planned or conceptual;
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

- Project-owned brand assets listed above.
- A source-verified feature inventory drawn from the mobile repository.
- Seven complete website UI dictionaries (104 keys each) and seven complete app ARB files.
- Prior architecture research in [docs/web/](docs/web/): platform spec, research sources, roadmap, and the W1/W2 implementation reports.

**Absent — future work must not fabricate any of it:**

- **No publishable app screenshots.** No current, privacy-safe, reviewed screenshots were found. Real captures remain the preferred material and should replace authored demonstrations as soon as they exist. What may stand in until then is governed by the product-demonstration rule under Capabilities and Constraints.
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
