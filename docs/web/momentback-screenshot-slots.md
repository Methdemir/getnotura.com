# MomentBack screenshots and photography

The MomentBack landing page uses two kinds of images:

- **Real app captures** in the app tour (`src/components/momentback/AppTour.astro`,
  section `#tour`). In the three camera stops, a licensed photo sits behind the
  untouched interface and the page says so.
- **Licensed photography** (Unsplash License) for the hero scene and the three moment
  cards. The hero is a live-viewfinder composition: the app's HUD, rendered in HTML/CSS
  with the app's own strings, over a photo — credited on the frame as "Photo: … ·
  interface from the app".

## App captures

Captured on the Samsung Galaxy M21 test phone (Android 12) from the 2–3 October 2026 test
builds, in the app's Turkish interface. In `public/momentback/screens/`, each as
`<name>-720.avif` and `<name>-720.webp` (720×1425):

| File | Source (apps/ReplayCamera/out/) | Shows |
| --- | --- | --- |
| `camera-ready-photo` | `final-polish/camera.png` + tour photo | Camera screen, HAZIR · 30 sn chip, rail with locks on 60/120, KAYDET. |
| `camera-filling-photo` | `final-polish/camera-final.png` + tour photo | Same screen moments after opening, chip at 2/30 sn. |
| `clip-recording-photo` | `final-polish/save-confirmation.png` + tour photo | After SAVE: KLİP 0:31 chip, "last 30 seconds kept" toast, STOP. |
| `clips` | `final-polish/clips.png` | Klipler sheet: date, size, length, share and delete per clip. |
| `settings` | `final-polish/settings.png` | Ayarlar sheet: replay length, Record audio, quality, Pro (locked), restore, turn off camera and microphone. |
| `quality` | `pro-quality/m21-high-picker.png` | Quality picker: 720p30 / 1080p30, 1080p60 "not supported by this camera", 4K30, Pro stars. |

### How they were cleaned

- Cropped to `y = 76…2214` of the 1080×2340 original: the Android status bar (with
  personal notification icons) and the navigation bar are removed.
- Resized to 720 px wide and encoded as AVIF (q60) and WebP (q82).
- **Excluded on purpose:** `final-polish/clips-loaded.png` and older Clips captures
  (thumbnails show a private home scene), `final-polish/pro.png` (predates the
  1080p60/4K30 Pro line and shows a "price unavailable" error), frames of the earlier
  teal-black UI and the emulator frames.

### The three composited camera stops

The test captures have a dark viewfinder. For `*-photo` files, only the camera preview is
replaced; every control is the screenshot's own pixels:

1. Each control that has a surface — Clips button, buffer chip, duration pills, KAYDET,
   the toast — is kept inside an explicit rounded shape measured on the 1080 px capture
   (alpha 1, 4× supersampled edges).
2. Everything else (stroke icons, hint text, the STOP ring and square, lock badges) is
   kept by a luminance/chroma key computed from the screenshot alone.
3. Behind them: the tour photo, cropped below the sun and centred on the dog, under the
   app's own bottom readability curtain (colour sampled from the captures, `#040e10`).

The stops are marked `illustrative: true` in `home.tour.stops`; the page renders a
visible note ("Interface from the app · scene in the viewfinder is a stock photo" /
"Arayüz uygulamadan · vizördeki sahne temsilîdir (stok fotoğraf)"), the alt text says
the same, and the tour note names the photographer.

## Photography

All five photos are from Unsplash, under the Unsplash License (free for commercial use,
no permission needed; verified non-premium, not Unsplash+). Credit is optional under the
licence and given anyway: on the hero frame, in the tour note, and in the home page
footer ("Photography" line, links to each photo page). Source of truth for names and URLs:
`momentBackPhotos` in `src/content/momentback.ts`.

| Files (`public/momentback/photos/`) | Photo | Photographer |
| --- | --- | --- |
| `hero-wide-{1280,1920,2400}`, `hero-tall-{640,847}` | Dog running through shallow water, golden hour | Rafaëlla Waasdorp — https://unsplash.com/photos/kyV6PvfJWik |
| `../screens/*-photo-720` (viewfinder) | German shepherd jumping, backlit | Filip Mavrodiev — https://unsplash.com/photos/RR30mRqOgjo |
| `moment-pets-{640,960}` | Corgi catching a frisbee | Alvan Nee — https://unsplash.com/photos/a8qRcuSZTsE |
| `moment-sport-{640,960}` | Skater mid-air at sunset | Robson Hatsukami Morgan — https://unsplash.com/photos/ISkeH2SLqNU |
| `moment-weather-{640,960}` | Lightning at dusk over trees | Max LaRochelle — https://unsplash.com/photos/uu-Jw5SunYI |

Crops: hero wide `x 0–2500, y 400–1751` (dog right of the headline, horizon on the upper
third), hero tall `x 1032–1879, y 540–2053` (dog in the upper half, copy below it);
moments are 4:3. Hero AVIF q50 (1920w ≈ 99 KB), moments AVIF q52 (960w ≈ 18–28 KB).
One retouch: a small teal lens-flare speck in the hero photo was removed, because teal
means "held" in this system. Only the hero is eager / `fetchpriority="high"`; every other
image is `loading="lazy"` with `sizes`.

## Adding or replacing an image

1. App capture: crop off the status and navigation bars, export `<name>-720.avif` and
   `.webp` into `public/momentback/screens/`, and add or edit a stop in
   `home.tour.stops` — **both locales** — with `screen`, a body that says what the frame
   really shows, alt text, and `illustrative: true` if anything in it is not from the
   phone. The tour's `:has()` rules support six stops.
2. Photo: add it to `momentBackPhotos` with photographer and URL (the footer credit line
   reads from there), export AVIF + WebP at the widths above, and keep the licence check:
   no Unsplash+ or other restricted source.

## Optional: captures that would still help

Not needed for the current page. If device time comes up, a lit, people-free M21 capture
(READY, mid-fill and after SAVE, English and Turkish) would let the three camera stops
show a real preview instead of a composited photo, and a Pro sheet capture once the
store price exists would add the paywall honestly.

## Rules for the images

- **The interface is never faked.** Controls, chips and text come from real captures or
  from the app's own strings; a stock scene may sit behind them only with a visible
  label.
- **Only shipped states.** Do not show 60 s / 120 s or 1080p60 / 4K30 as unlocked, a
  price that does not exist, or anything the build does not do.
- **No identifiable people, private scenes or personal notifications.** People in photos
  appear only as distant silhouettes.

## What must not break

`npm run validate` fails the build on a single emitted `.js` file or `<script>` tag, on
any `play.google.com` or `apps.apple.com` URL while no store channel is available, and on
a broken internal link. Run it before pushing.
