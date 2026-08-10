# Notura Global Web Platform — Master Architecture Specification

Status: architecture approved for implementation planning; no website implementation is included in this document

Evidence date: 10 August 2026

Primary site: `https://getnotura.com`

Public-site repository: `Methdemir/getnotura.com`

Mobile source of truth: `DietProgram`

## 1. Executive decision

Notura should become a static, locale-prefixed global content platform built with Astro and deployed to GitHub Pages. It should remain separate from the authenticated mobile backend and from any future professional application. The first release should be small: product pages, support, a legal center, account-deletion guidance, and a carefully limited content foundation. The architecture reserves room for articles, recipes, guides, example meal plans, and Notura for Professionals without making those unfinished products look available.

The key decisions are:

- Use Astro in static-output mode, Markdown/MDX content collections, and a small number of typed data files. Astro is justified by the planned multilingual, schema-driven content platform; it would not be justified for a one-page landing site alone.
- Keep GitHub Pages and the custom domain. Use GitHub Actions only to build and deploy the generated static artifact.
- Use eight URL locale variants by design: `en`, `tr`, `de`, `es`, `fr`, `it`, `pt`, and `pt-br`. Do not auto-redirect by IP or browser language.
- Treat `/` as the language-neutral `x-default` entry and put substantive localized pages under explicit prefixes, including English.
- Keep the public website, mobile Supabase backend, and future professional application as distinct trust zones.
- Launch without advertising, behavioral analytics, newsletter tooling, a CMS, website user accounts, or non-essential cookies.
- Base every privacy statement on the processor inventory in section 8. Do not describe the Supabase Ireland project region as if all processing occurs only in Ireland.
- Do not advertise an iOS download until the iOS product exists. Before iOS submission, implement the login option required under the then-current App Store rules; under the current rule, use of Google Sign-In generally triggers the requirement for an equivalent privacy-preserving login option, ordinarily Sign in with Apple, unless an exception applies.

## 2. Evidence boundaries and confidence

### 2.1 Verified directly

- The website repository contains only `index.html`, `CNAME`, `README.md`, and `DSC05606.JPG`; there is no package manifest or GitHub Actions workflow.
- `CNAME` contains `getnotura.com`.
- The existing page is an unrelated experimental Turkish photo gallery and may be replaced during implementation.
- The website repository was on `main` at `d4ae422236db79b9d55428821e0719d15a90d57c`. A pre-existing modification to `.claude/settings.local.json` was not touched.
- Public DNS uses Cloudflare authoritative nameservers. The apex resolves directly to the four documented GitHub Pages IPv4 addresses; `www` is a CNAME to `methdemir.github.io`.
- The live response is served by GitHub/Fastly, not Cloudflare's HTTP proxy: `Server: GitHub.com`, `Via: varnish`, `X-Served-By: ...FRA`, and `x-github-edge-region: fra` were observed.
- The mobile app uses Supabase Auth, Google Sign-In, Supabase database APIs, private Supabase Storage, four Supabase Edge Functions, Open Food Facts, and a selectable server-side OpenAI/Gemini adapter.
- No production Sentry, Firebase Analytics, Crashlytics, advertising SDK, product-analytics SDK, email provider SDK, or generic telemetry exporter was found.
- The production Supabase project region is West EU (Ireland), `eu-west-1`, based on verified project context supplied by the project owner.
- No Edge Function invocation is region-pinned in the repository.

### 2.2 Not verifiable from the repository alone

- The remote Supabase secret value that selects the currently active AI provider and model.
- The Supabase subscription plan, active backup type, backup retention, and backup storage geography.
- Any OpenAI Zero Data Retention, Modified Abuse Monitoring, or data-residency entitlement.
- Whether a Gemini configuration, if used, is paid service or unpaid quota.
- Contract-specific retention or regional commitments not checked into the repository.
- The GitHub Pages dashboard publishing setting. The live output and repository history are consistent with branch-based Pages, but dashboard settings are not repository data.

These items are launch gates for legal copy. They must not be converted into confident claims.

## 3. Current product reality

### 3.1 Consumer product

The mobile app is an account-based nutrition tracker with:

- Google authentication backed by Supabase Auth;
- onboarding for gender, birth year, height, activity level, current weight, goal type, target weight, weekly pace, calorie/macronutrient/water targets, and unit/locale preferences;
- food logging through text, photos, manual entry, a bundled food catalog, favorites, and barcode lookup;
- AI food-text parsing, food-image analysis, meal evaluation, and menu suggestions;
- water and weight tracking;
- daily, weekly, and monthly progress views;
- private food-photo storage and cross-device sync;
- planned localized PDF progress reports;
- future groups/community, family sharing, coaching, dietitian, premium, and professional-web concepts that are not current launch claims.

Public copy must distinguish current, planned, and conceptual features. Screenshots and store links must reflect shipped functionality.

### 3.2 Current locale reality

The repository contains complete 607-key ARB files for:

| Artifact | Locale | Runtime status |
|---|---|---|
| `app_tr.arb` | Turkish (`tr`) | supported |
| `app_en.arb` | English (`en`) | supported |
| `app_es.arb` | Spanish (`es`) | supported |
| `app_pt_BR.arb` | Brazilian Portuguese (`pt-BR`) | supported |
| `app_de.arb` | German (`de`) | supported |
| `app_fr.arb` | French (`fr`) | supported |
| `app_it.arb` | Italian (`it`) | supported |
| `app_pt.arb` | European Portuguese (`pt`) | file exists, not runtime-supported |

`AppLocale.supported` and `AppLocale.codes` expose seven runtime choices. `AppLocale.normalize` maps every Portuguese input to `pt-BR`. The Edge Function language normalizer does the same. Therefore the eighth locale is not a released mobile locale even though its translation file exists.

The web architecture should reserve `/pt/` now, but that locale should remain unpublished or `noindex` until European Portuguese has product ownership, human linguistic QA, and matching support/legal content. `/pt-br/` must not silently stand in for `/pt/`.

### 3.3 Future mobile locale continuity

The mobile application and public website should share one locale vocabulary, while remaining separate products. This is a future product requirement; it is not implemented by this architecture phase.

On first application launch:

1. Read the operating-system/device locale.
2. If its normalized locale is in the current mobile runtime's supported set, use it automatically.
3. Otherwise use English.
4. Do not require a dedicated language-selection onboarding step before the user can continue.

The welcome/login surface should expose a clear but unobtrusive language selector before authentication. A pre-authentication manual choice is explicit user intent: persist it locally, use it across welcome/login and onboarding, and do not replace it merely because the device locale differs. The app must track whether the active local locale came from an automatic device/default resolution or an explicit user choice; the value alone is insufficient for safe reconciliation.

After authentication, reconcile the active local locale with the account's canonical `preferred_locale` as follows:

1. If the user explicitly chose a supported locale before authentication, keep it through the login transition and update `preferred_locale` to that choice after authentication. The deliberate current-session choice wins over an older account value.
2. Otherwise, if an existing account has a valid supported `preferred_locale`, use that account preference. Resolve it before rendering the authenticated shell so there is one controlled transition rather than a mid-screen language change.
3. If the account has no valid preference, keep the active supported local locale and write it to `preferred_locale`.
4. If the remote read/write is unavailable, retain the active local locale, continue without language flicker, and retry reconciliation later. A synchronization failure must not force a fallback or block use.
5. A later manual language change applies locally immediately and becomes the new canonical `preferred_locale` when synchronization succeeds.

This makes the account preference portable across devices while preserving the user's most recent deliberate choice. Unsupported or legacy remote values must never activate an unsupported locale: treat them as absent, keep a supported active local locale, and use English only when no supported local choice is available.

## 4. Product positioning

### 4.1 Consumer promise

Use a restrained promise: Notura helps people record food, understand nutrition estimates, and see patterns. It is not a medical device, diagnosis service, or substitute for a qualified clinician or dietitian.

Avoid:

- guaranteed weight-loss or health outcomes;
- invented user counts, testimonials, ratings, certifications, or clinical validation;
- implying that AI estimates are measurements;
- calling example meal plans personalized prescriptions;
- describing planned social, professional, premium, report, or iOS features as available.

### 4.2 Content platform

Content should answer real nutrition-tracking questions and explain Notura's methods. It should not become mass-produced SEO content. Every health-influencing page needs an owner, evidence standard, review status, and update date.

### 4.3 Notura for Professionals

Professionals are a separate audience and future product line. The public site may contain a truthful overview at `/[locale]/professionals/`, placed in the primary navigation as a low-emphasis item and in the footer. Do not create a fake login, dashboard, waitlist, or pricing page. Reserve `app.getnotura.com` or `pro.getnotura.com` for the future authenticated application only after its identity, security, and data-controller model is decided.

## 5. Information architecture

### 5.1 Public navigation

Recommended desktop navigation:

1. Product
2. How it works
3. Learn
4. For professionals
5. Support
6. Language selector

The primary call to action is a real store download only when the linked build exists. Until then use “See how Notura works” or a truthful availability message.

### 5.2 URL model

```text
/
  language-neutral x-default entry
/en/ | /tr/ | /de/ | /es/ | /fr/ | /it/ | /pt/ | /pt-br/
  product/
  how-it-works/
  features/
    food-photo-analysis/
    food-text-analysis/
    barcode-scanning/
    progress/
    reports/
  learn/
    articles/{slug}/
    recipes/{slug}/
    guides/{slug}/
    meal-plan-examples/{slug}/
  professionals/
  support/
    account-deletion/
    data-rights/
    contact/
  legal/
    privacy/
    terms/
    cookies/
    health-and-ai-notice/
    subprocessors/
```

Use translated slugs only if a durable redirect/alias registry is maintained. The leaner launch choice is stable ASCII slugs shared across locales, with localized page titles and breadcrumbs. Never infer locale from the URL and then overwrite it with browser language.

### 5.3 Footer

The footer should contain Product, Learn, Professionals, Support, Legal, language selection, company/controller identity, contact channel, and current platform availability. A cookie-settings link appears only when a consent mechanism actually exists.

### 5.4 Future application boundaries

- `getnotura.com`: static public marketing, content, support, and legal material.
- Supabase project: mobile application data plane.
- future `app.` or `pro.` subdomain: authenticated application with its own threat model, consent, session, and deployment architecture.
- Do not put Supabase service keys, authenticated APIs, account sessions, or user-generated nutrition data into the marketing-site build.

## 6. Internationalization architecture

### 6.1 Routing and discovery

- Prefix every substantive locale, including English.
- Use `/` as `x-default`; do not use JavaScript, IP geolocation, or mandatory browser-language redirection.
- Emit reciprocal `hreflang` links only for genuinely equivalent, published translations.
- Emit one self-canonical per locale page.
- Use locale-specific sitemaps plus a sitemap index when the content set grows.
- Set the HTML `lang` attribute and localized Open Graph metadata.
- Preserve user locale choice in first-party local storage only if needed; this preference is functional and should not trigger a tracking banner by itself.

Ordinary browser arrivals through search, social media, a typed URL, or an external link remain user-controlled. They must not be forcibly redirected solely from browser language, IP address, or geolocation. A future language suggestion may be dismissible and non-blocking, but it must preserve explicit URLs, canonicals, `hreflang`, and the user's selection.

### 6.2 Mobile app to website locale mapping

App-driven navigation is different from ordinary browser discovery: the app already knows the active locale and should open the matching explicit website URL directly.

The canonical mapping is:

| Mobile locale | Website prefix | Current status |
|---|---|---|
| `tr` | `/tr/` | active runtime mapping |
| `en` | `/en/` | active runtime mapping and fallback |
| `es` | `/es/` | active runtime mapping |
| `pt-BR` | `/pt-br/` | active runtime mapping |
| `de` | `/de/` | active runtime mapping |
| `fr` | `/fr/` | active runtime mapping |
| `it` | `/it/` | active runtime mapping |
| `pt` | `/pt/` | reserved; activate only when European Portuguese becomes a supported, QA-approved mobile runtime locale |

Privacy, terms, Health and AI Notice, account deletion, data rights, support, help/guides, and every other public Notura destination must use this mapping. For example, a Turkish app session opens `/tr/legal/privacy/`, German opens `/de/legal/privacy/`, and English opens `/en/legal/privacy/`.

A future centralized mobile web-link builder should own the locale mapping, base origin, normalized route identifiers, and safe URL composition. Flutter screens should request a semantic destination rather than hardcode localized origins or prefixes. The implementation may resemble a `NoturaWebLinks` service, but this specification does not freeze a Dart class or method signature. Unsupported/invalid locale input maps to English; callers must not substitute `/pt/` for `pt-BR` or advertise the reserved locale.

### 6.3 Content model

Keep interface strings and content separate:

```text
src/
  content.config.ts
  content/
    articles/{locale}/
    recipes/{locale}/
    guides/{locale}/
    meal-plans/{locale}/
  i18n/
    en.json
    tr.json
    de.json
    es.json
    fr.json
    it.json
    pt.json
    pt-br.json
    config.ts
    routes.ts
  data/
    legal-versions.ts
    redirects.ts
    jurisdictions.ts
```

Each content item has a stable cross-locale `translationKey`. A missing translation is absent, not silently replaced with another language. The locale switcher links to the equivalent page when available and otherwise to that locale's nearest section landing page with a clear explanation.

### 6.4 Translation workflow

1. English source draft for global content, except jurisdiction-specific legal source text.
2. Subject-matter and health-safety review.
3. Human translation or professional post-edit; machine translation alone is not publication approval.
4. Locale QA for terminology, number/date conventions, alt text, structured data, and links.
5. Legal review for each legally operative locale version.
6. Record `reviewedAt`, `reviewedBy`, and source revision.

Legal documents need version identifiers and a statement identifying the controlling version if the translations are informational. Do not publish a language selector option that leads mostly to fallback English pages.

## 7. Website technology architecture

### 7.1 Why Astro

Plain HTML would minimize dependencies for a single page, but the planned site needs eight locale trees, reusable metadata, schema validation, content collections, recipes, related content, sitemaps, and consistent legal/version blocks. Hand-maintaining that matrix in plain HTML would create duplication and drift. Astro materially improves this project by producing static HTML while giving the developer typed content collections and reusable layouts, with zero client JavaScript by default.

Do not use React, Vue, a component library, or a client-side router unless a specific interactive component earns the cost.

### 7.2 Proposed repository structure

```text
.github/workflows/deploy-pages.yml
public/
  CNAME
  favicon/
  images/
  fonts/
src/
  assets/
  components/
  content/
  data/
  i18n/
  layouts/
  pages/
  styles/
astro.config.mjs
package.json
package-lock.json
tsconfig.json
```

Retain the domain value from `CNAME`. Replace the unrelated gallery and photograph after preserving them in Git history; they do not belong in the production artifact.

### 7.3 Content collections

Required schemas:

- `article`: `translationKey`, locale, title, description, authors, reviewers, citations, published/updated/reviewed dates, tags, hero image, draft, medical-review flag.
- `recipe`: article fields plus ingredients, quantities, instructions, servings, prep/cook time, nutrition with provenance, dietary labels, allergens, and structured-data eligibility.
- `guide`: article fields plus guide type and scope.
- `mealPlanExample`: explicit `generalEducationalExample: true`, intended audience, assumptions, exclusions, and disclaimer.
- `legal`: jurisdiction, version, effective date, controller identity, translation status, and superseded version link.

Only emit schema.org/Google structured data when visible page content satisfies all required properties. Never generate invented reviews, ratings, nutrition, authors, or prices.

### 7.4 Build and deployment

- Pin the package manager and commit the lock file.
- On pull requests run install, type check, static build, internal-link validation, locale-key validation, content-schema validation, and a small accessibility/performance smoke suite.
- On `main`, GitHub Actions builds the Astro static output and deploys through the official GitHub Pages artifact/actions flow.
- Use least-privilege workflow permissions, pinned major or commit action versions, dependency review, and Dependabot/Renovate with human review.
- The deployment must preserve `CNAME` in the generated output.
- Do not deploy previews that expose draft legal or health content to indexing; use local/CI artifacts until a preview-hosting decision is made.

### 7.5 Assets and images

Use the existing Notura identity: deep green `#2F5E3E`, dark green `#1E4A2E`, warm surface `#F7F1E6`, pale green `#B7D8BE`, dark text `#1B241E`, and Plus Jakarta Sans. Re-export web-appropriate SVG or optimized raster assets from canonical sources; do not upscale the app PNGs or invent a separate logo.

Store owned images in the repository at first. Generate responsive AVIF/WebP plus an accessible fallback, explicit dimensions, and meaningful alt text. Recipe photography must represent the actual recipe. Do not hotlink third-party images.

## 8. Data flow and processor inventory

### 8.1 Classification principles

Nutrition, food logs, body measurements, goals, and meal photos are health-adjacent and may become health data or sensitive consumer-health data depending on context and jurisdiction. Calling them “not medical” does not remove privacy obligations. Network metadata such as IP addresses may be personal data, but ordinary delivery logs should not be described as product-level tracking.

“Personal data sent” below means data can identify or be linked to a person; it does not mean every request contains a name or email.

### 8.2 Inventory

| Service/provider | Purpose and direction | Data sent | Personal / health-adjacent | Region and retention evidence | Privacy notice / transfer |
|---|---|---|---|---|---|
| GitHub Pages and GitHub's delivery subprocessors (observed Fastly) | Website visitor → hosting/CDN | IP, device/browser and request metadata, requested URL, time, referrer where supplied; public page response | Network personal data; ordinarily no account or app nutrition record. A requested article URL can reveal topic interest. | Live edge observed in Frankfurt; persistent hosting/log geography and retention are not project-configured. GitHub's current privacy statement describes service and website usage logging. | Include as website hosting. International-transfer analysis applies because delivery and GitHub processing are global. |
| Cloudflare authoritative DNS | Resolver/visitor DNS path → Cloudflare DNS | Domain query and DNS/operational metadata; no page body, login, or mobile-app payload in the verified DNS-only configuration | Potential network metadata; no nutrition record | Cloudflare is authoritative DNS, but A/CNAME traffic is DNS-only. HTTP requests do not traverse Cloudflare today. Retention is not evidenced by the repository. | Mention accurately as DNS provider; do not claim Cloudflare web analytics/WAF/CDN. Reassess if proxy status changes. |
| Supabase Postgres/API | Mobile client and Edge → Supabase | Auth-linked profile, gender, birth year, height, activity, weights, goals, water, food names/quantities/macros/times, favorites, barcode provenance, preferences, AI usage and request records | Personal and health-adjacent; body measurements and nutrition patterns may be sensitive | Project owner verifies primary region `eu-west-1`. Supabase says the chosen primary region determines primary project-data location. Application rows persist until user deletion/retention policy; exact production policy remains to be set. | Core processor; Privacy Notice and DPA required. Transfer analysis still required for platform/subprocessors and non-EEA users. |
| Supabase Auth | Mobile client → Supabase Auth; Supabase validates Google tokens | Email, provider identity, provider tokens during sign-in, UUID, session/security metadata | Personal identity data, not inherently health data; it links to health-adjacent account records | Auth user records are in the project's `auth` schema in the regional Postgres project; service/front-door/security processing is not proven Ireland-only. | Core identity processor; describe by role and link provider notices rather than copying them. |
| Google Sign-In / Google Identity | Mobile client → Google; token then mobile client → Supabase | Requested scopes are `email` and `profile`; account choice, authentication/security metadata, ID token and OAuth access token | Personal identity data; no nutrition data is intentionally sent | Google regional processing and retention depend on its service terms/account. No project-specific regional control is evidenced. | Required in Privacy Notice and Google OAuth disclosures; international-transfer consideration. |
| Supabase Storage and delivery/CDN | Mobile client → private `food-images` bucket; signed URL delivery back to client | User meal photos, MIME type, object path containing user UUID, authorization/request metadata | Personal and potentially health-adjacent; photos may contain people, homes, location clues, or medical context | Project bucket is private and associated with the Ireland project; the repository does not independently prove all object replicas, CDN edge processing, or backups remain only in Ireland. Signed URLs last one hour; client cache is 55 minutes. Object retention follows account/entry deletion logic, which is incomplete. | Core processor and explicit Privacy Notice category. Transfer assessment must cover CDN/platform processing. |
| Supabase Edge Functions | Mobile client → Supabase Edge → database/AI provider | JWT, request ID, locale, and operation payload. Logs intentionally contain operation, request ID, locale, phase/status/error only. | Personal via authenticated context; AI payloads are health-adjacent | **Not pinned.** Current calls provide no `region` option or `x-region`; Supabase defaults to the closest execution region. Edge/log retention is not established by repo. | Explicitly disclose processing and AI relay. Ireland database region does not make Edge execution Ireland-only. |
| OpenAI API, code-default AI adapter; actual production selection unverified | Supabase Edge → OpenAI `/v1/chat/completions` | Food text; meal photo as base64; menu context (remaining macros and recent foods); meal evaluation details, totals, goals, components, locale; prompts and generated response. No internal user UUID/email is intentionally included. | Health-adjacent; may be personal if user text/photo contains identifying data | Default endpoint is not regional. Current OpenAI API docs state content is not used to train by default and abuse-monitoring logs are retained up to 30 days by default; ZDR/data residency require eligible configuration. No such production control is evidenced. | Include if production secret confirms OpenAI. International-transfer and vendor-retention review required. |
| Google Gemini API, supported alternative; actual production selection unverified | Supabase Edge → Gemini | Same four AI-operation categories as above | Same as OpenAI | Repo supports Gemini but does not prove it is active or paid. Google's current terms distinguish unpaid service (inputs/outputs may be used to improve products and human-reviewed; sensitive data should not be submitted) from paid service (not used to improve products, limited safety logging, possible global storage/cache). | Do not list Gemini as an active processor until configuration is confirmed; prohibit unpaid quota for EEA/UK user-facing production and sensitive/health-adjacent data. |
| Open Food Facts API | Mobile client → `world.openfoodfacts.org` | Scanned barcode in URL, requested fields, Notura user agent, IP/TLS/request metadata; no Notura account token | IP is personal data; barcode/product interest is nutrition-adjacent but usually not identity data by itself | Open Food Facts identifies a French association. Its current notice states visit IP/log data may be retained three years. Exact infrastructure region is not reliably established here. | Include in Privacy Notice because the call is direct from device and discloses IP plus product code. Transfer analysis applies. |
| Open Food Facts/product image host | Mobile client → HTTPS host supplied in product response | IP/request headers and image URL | Network personal data plus product interest | Mapper accepts any nonempty HTTPS host, not an Open Food Facts allowlist. Host region/retention may therefore vary. | Disclose product-image loading; create a future allowlist/proxy decision before release. Do not overstate current provider identity. |
| Google ML Kit barcode library via `mobile_scanner` | On-device camera frame → bundled Android model | Camera frames remain in the app process for barcode recognition under current build configuration | Can be sensitive visually, but no runtime provider request is evidenced | Plugin defaults to bundled `com.google.mlkit:barcode-scanning`; the unbundled Play Services model is used only if a Gradle property is enabled, which this repo does not set. | State that scanning is on-device. Google is a library supplier here, not a recipient of scan images on the evidenced path. Re-audit build flags each release. |
| Operating-system speech recognition via `speech_to_text` | Potential app → OS speech service | Would include microphone audio/transcript if used | Potential personal and health-adjacent | Dependency is installed and microphone permission exists, but no `lib/` import/use was found. No active data flow. | Not a current processor flow. Remove unused permission/dependency or audit/disclose before activation. |
| `share_plus` and external `url_launcher` | User-directed handoff to another installed app/browser | Content or URL explicitly shared/opened by the user | Depends on user action | `share_plus` is not used in current `lib/`; legal URLs open in the user's external browser. | No automatic third-party transfer by Notura. Explain user-directed sharing when implemented. |
| Crash reporting, product analytics, ads, email delivery | None found | None | None | No active SDK/provider evidenced | State “not currently used”; do not invent processors. Re-run inventory on every release. |

### 8.3 AI operation detail

The four authenticated operations are:

1. `parse-food-text`: request ID, raw user food text, locale.
2. `analyze-food-image`: request ID, base64 image, MIME type, locale.
3. `suggest-menu`: request ID, meal label, remaining calories/protein/carbs/fat, recent food names, nutrition-completeness state, locale.
4. `evaluate-food-entry`: meal name/label/time text, quantities, calories/macros, components, daily targets, earlier daily totals, goal type, quality/completeness, locale.

The Edge layer hashes a stable fingerprint and stores the AI response plus provider/model/usage metadata in `ai_requests`. The intended expiry is 30 minutes, but deletion is opportunistic: `cleanupExpired(userId)` runs on a later request. Expired rows may remain physically present beyond 30 minutes until cleanup occurs. This is not a hard 30-minute deletion guarantee and should be fixed or described accurately before launch.

Edge logs avoid prompt, response, user ID, and image content, but include request ID and locale. The image fingerprint uses a hash input derived from metadata and the first 64 bytes; only the resulting hash is stored. The raw image is sent onward to the AI provider and is not stored in `ai_requests`. A separate saved meal photo can later be uploaded to Supabase Storage.

### 8.4 Long-term AI-provider independence

Notura's product architecture must not permanently depend on one AI provider. OpenAI is currently believed/expected to be the production provider, subject to the existing launch gate that verifies remote configuration. The repository also contains a Gemini adapter, but Gemini is not an active processor claim unless production configuration proves it.

For the foreseeable implementation, do not replace or refactor a working OpenAI integration merely to create theoretical abstraction. Preserve the existing practical boundary instead:

- product/domain request and response contracts remain provider-neutral;
- provider-specific authentication, endpoints, request shapes, response normalization, retry behavior, retention/residency capabilities, and safety controls remain inside server-side adapters;
- the mobile client invokes Notura operations, not provider brands or provider APIs;
- provider selection and credentials remain server-side configuration;
- the processor inventory and private compliance register identify the provider actually active in production.

This boundary must allow a future evidence-based move to OpenAI, another hosted commercial provider, an EU-hosted commercial model, or a privately/self-hosted Notura model when quality, cost, privacy, regulation, latency, infrastructure economics, or available capital justify it. A self-hosted model is an architectural escape hatch, not a current roadmap commitment. It does not authorize model training, GPU deployment, provider migration, Edge changes, or production refactoring in W0.

Any future provider change is a product, security, privacy, legal, and operational change—not merely a configuration toggle. It requires contract/quality evaluation, data-flow and retention/residency verification, processor-inventory update, legal-copy update, migration/rollback planning, and release validation before traffic moves.

### 8.5 Supabase regional analysis

| Layer | Residency finding |
|---|---|
| Primary Postgres database | Verified project region: West EU (Ireland), `eu-west-1`. This is the primary persistent application database location. |
| Auth records | Persistent Supabase Auth records live in the regional project's `auth` schema. Authentication request handling, security telemetry, support, and subprocessors are not thereby proven Ireland-only. |
| Storage | Private bucket and metadata belong to the project; bucket metadata is in Postgres. The repository does not prove every object replica, delivery cache, log, or backup is restricted to Ireland. Obtain contractual confirmation before making an “EU-only storage” claim. |
| Database backups | Supabase documents plan-dependent daily backup/PITR behavior, but the project plan, enabled mode, actual retention, and geographic backup location are not evidenced. Confirm in Dashboard/DPA and include restoration/backups in deletion wording. |
| Edge Functions | Global regional service. Current mobile invocation has no explicit region and defaults to the region closest to the caller. AI functions therefore may run outside Ireland. |
| Platform/subprocessors | Supabase's DPA permits processing where Supabase or authorized subprocessors maintain facilities, subject to transfer safeguards. The primary region is not an exclusivity promise for all operational processing. |

No Edge configuration is changed in this phase. A later engineering decision may pin database-intensive and AI functions to `eu-west-1`, but it must assess latency, outage behavior, transfer effects, and whether the AI provider itself has compatible regional processing.

### 8.6 Authentication and future Apple platforms

Current flow:

```text
user → Google Sign-In (email/profile scopes)
     → Google ID/access tokens
     → Supabase Auth signInWithIdToken
     → Supabase session and app UUID
```

The legal design should identify Notura's purposes and data categories, name Google and Supabase by role, and link to their current notices. It should not paste or attempt to restate their entire privacy policies.

Before iOS distribution:

- re-check App Store Review Guideline 4.8 on the submission date;
- if applicable, implement Sign in with Apple or the then-required equivalent option with data-minimizing behavior;
- support Apple's private relay email and account-linking edge cases;
- ensure account deletion works regardless of identity provider;
- document token revocation/disconnection and reauthentication;
- update the processor inventory and App Privacy disclosure.

Do not implement Apple authentication now.

## 9. Global legal and privacy architecture

This is architecture, not jurisdiction-specific legal advice. Obtain qualified review before launch.

### 9.1 Document set

- Global Privacy Notice with jurisdictional supplements, not eight independently drifting policies.
- Terms of Use.
- Health and AI Notice/disclaimer.
- Cookie/Local Storage Notice, initially short because only essential storage is planned.
- Processor/subprocessor transparency page generated from a maintained inventory.
- Account deletion and data-rights pages.
- Content/editorial policy.
- Professional terms/DPA only when the professional product and roles exist.

Each document needs controller identity, contact, version, effective date, language status, prior-version archive, and scope (website, mobile app, or both).

Legal information must be provider-factual rather than provider-hardcoded. The Privacy Notice and processor page name the AI provider actually active at publication time, with its verified purpose, data categories, retention, residency, contractual role, and transfer position. Provider entries should be maintainable records derived from the processor inventory so a future migration changes the factual provider record and reviewed legal copy without redesigning the legal-center information architecture. This maintainability does not weaken the launch gate: unknown production configuration may not be converted into a generic or conditional disclosure.

### 9.2 Jurisdiction layers

- Türkiye: KVKK notice obligations, lawful bases/explicit consent where required, data-subject application channel, retention/deletion policy, and current cross-border transfer mechanism analysis.
- EU/EEA: GDPR transparency, lawful basis per purpose, special-category assessment, DPIA screening, processor contracts, transfer mechanisms, retention, rights, and supervisory-authority information.
- United Kingdom: UK GDPR/Data Protection Act 2018 plus PECR for non-essential storage/communications; UK transfer mechanism analysis.
- United States: FTC deception/unfairness and Health Breach Notification Rule screening; state consumer privacy and consumer-health laws, especially Washington My Health My Data, plus age/children analysis. Do not assume HIPAA applies merely because nutrition data is health-adjacent.
- Brazil: LGPD legal bases, transparency, data-subject rights, security/incident duties, DPO/contact requirements as applicable, and international-transfer rules.

Use jurisdictional supplements only for real differences. Keep the factual data-flow core shared.

### 9.3 Lawful-purpose mapping

Before legal drafting, maintain a record with: purpose, data category, source, recipients, legal basis by jurisdiction, retention trigger, deletion method, security control, and owner. Separate service delivery, account security, AI features, optional communications, legal compliance, and future analytics. Consent is not a universal fallback.

### 9.4 Health and AI safety

- Explain that estimates can be incomplete or wrong.
- Clearly distinguish measured/user-entered, catalog-sourced, and AI-estimated nutrition.
- Do not infer disease, diagnosis, pregnancy, medication, eating disorders, or medical treatment unless a separately reviewed product purpose requires it.
- Do not send free-form data to AI providers beyond the named feature's need.
- Give users a meaningful choice before sending a meal photo or text for AI analysis.
- Keep human editorial review for health-influencing website content; do not publish raw generated content.

## 10. Account deletion and data rights

The mobile repository has logout and per-record deletion but no end-to-end account deletion. This is a release blocker.

The future deletion workflow must:

1. authenticate and, where appropriate, reauthenticate the user;
2. stop new sync/AI operations and create an idempotent deletion job;
3. enumerate and delete private Storage objects before deleting the Auth principal;
4. delete or cascade profiles, nutrition goals, food entries, favorites, water, weight, AI requests, quotas/reservations, entitlements, and future group/professional records;
5. revoke/expire sessions and disconnect identity-provider access where required;
6. clear local database, image files, signed-URL cache, and preferences on each device when it next connects;
7. handle partial failure with retry/resume and an auditable status that does not log sensitive content;
8. communicate backup and legal-hold residual retention accurately;
9. provide in-app initiation and the public web deletion URL required for store listing/discovery;
10. prevent the public website from asking for passwords, tokens, meal logs, or identity documents in ordinary contact forms.

The website page should explain the route, authentication requirement, categories removed, categories temporarily retained, expected timing, and support escalation. It should not pretend to execute deletion until a secure backend flow exists.

## 11. Cookies, analytics, and tracking

Launch with no advertising, remarketing pixels, session replay, third-party embeds, or non-essential analytics. GitHub/Fastly hosting logs and Cloudflare DNS operations still occur; describe them as infrastructure processing.

Essential locale preference, security, or accessibility settings may use first-party storage. Maintain a machine-readable inventory of cookies/local storage even if the list is empty. Do not show a complex cookie banner merely to look compliant.

If measurement becomes necessary, write the decision first: exact questions, events, fields, retention, IP handling, geography, lawful basis/consent, vendor, and deletion. Prefer privacy-minimizing aggregate measurement. Do not deploy Google Analytics or similar merely because it is familiar.

## 12. SEO and content architecture

### 12.1 Technical SEO

- Static semantic HTML, one meaningful `h1`, descriptive titles and metadata.
- Reciprocal `hreflang`, `x-default`, and self-canonicals.
- Generated XML sitemaps, robots policy, RSS for editorial content, and valid 404 page.
- Organization/WebSite/Breadcrumb schema where supported; Article, Recipe, and SoftwareApplication only when eligibility is met.
- Stable URLs; redirect registry for every renamed published path.
- No indexed placeholder, untranslated, thin, filter, search, tag, or fake-store page.
- Search Console/Bing Webmaster setup can occur without adding page trackers.

### 12.2 Editorial quality

Every health-influencing item records author, qualified reviewer when needed, citations, published/updated/reviewed dates, claims review, and revision history. Sources should prioritize primary research, public-health authorities, and recognized professional bodies. Avoid sensational headlines and unsupported before/after or weight-loss claims.

AI may assist outlining, translation drafts, metadata, and consistency checks, but a named human remains accountable. AI-generated citations must be verified against the source. Content cannot be bulk-published from prompts.

### 12.3 Recipes

Recipe schema should support name, introduction, owned/licensed photo, ingredients and quantities, instructions, servings, prep/cook time, calories/macros/fiber where supported, dietary labels, allergens, citations/provenance, reviewer, and structured-data eligibility. Nutrition calculations must state source and method; unknown values remain unknown.

### 12.4 Meal-plan examples

Use “general educational meal-plan example,” never “personalized plan” or “prescription,” unless a qualified professional service actually produces it. State assumptions, intended audience, exclusions, flexibility, and that individual needs vary. High-risk populations require explicit exclusions or professional review.

## 13. Design direction

Use the existing leaf/drop/network symbol, deep greens, warm cream surfaces, and Plus Jakarta Sans. The tone should be calm, premium, approachable, modern, and non-clinical.

- Lead with product utility and honest screenshots, not a generic AI gradient.
- Use generous whitespace, short measure, strong heading hierarchy, and restrained cards.
- Show real app screens in accessible device frames only after UI/copy matches the current build.
- Prefer food photography that is natural and culturally varied; avoid medical stock imagery and transformation imagery.
- Use botanical/ingredient illustration sparingly and consistently with the existing mark.
- Motion should be optional, purposeful, and disabled under `prefers-reduced-motion`.
- Design mobile-first, then expand content grids; never hide substantive content on mobile.

The old gallery design and photograph are not Notura brand references.

## 14. Accessibility standard

Target WCAG 2.2 AA.

- Full keyboard access, visible focus, skip link, logical focus order, and no keyboard traps.
- Semantic landmarks/headings; labels and instructions not dependent on placeholder text.
- AA color contrast, including states and text over imagery.
- Touch targets consistent with WCAG 2.2 Target Size guidance.
- Reduced-motion support and no essential information conveyed by animation alone.
- Useful alt text; decorative assets hidden from assistive technology.
- Correct page `lang`; mark language changes inside content.
- Accessible locale selector showing language names in their own language and current selection.
- Error summaries and field-level errors if forms are later added.
- Automated checks plus keyboard and screen-reader manual tests before launch.

## 15. Performance and security

Launch budgets:

- initial HTML + critical CSS compressed under roughly 100 KB for ordinary marketing pages;
- client JavaScript under 40 KB compressed, with a target of zero for content pages;
- responsive image budget under roughly 250 KB above the fold on common mobile viewports;
- self-host only required font subsets, use `font-display: swap`, and avoid excessive weights;
- Lighthouse performance/accessibility/SEO targets of 95+ as regression signals, not substitutes for manual QA.

Security:

- HTTPS only and GitHub Pages HTTPS enforcement.
- No secrets in repository, build logs, page source, or client bundles.
- No inline third-party scripts or remote fonts.
- GitHub Pages does not provide general application-server header control. Use a conservative meta CSP if useful, understanding it cannot provide every HTTP-header feature. Reconsider hosting if strict headers, server redirects, preview authentication, or dynamic security controls become requirements.
- Pin dependencies and actions, review lockfile changes, enable automated vulnerability alerts, and minimize packages.
- Sanitize/escape Markdown/MDX inputs; do not allow arbitrary author HTML by default.
- Keep DNS registrar and GitHub accounts protected with MFA, minimal maintainers, and recovery documentation.

## 16. CMS decision

Use Git-managed Markdown/MDX now. It is low-cost, reviewable, versioned, localizable, and appropriate for one developer and a small editorial team.

Consider a headless CMS only when non-technical editors publish frequently, approval scheduling becomes a bottleneck, or repository access is inappropriate. A CMS migration should preserve the content schema, translation keys, stable IDs, URLs, and Git export. Do not build a custom content backend unless professional/user-generated workflows create requirements a content repository and established CMS cannot meet.

## 17. Explicitly deferred or prohibited

- No website implementation in this phase.
- No fake store buttons, professional login, dashboard, pricing, testimonials, ratings, medical claims, or user counts.
- No website account system or direct access to the mobile Supabase project.
- No CMS, newsletter, marketing automation, chatbot, ad platform, session replay, or analytics stack without an approved purpose.
- No cookie banner before non-essential tracking exists.
- No indexed placeholder/empty locale pages.
- No unreviewed AI-generated nutrition content.
- No Cloudflare proxy/WAF/CDN claim or configuration change; current state is DNS-only.
- No Edge Function regional change in this phase.
- No Apple authentication implementation in this phase.

## 18. Launch gates and unresolved decisions

1. Confirm the remote `AI_PROVIDER`, model names, base URL, paid-plan status, retention controls, and data-residency settings without exposing secrets.
2. Confirm Supabase plan, backups/PITR, backup retention/location, Storage replication/CDN behavior, Edge/log retention, DPA, and current subprocessors.
3. Decide whether to pin Edge Functions to `eu-west-1` in a separate engineering/privacy decision.
4. Complete secure account deletion and export in the app/backend before store launch or claiming self-service rights execution.
5. Decide company/controller legal identity, contact, establishment, markets at launch, age floor, and children strategy.
6. Complete DPIA/sensitive-consumer-health assessment and transfer-impact work for the selected markets/providers.
7. Decide whether European Portuguese will become a real eighth runtime locale; until then do not advertise eight supported app languages.
8. Establish human translation and legal-review ownership for each published locale.
9. Decide the initial content count and qualified reviewer availability.
10. Review Open Food Facts product-image host allowlisting or proxying; current arbitrary HTTPS acceptance creates variable recipients.
11. Confirm App Store login and deletion rules again when iOS work begins.
12. Decide whether strict security headers or server-side redirects eventually justify moving away from GitHub Pages.
13. Implement and test the future mobile locale-origin tracking, `preferred_locale` reconciliation, and centralized locale-aware web-link builder before relying on app-to-site locale continuity.

## 19. Acceptance criteria for this architecture phase

- The three architecture documents exist and agree on stack, routing, locale status, legal boundaries, phases, and processors.
- All external-service claims are either repository-verified, live-infrastructure-verified, owner-verified, or explicitly unresolved.
- Supabase database, Auth, Storage, backups, Edge, and platform processing are not collapsed into one residency claim.
- The inventory distinguishes active recipients, installed-but-unused capabilities, and on-device processing.
- The future mobile locale precedence, account reconciliation, app-to-web mapping, browser-routing distinction, and reserved European Portuguese status are explicit.
- AI-provider independence preserves the current working path while keeping provider disclosure factual and migration possible without redesigning product/legal boundaries.
- No production website or mobile source is changed, nothing is deployed, and no DNS/Cloudflare/Edge configuration is changed.
