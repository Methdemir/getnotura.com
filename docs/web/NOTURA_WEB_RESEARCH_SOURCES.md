# Notura Web Research Sources

Source register for `NOTURA_GLOBAL_WEB_PLATFORM_SPEC.md`

Reviewed: 10 August 2026

## 1. Method and authority

This register prefers statutes, regulators, standards bodies, platform policies, and official product documentation. It is an architecture research record, not legal advice. Laws, store rules, provider terms, subprocessors, product behavior, and URLs change; re-check all launch-critical sources on the publication and store-submission dates.

Repository and live-configuration evidence outranks generic provider documentation for what Notura actually does. Provider documentation explains the service's possible/default behavior but does not prove Notura's remote plan or contract settings.

## 2. Repository and live evidence

### Public website repository

- `CNAME`: custom domain is `getnotura.com`.
- `index.html`: unrelated experimental static gallery, inline CSS/JS, no trackers or external scripts.
- `README.md`: describes branch-based GitHub Pages use.
- No `.github/workflows`, `package.json`, framework config, analytics tag, form integration, or CMS config was present.
- Git evidence at audit start: `main`, `d4ae422236db79b9d55428821e0719d15a90d57c`; `.claude/settings.local.json` was already modified and was not touched.

### Live website/DNS evidence

Observed 10 August 2026:

- Apex A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- `www.getnotura.com` CNAME: `methdemir.github.io`.
- Authoritative NS: `ara.ns.cloudflare.com`, `etienne.ns.cloudflare.com`.
- HTTPS response: `Server: GitHub.com`, `Via: 1.1 varnish`, GitHub/Fastly request/cache headers, edge observed in Frankfurt.
- `/cdn-cgi/trace` returned the GitHub Pages 404 document, not a Cloudflare trace response.

Conclusion: Cloudflare is authoritative DNS, while the verified A/CNAME web traffic is DNS-only/direct to GitHub Pages. This can change through DNS configuration and must be rechecked before publication.

### Mobile/backend evidence

Key source files:

- `pubspec.yaml`: direct Flutter dependencies; no crash/analytics/ad/email SDK.
- `lib/main.dart`, `lib/core/config/app_config.dart`: Supabase and Google Sign-In initialization.
- `lib/features/auth/auth_repository.dart`: Google `email`/`profile` scopes and Supabase ID-token sign-in.
- `lib/core/localization/app_locale.dart`, `l10n.yaml`, `lib/l10n/app_*.arb`: actual locale/runtime discrepancy.
- `lib/features/food_ai/edge_food_ai_gateway.dart`, `lib/features/food_ai/food_ai_contracts.dart`: unpinned Edge invocation and payloads.
- `supabase/config.toml`: four JWT-verified functions, no function region setting.
- `supabase/functions/_shared/provider.ts`: OpenAI and Gemini adapters/endpoints.
- `supabase/functions/_shared/operation-handler.ts`, `ai-request-store.ts`, `logging.ts`: authentication, quota, response cache, intended expiry, and minimized logs.
- `lib/features/barcode/data/open_food_facts_lookup_gateway.dart`, `open_food_facts_mapper.dart`: direct API requests and arbitrary HTTPS product-image host acceptance.
- `lib/features/food_sync/food_image_storage_gateway.dart`: private bucket, path, file limit, signed URL lifetime.
- `supabase/migrations/20260729000000_remote_exact_baseline.sql`: application tables, RLS, private Storage bucket, and cascade relationships.
- `docs/release_readiness/08_security_and_data_lifecycle.md`, `10_release_blockers.md`: account-deletion gap.
- Locally cached `mobile_scanner-7.4.0/android/build.gradle`: bundled ML Kit is default; downloadable Play Services model requires an explicit Gradle property not present in the app.

Owner-verified context: production Supabase primary region is West EU (Ireland), `eu-west-1`.

## 3. Hosting, DNS, and static architecture

### GitHub Pages

- [What is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) — official static-hosting scope and publication model.
- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages) — domain and DNS architecture.
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) — HTTPS configuration.
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — branch and Actions publication models.
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) — official Pages artifact/action deployment.
- [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) — current statement describes IP, device/session/request details, referrers/pages/links, service usage, cookies, subprocessors, retention, and international transfers.
- [GitHub subprocessors](https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors) — verify delivery/hosting vendors at launch.

### Cloudflare

- [Cloudflare DNS proxy status](https://developers.cloudflare.com/dns/proxy-status/) — official distinction: proxied records route HTTP/S through Cloudflare; DNS-only records return the origin address and do not route HTTP/S through Cloudflare.
- [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) — provider-level processing; apply only to services actually used.

### Astro

- [Deploy Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) — static build and Pages workflow.
- [Astro internationalization routing](https://docs.astro.build/en/guides/internationalization/) — locale path/routing features.
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/) — typed Markdown/MDX schemas and content loading.
- [Astro images](https://docs.astro.build/en/guides/images/) — responsive optimization and local/remote image behavior.

Astro documentation is implementation guidance, not independent proof that Astro is the right choice. The recommendation comes from comparing Notura's content/locale requirements against plain HTML maintenance cost.

## 4. International SEO and structured data

### Google Search Central

- [Localized versions of pages](https://developers.google.com/search/docs/specialty/international/localized-versions) — reciprocal `hreflang`, locale/region codes, and `x-default`.
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — explicit locale URLs and language targeting.
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — sitemap requirements.
- [Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — canonicalization.
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) — eligible article properties.
- [Recipe structured data](https://developers.google.com/search/docs/appearance/structured-data/recipe) — visible recipe content and rich-result requirements.
- [Software app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app) — app markup eligibility.
- [General structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — markup must represent visible content and not mislead.
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) — scaled/low-value content and deceptive practices.

### Schema vocabulary

- [Schema.org Article](https://schema.org/Article)
- [Schema.org Recipe](https://schema.org/Recipe)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Schema.org Organization](https://schema.org/Organization)

Schema.org defines vocabulary; search-engine eligibility still follows each search platform's current rules.

## 5. Store authentication and account deletion

### Google Play

- [Google Play account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111) — apps enabling account creation must provide in-app and web deletion routes under the policy's conditions.
- [Google Play User Data policy / Data safety](https://support.google.com/googleplay/android-developer/answer/10144311) — user-data handling and disclosure requirements.
- [Data safety form guidance](https://support.google.com/googleplay/android-developer/answer/10787469) — declarations must include app and SDK behavior.

### Apple

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — review at submission. Current guideline 4.8 says apps using third-party/social login for the primary account must also offer an equivalent option with specified privacy features, subject to listed exceptions.
- [Offering account deletion in your app](https://developer.apple.com/support/offering-account-deletion-in-your-app/) — in-app deletion expectations.
- [Sign in with Apple design guidance](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple) — implementation/design guidance when applicable.
- [App privacy details](https://developer.apple.com/app-store/app-privacy-details/) — store disclosure categories and third-party SDK responsibility.

Architecture rule: re-check then-current requirements when iOS work begins; do not encode “Sign in with Apple forever” as a static legal assertion.

## 6. Supabase, identity, AI, and barcode providers

### Supabase

- [Available regions](https://supabase.com/docs/guides/platform/regions) — one primary project region and primary-project-data residency; specifically lists West EU (Ireland) as `eu-west-1` and warns region selection is not proof of compliance.
- [Edge Function regional invocation](https://supabase.com/docs/guides/functions/regional-invocation) — default execution closest to caller; optional client `region`/`x-region`; explicitly pinned requests are not automatically rerouted during regional outages.
- [Database backups](https://supabase.com/docs/guides/platform/backups) — plan-dependent daily backups, PITR, retention windows, and deletion statements. It does not by itself verify this project's plan or backup geography.
- [Supabase Privacy Policy](https://supabase.com/privacy) — platform-level processing.
- [Supabase Data Processing Addendum](https://supabase.com/legal/customer-resources/data-processing-addendum) — controller/processor roles, subprocessors, transfers, and statement that covered data may be processed where Supabase/subprocessors maintain facilities subject to safeguards.
- [Supabase subprocessor list](https://supabase.com/legal/customer-resources/subprocessor-list) — must be checked at launch and monitored for changes.

### Google identity

- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy) — accurate scope/purpose disclosure, privacy policy, limited use, and security expectations; explicitly includes Google Sign-In.
- [OAuth 2.0 policies](https://developers.google.com/identity/protocols/oauth2/policies) — OAuth client and consent-screen requirements.
- [Google Privacy Policy](https://policies.google.com/privacy) — Google's own controller/service processing; link rather than reproduce.

### OpenAI API

- [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data) — current default API training position, default abuse-monitoring retention up to 30 days, endpoint-specific application-state retention, ZDR/Modified Abuse Monitoring eligibility, and data-residency limitations.
- [OpenAI Services Agreement](https://openai.com/policies/services-agreement/) and applicable DPA — verify the contracting entity and terms for the production organization.

Repository-specific qualification: the code uses `/v1/chat/completions` with the standard endpoint unless `AI_PROVIDER_BASE_URL` is overridden. The production secret/control state was not available, so default docs are not proof of Notura's actual setting.

### Google Gemini API

- [Gemini API Additional Terms](https://ai.google.dev/gemini-api/terms) — current distinction between unpaid and paid services. Unpaid input/output may be used for product improvement and human review and should not contain sensitive/confidential/personal information; paid prompts/responses are not used for product improvement but may be logged for safety and processed/cached in provider locations. Current terms also restrict EEA/Switzerland/UK user-facing clients to paid services.
- [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum) — applicable only where the selected paid service/contract incorporates it.

Repository-specific qualification: Gemini is supported, not verified active. It must not be named as an active processor until the remote provider selection is confirmed.

### Open Food Facts

- [Open Food Facts API introduction](https://openfoodfacts.github.io/openfoodfacts-server/api/) — current v3 recommendation, custom User-Agent requirement, unauthenticated reads, rate limits, and database-quality disclaimer.
- [Open Food Facts Privacy Policy](https://world.openfoodfacts.org/privacy) — identifies the French association and currently lists visit IP/log use for security/technical analysis/popularity with three-year storage.
- [Open Food Facts Terms of Use](https://world.openfoodfacts.org/terms-of-use) — data and service terms.

The Notura request is direct from device and includes a barcode in the URL. Open Food Facts is not merely a static data-license source in this implementation.

### ML Kit barcode scanning

- [ML Kit barcode scanning for Android](https://developers.google.com/ml-kit/vision/barcode-scanning/android) — bundled versus Google Play Services-delivered model options.
- Local plugin build evidence determines Notura's path: bundled is default and no unbundled property was found.

## 7. EU/EEA privacy and transfers

- [General Data Protection Regulation, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) — primary text: transparency, lawful bases, special-category data, processors, security, DPIA, rights, retention, transfers, and accountability.
- [EDPB Guidelines, Recommendations and Best Practices](https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en) — select current transparency, consent, controller/processor, DPIA, breach, and transfer guidance during legal drafting.
- [European Commission standard contractual clauses](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en) — EU transfer mechanism source.
- [European Commission adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en) — current adequacy status.

Do not automatically call all nutrition data Article 9 health data; assess nature, context, purpose, inferences, and legal interpretation. Conversely, do not assume a “wellness” label keeps data outside sensitive-data rules.

## 8. United Kingdom privacy

- [Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents) — primary UK statute.
- [Privacy and Electronic Communications Regulations 2003](https://www.legislation.gov.uk/uksi/2003/2426/contents) — cookies/local storage and electronic communications.
- [ICO: right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/) — transparency guidance.
- [ICO international transfers guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/) — UK transfer architecture and tools.

## 9. Türkiye / KVKK

- [Law No. 6698, Personal Data Protection Law (official English page)](https://www.kvkk.gov.tr/Icerik/6649/Personal-Data-Protection-Law) — primary framework reference; use the authoritative Turkish text for legal drafting.
- [KVKK authority decisions and guidance](https://www.kvkk.gov.tr/) — current notice, sensitive-data, security, deletion/erasure/anonymization, data-subject application, registry, and transfer materials.
- [KVKK international transfer announcements/guidance](https://www.kvkk.gov.tr/Icerik/7696/Yurt-Disina-Kisisel-Veri-Aktarimi) — re-check current standard-contract/adequacy/appropriate-safeguard process and filing requirements.

Because Turkish cross-border rules have changed in recent years, counsel must verify current implementing rules and standard-contract filing practice immediately before launch.

## 10. United States consumer and health privacy

### Federal

- [FTC Mobile Health Apps Interactive Tool](https://www.ftc.gov/business-guidance/resources/mobile-health-apps-interactive-tool) — screening across FTC Act, Health Breach Notification Rule, HIPAA, and related regimes.
- [FTC Health Breach Notification Rule](https://www.ftc.gov/legal-library/browse/rules/health-breach-notification-rule) — current rule and amendments.
- [FTC Health Products Compliance Guidance](https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance) — substantiation and health advertising claims.
- [HHS HIPAA covered-entity/business-associate guidance](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html) — do not claim HIPAA status without fitting the legal roles.

### States

- [Washington Attorney General: My Health My Data Act](https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy) — consumer-health-data obligations outside HIPAA.
- [California Privacy Protection Agency regulations](https://cppa.ca.gov/regulations/) — CCPA/CPRA regulations and rulemaking; check applicability thresholds and sensitive-personal-information rules.
- [Colorado Attorney General: Colorado Privacy Act](https://coag.gov/resources/colorado-privacy-act/) — statute/rules/resources.
- [Connecticut Attorney General: Connecticut Data Privacy Act](https://portal.ct.gov/ag/sections/privacy/the-connecticut-data-privacy-act) — state regulator guidance.
- [Oregon Department of Justice: Oregon Consumer Privacy Act](https://www.doj.state.or.us/consumer-protection/id-theft-data-breaches/privacy/) — current state privacy materials.

The state list is an applicability watchlist, not a statement that every law applies on day one. Consumer-health definitions can reach nutrition inferences and product-interest data even where HIPAA does not.

## 11. Brazil / LGPD

- [Lei Geral de Proteção de Dados Pessoais, Lei No. 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — primary statutory text.
- [Brazilian data protection authority (ANPD)](https://www.gov.br/anpd/pt-br) — current regulations and guidance.
- [ANPD Resolução CD/ANPD No. 19/2024](https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-19-de-23-de-agosto-de-2024-580095396) — international transfer regulation and standard contractual clauses; verify consolidated/current text before use.

## 12. Accessibility

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — target standard; architecture recommends Level AA.
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — interaction patterns where native HTML is insufficient.
- [W3C language information and language tags](https://www.w3.org/International/questions/qa-html-language-declarations) — document/subtree language declarations.
- [European Accessibility Act overview](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en) — applicability screening for EU consumer services; obtain legal advice.

## 13. Source maintenance checklist

Before each public release:

1. Re-run the repository network/SDK scan and compare the diff with the processor inventory.
2. Confirm remote Supabase and AI settings without copying secret values.
3. Check Supabase, GitHub, Google, OpenAI/Gemini, Open Food Facts, Cloudflare, Apple, and Google Play policy/subprocessor change dates.
4. Re-resolve DNS and inspect live response headers; update the Cloudflare/GitHub flow if proxy status changes.
5. Re-check enabled locales and the `pt`/`pt-BR` normalization path.
6. Validate legal sources with qualified counsel for actual launch markets.
7. Record source review date and reviewer in the legal/content release record.
