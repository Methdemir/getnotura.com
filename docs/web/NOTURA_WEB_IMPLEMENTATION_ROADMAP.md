# Notura Web Implementation Roadmap

Status: ordered implementation plan derived from `NOTURA_GLOBAL_WEB_PLATFORM_SPEC.md`

Evidence date: 10 August 2026

## Operating rules

- Each phase ships only when its acceptance criteria pass.
- `main` remains deployable. Use short branches and reviewed pull requests.
- Current product truth comes from the mobile repository; planned features must be labeled or omitted.
- No phase may introduce tracking, a form processor, a CMS, user accounts, or a new external script merely for convenience.
- Privacy, health-content, accessibility, localization, and SEO are definition-of-done concerns, not a final polish pass.
- Legal text requires qualified review before publication; engineering may build templates and versioning without inventing legal conclusions.

## W0 — Architecture, evidence, and decisions

### Scope

- Approve the master specification, processor inventory, source register, and this roadmap.
- Confirm controller/company identity, launch markets, age approach, support contact, and product naming.
- Verify production Supabase/AI configuration out of band without recording secret values.
- Record the confirmed `eu-west-1` project region and the unpinned Edge Function state.
- Decide publication status for European Portuguese.
- Assign owners for translation, health review, legal review, and incident/rights requests.

### Dependencies

- Access to Supabase Dashboard/contracts and AI-provider organization settings.
- Product-owner decisions and legal counsel.

### Acceptance criteria

- No “Ireland-only processing” claim remains.
- Active AI provider, paid/unpaid status, endpoint, model, retention, and residency controls are recorded in a private compliance register.
- Backup/PITR and Supabase log/Storage facts are confirmed or explicitly marked unknown in launch copy.
- Launch locale list and content owners are signed off.

### Explicitly out of scope

- Website framework installation, page design, Edge region changes, app/backend changes, DNS changes, deployment.

## W1 — Technical foundation, i18n, and design tokens

### Scope

- Initialize Astro in static-output mode with TypeScript strictness and minimal dependencies.
- Add official GitHub Pages build/deploy workflow, CNAME preservation, and least-privilege permissions.
- Create layouts, metadata component, navigation shell, footer, skip link, locale selector, error page, and foundational styles.
- Implement explicit locale prefixes and language-neutral `/` entry.
- Add translation dictionaries, route mapping, `translationKey`, canonical/hreflang generation, and locale validation.
- Port canonical Notura colors, typography, spacing, logo/symbol assets, and accessible focus/motion tokens.
- Add CI: build, type/schema checks, internal links, `hreflang` reciprocity, missing translations, and basic accessibility/performance smoke checks.

### Dependencies

- W0 locale and brand decisions.
- Approved web exports of canonical brand assets.

### Acceptance criteria

- A static build succeeds for every enabled locale.
- No substantive page is served without an explicit locale prefix.
- Locale switching is keyboard/screen-reader usable and never auto-redirects by IP.
- Missing translations fail CI or remain unpublished; there is no silent fallback.
- Content pages ship with zero client JavaScript unless an exception is documented.
- Deployment artifact contains `CNAME`; a dry-run artifact is reviewed before changing Pages source.

### Explicitly out of scope

- Final homepage copy, legal text, article/recipe library, CMS, analytics, forms, app logins.

## W2 — Consumer homepage and core product pages

### Scope

- Build localized homepage, Product, How it works, Features overview, and truthful feature detail pages.
- Use current mobile capabilities and real reviewed screenshots.
- Define platform-availability component that cannot render fake store buttons.
- Add basic Organization/WebSite/Breadcrumb structured data where eligible.
- Establish image pipeline, social cards, favicon, manifest assets, and page budgets.

### Dependencies

- W1 foundation.
- Current mobile build/screenshots and product-copy approval.

### Acceptance criteria

- Every claim maps to current repository functionality or is clearly labeled planned.
- No iOS availability claim exists before an iOS release.
- AI-estimate limitations are visible near AI feature claims.
- Pages pass keyboard, contrast, zoom/reflow, reduced-motion, link, structured-data, and mobile performance checks.
- Old gallery page/photo are no longer in the generated artifact, while remaining recoverable from Git history.

### Explicitly out of scope

- Professionals dashboard, login, pricing, testimonials, newsletter, analytics, personalized recommendations.

## W3 — Legal center, support, account and data-rights surfaces

### Scope

- Build versioned legal-document layout and prior-version archive.
- Publish reviewed Privacy Notice, Terms, Health and AI Notice, Cookie/Storage Notice, and processor transparency page.
- Publish Support, Account deletion, Data rights, and Contact guidance.
- Generate factual processor details from the approved inventory where practical.
- Clearly separate website processing from mobile-app processing.
- Add jurisdiction supplements for actual launch markets.

### Dependencies

- W0 provider/configuration verification.
- Qualified legal review.
- A secure support channel.
- Mobile/backend account-deletion architecture; if implementation is incomplete, the web page may describe the current verified request route only and must not claim automatic deletion.

### Acceptance criteria

- Controller identity, purposes, categories, recipients, transfers, retention approach, rights, contact, and version dates are present where legally required.
- Google, Supabase, AI provider, Open Food Facts, GitHub hosting, and Cloudflare DNS roles match actual flows.
- Supabase services are regionally qualified rather than labeled universally Ireland-only.
- Account deletion text matches the real workflow and store listing URL.
- Legal translations are reviewed and their controlling/informational status is explicit.
- There is no banner unless non-essential storage/tracking actually requires one.

### Explicitly out of scope

- Implementing mobile account deletion, Apple login, provider-region pinning, cookie-consent platform, marketing email.

## W4 — SEO and content infrastructure

### Scope

- Add typed Article, Guide, Recipe, MealPlanExample, and Legal collections.
- Add sitemap index/locale sitemaps, RSS, robots rules, canonical/hreflang tests, breadcrumbs, related content, and redirect registry.
- Create author/reviewer/citation/date components and editorial workflow.
- Add schema generation with eligibility gates.
- Add content linting for missing sources, stale review dates, unsupported claims, alt text, and accidental drafts.

### Dependencies

- W1 routing and W3 legal/editorial standards.

### Acceptance criteria

- Schema-invalid content cannot build.
- Drafts, untranslated placeholders, and thin taxonomy pages cannot enter sitemaps.
- Every published health-influencing item has author, sources, review state, and dates.
- Reciprocal `hreflang` and self-canonicals validate for all equivalents.
- Structured data mirrors visible content and contains no invented rating, nutrition, author, or price.

### Explicitly out of scope

- Bulk content generation, faceted search, on-site search service, CMS, user comments.

## W5 — Initial articles, recipes, guides, and meal-plan examples

### Scope

- Publish a deliberately small, high-quality launch library.
- Prioritize product education, nutrition-estimate literacy, food logging, barcode limitations, privacy/AI explanations, and evergreen nutrition basics.
- Publish only recipes with tested instructions, licensed/owned imagery, and nutrition provenance.
- Label meal plans as general educational examples with audience, assumptions, exclusions, and review.
- Translate only after source content is stable and reviewed.

### Dependencies

- W4 content schemas and review workflow.
- Qualified reviewers and translation owners.

### Acceptance criteria

- No raw AI-generated page is published.
- Citations resolve and support the claims made.
- Recipe/meal-plan nutrition and allergens have visible provenance/limitations.
- No sensational, guaranteed, diagnostic, or individualized medical claim appears.
- Each locale has a coherent minimum library or remains unpublished for that collection.

### Explicitly out of scope

- Programmatic SEO, daily publishing quota, scraped recipes, community submissions, paid placements.

## W6 — Notura for Professionals marketing surface

### Scope

- Publish a modest Professionals overview describing the problem, intended future direction, and current availability.
- Explain the difference between consumer tracking, educational content, shared reports, and future professional workflows.
- Add an ethical contact route only if there is a real response process.
- Reserve future application/domain nomenclature without linking to a nonexistent login.

### Dependencies

- Product strategy, professional user research, and reviewed professional/health positioning.
- Real status of PDF reports, sharing, groups, and dietitian architecture.

### Acceptance criteria

- No fake portal, customer logo, certification, pricing, waitlist count, or clinical outcome claim.
- Current versus future capabilities are visually and textually unambiguous.
- Professional privacy/controller roles are not pre-decided in marketing copy.

### Explicitly out of scope

- Professional accounts, patient/client management, messaging, dashboards, billing, consent records, data sharing.

## W7 — Professional application integration, only when real

### Scope

- Perform a new architecture/security/privacy phase for the authenticated professional product.
- Decide subdomain, hosting, identity, authorization, tenancy, professional verification, controller/processor roles, consent, audit logs, data minimization, incident response, and contracts.
- Link the marketing page to a real application only after production readiness.

### Dependencies

- Implemented professional product, legal model, security review, data-sharing controls, and support operations.

### Acceptance criteria

- Threat model, DPIA/sensitive-data assessment, RLS/authorization tests, deletion/export, audit logging, and professional agreements pass review.
- Marketing/site sessions remain isolated from application sessions.
- No sensitive payload enters static-site logs, analytics, or URLs.

### Explicitly out of scope

- Reusing the marketing-site build as the professional app or exposing Supabase directly without the new review.

## W8 — Release audit and controlled launch

### Scope

- Full content, product-truth, legal, localization, SEO, accessibility, performance, security, dependency, and privacy audit.
- Validate DNS, TLS, Pages configuration, redirects, CNAME, sitemap indexing, Search Console, social previews, 404 behavior, and rollback.
- Re-run mobile processor scan and compare it with the published inventory.
- Confirm AI/Supabase/store policies have not changed.
- Establish post-launch monitoring without adding behavioral tracking.

### Dependencies

- All launch-scope phases and signed approvals.

### Acceptance criteria

- `astro build`, type/schema checks, link checks, locale/hreflang checks, accessibility testing, performance budgets, and dependency/security checks pass.
- Manual tests cover keyboard, screen reader, 200%/400% zoom, reduced motion, mobile browsers, language switching, and legal/support paths.
- Live DNS still matches the intended Cloudflare DNS-only/GitHub Pages topology or documentation has been updated for an approved change.
- Published processor inventory exactly matches code and production configuration.
- Rollback and incident contacts are documented.

### Explicitly out of scope

- Last-minute analytics, chat widgets, popups, CMS migration, unreviewed locale launch, or product claims added after sign-off.

## Cross-phase gates

### Privacy/data gate

Re-run on any new network SDK, external script, embedded media, API, CDN, form, analytics tool, or AI model. Record recipient, data, purpose, direction, personal/health classification, geography, retention, notice, contract, and transfer basis before merge.

### Localization gate

Every new page must declare locale, translation key, canonical, equivalents, and publication status. European Portuguese remains gated until runtime/product ownership is decided.

### Health-content gate

Claims require sources and reviewer status. “AI assisted” never substitutes for subject-matter review.

### Accessibility gate

Automated rules catch regressions; manual testing remains required for navigation, focus, semantics, reflow, and assistive technology.

### Dependency gate

New packages require a written reason, maintenance/license review, bundle/runtime impact, and privacy/network assessment.

## Recommended release sequence

The minimum credible public launch is W0 → W1 → W2 → W3 → W8, with a small portion of W4 if articles are included. W4–W5 can follow after the legal/support baseline. W6 should wait for validated professional positioning. W7 must wait for an actual professional application.
