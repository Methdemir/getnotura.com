# MomentBack screenshot slots

The MomentBack landing page ships with no product screenshots. Every place one belongs
is already built as a slot; adding the real images is dropping files in a directory and
passing one prop. Nothing about the layout, the frame, or the page structure changes.

## Adding a screenshot

1. Put the file in `public/momentback/screens/`. PNG or JPEG, portrait, taken on a phone
   at the app's real aspect ratio. Name it for the state it shows, e.g.
   `camera-ready.png`, `camera-saving.png`, `clips.png`, `settings.png`.
2. Pass `src` (and `alt`) to `DeviceFrame` in
   `src/components/momentback/MomentBackHome.astro`:

   ```astro
   <DeviceFrame
     src="/momentback/screens/camera-ready.png"
     alt="MomentBack's camera screen, armed and holding the last 30 seconds."
     caption="MomentBack, ready. The last 30 seconds are being held."
     state={home.device.state}
     buffered={home.device.buffered}
     save={home.device.save}
     durations={home.device.durations}
   />
   ```

3. Replace the caption. Right now every slot is captioned "Interface diagram — not a
   screenshot" (`home.device.note` in `src/content/momentback.ts`, both locales). Once a
   real screenshot is in, that caption is wrong — change it to what the screenshot
   actually shows, or drop it.

`DeviceFrame` shows the schematic viewfinder only while `src` is absent, so the two never
appear at once and there is no half-state to clean up.

## The slots

| Where | Component call | State to capture |
| --- | --- | --- |
| Hero, right column | `MomentBackHome.astro`, the `<DeviceFrame>` in `.mb-hero` | The camera armed and holding — the READY chip, the duration rail, the SAVE button. This is the one that matters most. |

Only one slot is wired today, deliberately: one honest screenshot in the hero beats four
placeholders. When the real images exist, the natural next two are a second `DeviceFrame`
in the "How it works" section showing the SAVE→STOP morph, and one in "What is in the
app" showing Clips.

## Rules for the images

- **Real captures only.** No mockups presented as screenshots, no stock photography, no
  composited scenes. The site's whole argument is that MomentBack is honest about what it
  records; a faked screenshot spends that.
- **Only shipped states.** Do not show the 60 s / 120 s rail positions as unlocked
  features, a purchase screen, or anything else the build does not do.
- **No identifiable people or private scenes** in whatever the viewfinder is pointed at.
- Ship them at roughly 2× the rendered size (the frame is at most ~312 CSS px wide) and
  keep each file small. `width`/`height` on the `<img>` are already set to a 1080×2340
  ratio in `DeviceFrame.astro`; change those two numbers if the real captures differ, so
  the frame does not shift while the image loads.

## What must not break

`npm run validate` fails the build on a single emitted `.js` file, on any
`play.google.com` or `apps.apple.com` URL, and on a broken internal link. Adding an image
touches none of that, but run it before pushing anyway.
