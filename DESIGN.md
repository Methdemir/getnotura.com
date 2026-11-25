# Design System: Sarper Studios

Every product on `sarperstudios.com` owns one top-level path and **its own design
system**, taken from the app itself. Products share the domain, the build, the
font files (`public/fonts/plus-jakarta-sans`) and the zero-JavaScript rule, and
nothing else. Each stylesheet is standalone and scoped under its own class prefix.

## Sub-brand: MomentBack (`/momentback/`)

MomentBack is published at `/momentback/`, `/momentback/tr/` and their legal pages. Its stylesheet,
`src/styles/momentback.css`, is standalone.

That separation is deliberate rather than drift, so the detector is configured to skip
`src/styles/momentback.css` (`.impeccable/config.json` → `detector.ignoreFiles`). This
section is the design record for that file.

**North star: "The viewfinder is already open."** MomentBack is a camera that holds the
last seconds it has seen. The visitor lands *inside* the camera screen: the hero is a
viewfinder with the app's own HUD over a drawn scene. The surface is the dark of a camera
app because that is what the product is — a light mode would blow out night framing, so
the app has none and neither does the site.

### Palette

Taken from the app's current anthracite theme (`lib/src/theme/momentback_theme.dart`,
`MB` and `SurfacePalette.dark`), not reinterpreted. The earlier teal-black `#0b1719`
ground is gone from the app and from the site.

| Token | Value | Meaning |
| --- | --- | --- |
| `--mb-ground` | `#101214` | `MB.ground`, the viewfinder ground. |
| `--mb-raised` / `--mb-panel` | `#191c20` / `#24282d` | `SurfacePalette.dark.ground` / `.elevated`: alternate bays, sheets, panels. |
| `--mb-rule` | `#363b42` | `SurfacePalette.dark.rule`. |
| `--mb-cream` | `#f3f4f5` | `MB.cream`, ink for headings and values. |
| `--mb-muted` | `#acb2ba` | `SurfacePalette.dark.inkMuted`. `--mb-ink` (`#d3d7dc`) and `--mb-faint` (`#8d949d`) are the body and tertiary steps between and below cream and muted. |
| `--mb-serif-ink` | `#e4ddcd` | The second voice of a two-voice headline. Warm off-cream, still neutral. |
| `--mb-teal` / `--mb-on-teal` | `#3fd8c4` / `#062824` | **The moment is being held.** Buffer chip, selected duration, HOLD, held band. |
| `--mb-orange` / `--mb-on-orange` | `#ff8a3d` / `#331402` | **Time is being committed to a file.** SAVE, STOP, the saved clip. |

The two accents never swap roles and are never decoration: section labels, links, focus
rings and the nav are cream or muted. The only low-alpha derivatives are the timeline's
band fills (`--mb-teal-dim`, `--mb-orange-dim`) and the HUD chip ground.

### What sets MomentBack apart

- **Tracked mono instrument labels everywhere** (`0.64–0.78rem`, uppercase, `0.1–0.16em`):
  section labels, the nav, HUD readouts, spec keys, figure captions. Even the header
  carries a ticking `HOLD 00:00` readout on the home page.
- **Full-bleed licensed photography** behind the hero HUD, under scrims. It is a
  viewfinder, so it shows a scene.
- **Photo cards** for the moments and a bordered price panel.
- **A second voice.** Headlines that matter are set in two voices: Plus Jakarta Sans
  for the statement, an italic high-contrast serif for the answer ("Save the moment." /
  *After it happens.*). The serif is a system stack — `"Bodoni 72", "Bodoni MT", Didot,
  "Iowan Old Style", "Palatino Linotype", Georgia, serif` — so no font file ships for it.

### Type

Plus Jakarta Sans (the two bundled weights), the system serif stack above for the second
voice, and the system mono stack for instruments. Hero display is
`clamp(2.6rem, min(1.35rem + 5.6vw, 10.5svh), 6.6rem)` at `-0.045em` — capped by the
viewport height so SAVE stays in the first screen on a laptop. HUD text mirrors the app's
`MBText` sizes (chip 10.5dp → `0.68rem`, SAVE 172×64dp → `10.75rem × 4rem`).

### The hero: a viewfinder in the app's own words

`ViewfinderHero.astro`. Layout follows the app's camera screen (`camera_chrome.dart`):
Clips top-left, the buffer chip top-centre, flip and settings top-right, the
15s/30s/60s/120s rail (60/120 with a lock), the orange SAVE and the first-run hint at the
bottom. Every string is the app's string in that locale (`app_en.arb` / `app_tr.arb`:
READY/HAZIR, SAVE/KAYDET, `{n}/30s`). It draws nothing the app lacks — no REC dot, no
audio meters, no thirds grid. The focus square and `1.0×` pill stand for tap-to-focus and
pinch-zoom, which ship; on wide screens the square sits on the dog. Corner brackets frame
the viewfinder and are site chrome.

The scene is a licensed photograph (see Photography): a dog running through shallow
water at golden hour. `<picture>` art-directs it — a wide crop (1280/1920/2400w) from
48rem up, a portrait crop (640/847w) below, AVIF first, WebP fallback. It is the only
`loading="eager"` + `fetchpriority="high"` image on the page; at 1920w the AVIF is
~99 KB. Two scrims carry legibility: top/bottom curtains for the HUD (as the app does)
and, from 52rem, a left-hand shade under the headline; on a phone the copy sits low and
the lower half darkens. Measured on text-free renders, the lede holds ≥ 6:1 at its
brightest background pixel and the headline ≥ 5.9:1. A visible credit on the frame reads
"Photo: Rafaëlla Waasdorp / Unsplash · interface from the app" (TR: "Fotoğraf: … ·
arayüz uygulamadan"). The HUD is `aria-hidden`; a visually hidden paragraph describes
screen and scene.

Motion (CSS only, inside `prefers-reduced-motion: no-preference`): the photo pulls focus
on load, then drifts very slightly like a hand-held camera (never a zoom effect); the
chip counts held seconds in real time with an `@property` integer and a conic ring, then
reads READY at 30, as the app does; the header readout ticks. With reduced motion the
photo is still and the chip simply reads READY · 30s.

### Below the hero

1. **Status strip** — store state as text ("Coming soon on Google Play", never a link
   until `store` config says so), platform chips, a link to the real screens.
2. **Verb rail** — HOLD (teal) → SAVE (orange) → SHARE (cream). Colour by role.
3. **The replay timeline** (signature, below).
4. **App tour** — `AppTour.astro`, see Screenshots.
5. **Figures** — 30 s / 120 s / 0 / 11, `@property` counters that count up on a
   scroll-driven `view()` timeline; static final values everywhere else. The number is
   also in the DOM as text for assistive tech.
6. Moments — three photo cards (4:3 crops, `saturate(0.86) brightness(0.94)` so they
   sit in the anthracite system, a hairline where photo meets card, lazy-loaded), then
   privacy facts, spec + a two-voice price line ("Free to start." /
   *Pro once. No subscription.*), FAQ, two-voice close.

### The signature: the replay timeline

`ReplayTimeline.astro` — a single press reaching backwards across the held seconds and
forwards to STOP. It exists twice: an SVG time axis above 52rem (capped at 54rem wide) and
the same bands running down the page below it. Both are `aria-hidden`; a visually hidden
paragraph carries the text alternative. Inside `@supports (animation-timeline: view())`
and without reduced motion, the figure draws itself as it scrolls in (named
`view-timeline: --mb-tl`): the held band fills, the event appears, SAVE drops, and the
clip grows *out of the SAVE press in both directions* (`transform-origin` at the press),
then STOP lands. Everywhere else it is static and complete.

### Screenshots

The tour shows six real captures in a CSS phone: READY, filling (`2/30`), SAVE→STOP,
Clips, Settings, Quality. The test captures had a dark viewfinder, so in the three camera
stops a licensed photo sits *behind* the untouched interface (chips, rail, SAVE, STOP and
toast are the screenshot's own pixels). Those stops carry a visible note — "Interface from
the app · scene in the viewfinder is a stock photo" / "Arayüz uygulamadan · vizördeki
sahne temsilîdir (stok fotoğraf)" — and their alt text says the same. Clips, Settings and
Quality are plain screenshots. A native radio group switches the screens (`:has()`), so
it is keyboard operable with no script; without `:has()` the first screen stays. Every
description is visible text tied to its radio with `aria-describedby`. Sourcing,
compositing and the honesty rules are in `docs/web/momentback-screenshot-slots.md`.

### Photography

Five photographs from Unsplash, used under the Unsplash License (free for commercial
use, no permission needed; none is an Unsplash+ image). Credit is not required and is
given anyway: on the hero frame, in the tour note, and as a "Photography" line in the
home page footer with links to each photo page. The record of photographer and URL is
`momentBackPhotos` in `src/content/momentback.ts`.

| Use | Photo | Photographer |
| --- | --- | --- |
| Hero scene | Dog running through shallow water, golden hour | Rafaëlla Waasdorp — unsplash.com/photos/kyV6PvfJWik |
| Tour viewfinder (01–03) | German shepherd jumping, backlit | Filip Mavrodiev — unsplash.com/photos/RR30mRqOgjo |
| Moments: kids and pets | Corgi catching a frisbee | Alvan Nee — unsplash.com/photos/a8qRcuSZTsE |
| Moments: sport and speed | Skater mid-air at sunset | Robson Hatsukami Morgan — unsplash.com/photos/ISkeH2SLqNU |
| Moments: outdoors | Lightning at dusk over trees | Max LaRochelle — unsplash.com/photos/uu-Jw5SunYI |

Rules: photographs show *situations the app is for*, never a fake app result; the only
place a photo meets the interface (the tour) is labelled as such. People appear only as
distant silhouettes. One retouch was made: a small teal lens-flare speck in the hero photo
was removed, because teal is reserved for "held" in this system. Files live in
`public/momentback/photos/` (AVIF + WebP); everything below the hero is lazy-loaded.

---

## Sub-brand: Vergi Hesabım (`/vergi-hesabim/`)

Sarper Studios' Turkish tax calculator
(Android, package `com.taxai.vergi_hesabi`). Two Turkish-only pages — the product
page and the privacy policy — plus `public/app-ads.txt` at the domain root for
AdMob. Like MomentBack it shares the build, the font files and the zero-JavaScript
rule and nothing else. Its stylesheet, `src/styles/vergi-hesabim.css`, is standalone
and every rule is scoped under `vh` / `vh-` classes. It reuses `SeoHead` through
its optional `siteName`, `iconHref`, `themeColor` and `colorScheme` props. Copy lives in
`src/content/vergi-hesabim.ts`, so the surface can move to another domain by
moving that file, the layout, the component, the stylesheet and the two pages.

**North star: "The receipt you can trust."** The sum is worked out on the phone,
and the page shows where each piece of information goes.

### Palette

Taken from the app (`lib/ui/theme/app_spacing.dart`, `app_theme.dart`):
navy `#0a2340` (the committed field: masthead, hero, the "how it works" band, the
privacy header), navy deep `#06172a` (footer), mint `#4fd1a2` meaning **stays on
your phone** and nothing else, receipt paper `#ffffff` on a cool `#f3f6f9` ground,
ink `#14263a` / `#4f6072`, rules `#d3dde6`. The page follows the system theme
because the app ships a dark theme; in dark the ground drops to `#050e18` so the
navy still reads as a field, and the paper becomes `#15314d`.

### The signature: the receipt

`src/components/vergi-hesabim/Receipt.astro`. Label / value rows joined by a dotted
leader, a dashed rule under the heading, a solid rule above the total, tabular
figures, and a torn zigzag bottom edge made with a CSS mask (the drop shadow sits
on a wrapper because a filter on the masked sheet is cut away by its own mask).
On the product page it lists the six calculators and prints down out of the navy
hero onto the ground; on the privacy page it is the "Bir bakışta" summary of where
each kind of information goes. Rows marked local carry a mint dot. It states names
and places only — never a computed amount — and is captioned as a drawing, not a
screenshot. Below 34rem the leader collapses and values drop beneath their labels.

### Motion

One moment: the receipt prints top edge first (clip-path + 1.25rem drop, 900ms,
`cubic-bezier(0.16, 1, 0.3, 1)`), inside `prefers-reduced-motion: no-preference`
with `backwards` fill.

### Rules kept from the floor

No eyebrows, no cards as page structure (hairline ledgers instead), no gradients
as surfaces (the mask's gradients are geometry, not color). The store status is a
sentence, never a link or a badge, until a Play listing exists.

## Sub-brand: Sarper Studios (`/`, `/999kb/`, `/jutsu/`)

Since 7 October 2026 the domain root belongs to the publisher, Sarper Studios,
and every product owns one top-level path: `/momentback/`, `/vergi-hesabim/`,
`/999kb/`, `/jutsu/`, `/mergekin/`, `/kimo/`. `app-ads.txt` stays at the
domain root, where ad networks read it for every app.

One standalone stylesheet, `src/styles/studio.css`, scoped under `ss` / `ss-`,
serves the studio page and the 999KB Arcade and Jutsu product pages (English at
the base path, Turkish under `tr/`, reciprocal hreflang). Copy lives in
`src/content/studio.ts`; the layouts are `StudioLayout.astro` and
`AppLayout.astro`, the bodies `components/studio/AppHome.astro` and
`AppPrivacy.astro`.

**North star: "The shelf, not a product."** The studio page names who publishes
each app and gets a visitor or a reviewer to the right product page or privacy
policy in one tap.

### Palette

Studio: warm paper `#f4f1ea`, raised `#ebe6dc`, near-black ink `#16171b` /
`#57575d`, hairline rules `#d8d1c4`; in dark the ground is `#111215`. The only
colour on the studio page is the apps' own icons. Product pages swap in the app's
field and accent through `ss--999kb` (field `#0a0c1e`, mint `#00e5a0`, the four
launcher tile colours in the hero) and `ss--jutsu` (field `#0e0f13`, orange
`#f4761e`, from `NjColors`). The product hero is always the app's dark field; the
reading ground follows the system theme.

### Signatures

- 999KB: a 10 × 10 grid of tiles, one per game, in the launcher icon's colours.
- Jutsu: the recognition pipeline as a numbered, lit sequence ending in the
  accent ("effect fires").
- Privacy pages open with an "at a glance" table: what is kept and where, with a
  filled pip for "stays on the phone" and a hollow one for "leaves the phone".

### Naming

The public name of the hand-sign app is **Jutsu**. The franchise name and its
iconography stay off the site until the store name is decided.

## 999KB product page (`/999kb/`, rebuilt 9 November 2026)

Supersedes the 10 × 10 tile signature above for 999KB. Direction comes from the app logo; it was not derived from reference sites.

- **Color:** yellow `#FFC928` hero and support fields (the logo's 999); navy `#0A0C1E` ink and size band; paper `#FBF7EA` reading ground; pink `#FF5C93` for the "Not in the box" band only. One scheme in light and dark: the fields are the brand.
- **Type:** Plus Jakarta Sans 400 and 600 only. Headings are tight, large and left-aligned; no gradient text.
- **Shape:** one radius (`0.875rem`), no shadows, no rotated frames, no cards.
- **Signature:** the six-clip shelf of real gameplay; the numbered 001–100 list generated from the app registry.
- **Rules:** clips are real recordings; no store badge until a listing exists; zero client JavaScript (FAQ is `<details>`); clips drop to posters under reduced motion.
