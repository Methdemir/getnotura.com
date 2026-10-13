# MomentBack screenshots

The MomentBack landing page uses real app captures in one place, the app tour
(`src/components/momentback/AppTour.astro`, section `#tour`). The hero is a drawn
viewfinder, labelled as a drawing, and is not a screenshot slot.

## What ships today

Six captures in `public/momentback/screens/`, each as `<name>-720.avif` and
`<name>-720.webp` (720×1425):

| File | Source (apps/ReplayCamera/out/) | Shows |
| --- | --- | --- |
| `camera-ready` | `final-polish/camera.png` | Camera screen, HAZIR · 30 sn chip, rail with locks on 60/120, KAYDET. |
| `camera-filling` | `final-polish/camera-final.png` | Same screen moments after opening, chip at 2/30 sn. |
| `clip-recording` | `final-polish/save-confirmation.png` | After SAVE: KLİP 0:31 chip, "last 30 seconds kept" confirmation, STOP. |
| `clips` | `final-polish/clips.png` | Klipler sheet: date, size, length, share and delete per clip. |
| `settings` | `final-polish/settings.png` | Ayarlar sheet: replay length, Record audio, quality, Pro (locked), restore, turn off camera and microphone. |
| `quality` | `pro-quality/m21-high-picker.png` | Quality picker: 720p30 / 1080p30, 1080p60 "not supported by this camera", 4K30, Pro stars. |

All were captured on the Samsung Galaxy M21 test phone (Android 12) from the 2–3 October
2026 test builds, in the app's Turkish interface. The page says so under the phone, in
both locales.

### How they were cleaned

- Cropped to `y = 76…2214` of the 1080×2340 original: the Android status bar (with
  personal notification icons) and the navigation bar are removed. Nothing inside the
  app's interface was retouched.
- Resized to 720 px wide (about 2× the largest rendered phone) and encoded as AVIF
  (q60) and WebP (q82). Each file is 7–42 KB.
- **Excluded on purpose:** `final-polish/clips-loaded.png` and the older Clips captures
  (thumbnails show a private home scene), `final-polish/pro.png` (predates the
  1080p60/4K30 Pro line and shows a red "price unavailable" error), all frames of the
  earlier teal-black UI (`m21-*.png`, `audio-live-fixes/m21/*`) and the emulator frames.

## Adding or replacing a screen

1. Crop off the status and navigation bars (same window as above if the device is the
   M21), export `<name>-720.avif` and `<name>-720.webp` into `public/momentback/screens/`.
2. Add or edit a stop in `home.tour.stops` in `src/content/momentback.ts` — **both
   locales** — with `screen`, a title, a body that says what the frame really shows, and
   alt text. The tour supports up to six stops (the `:has()` rules in
   `src/styles/momentback.css` are written for six).
3. If the frames are no longer Turkish or no longer from the M21, update `home.tour.note`.

## Captures that would improve the page

The viewfinder is dark in every current capture. A lit, people-free scene would let the
tour (and possibly the hero) show the product doing its job. Wanted from the M21, in
English *and* Turkish, current main build, nothing personal in frame, status/nav bars
cropped afterwards:

1. Camera, READY · 30s, pointed at a bright, empty outdoor scene (sky, street without
   people, a plant) — the hero/tour "READY" frame.
2. The same scene mid-fill (e.g. 18/30s).
3. After SAVE: CLIP chip counting, the "last 30 seconds kept · recording continues" toast.
4. Clips with real thumbnails of that same neutral scene only.
5. The Pro sheet once the store product and price exist (shows the quality line).
6. The notification shade with QUICK SAVE / STOP, cropped to the notification only.

## Rules for the images

- **Real captures only.** No mockups presented as screenshots, no stock photography, no
  composited scenes. The site's argument is that MomentBack is honest about what it
  records; a faked screenshot spends that.
- **Only shipped states.** Do not show 60 s / 120 s or 1080p60 / 4K30 as unlocked, a
  price that does not exist, or anything the build does not do.
- **No identifiable people, private scenes or personal notifications** in frame.

## What must not break

`npm run validate` fails the build on a single emitted `.js` file or `<script>` tag, on
any `play.google.com` or `apps.apple.com` URL while no store channel is available, and on
a broken internal link. Run it before pushing.
