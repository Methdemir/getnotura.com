---
name: Notura Web
description: The pre-launch home for a nutrition tracker that shows what it could not determine.
colors:
  ground: "#f7f1e6"
  ground-raised: "#fffdf8"
  field: "#1e4a2e"
  field-deep: "#163722"
  brand: "#2f5e3e"
  sage: "#b7d8be"
  sage-dim: "#dcebdc"
  ink: "#16211a"
  ink-soft: "#55645a"
  on-field: "#f4efe3"
  on-field-soft: "#b9c9bc"
  protein: "#5b8def"
  carbs: "#f2a63b"
  fat: "#e86a92"
  water: "#3ba9f2"
  weight: "#8c6de0"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 1.95rem + 4.3vw, 5.35rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.038em"
  display-sm:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.4vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.4rem + 2vw, 3.05rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline-sm:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 1.15rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.06rem + 0.28vw, 1.32rem)"
    fontWeight: 600
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.09rem, 1rem + 0.42vw, 1.32rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  chip: "0.2rem"
  band: "0.35rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.35rem"
  pill: "2rem"
spacing:
  bay: "clamp(4.5rem, 9.5vw, 8.5rem)"
  shell: "78rem"
  measure: "68ch"
components:
  action-primary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.5rem"
    height: "3.1rem"
  action-primary-hover:
    backgroundColor: "{colors.field-deep}"
  action-onfield:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.field-deep}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.5rem"
  action-quiet:
    textColor: "{colors.field}"
    padding: "0.8rem 0"
  lang-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.field}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.85rem"
    height: "2.75rem"
---

# Design System: Notura Web

## Overview

**Creative North Star: "The Honest Ledger"**

Notura's site is a cream reading surface cut open by fields of deep forest green. It behaves like a well-set printed record rather than a product brochure: quantities are declared in ruled rows, every rule is a hairline, and nothing is boxed in a card. The green fields are not accents — they are full-bleed territories that take over a third to a half of a viewport and carry the moments where the product states something about itself.

The system's one non-negotiable idea is that an unknown is displayed, not hidden. The signature component renders known quantities as filled bands in fixed data inks and renders the unknown as an open hatched band labelled "not determined". That component is the reason the palette carries five saturated data colors inside an otherwise restrained green-and-cream world.

Density is generous and editorial. Type does the work that cards and shadows do elsewhere: a display face at up to 85.6px against 17px body copy, hairlines instead of containers, and large quiet gaps between movements. The surface is deliberately flat.

**Key Characteristics:**
- Cream reading ground, deep-green committed fields, no gradient anywhere
- Hairline rules and ruled rows instead of cards and borders
- Five fixed-meaning data inks, used only on data
- One authored motion moment; everything else static
- Zero client JavaScript — every interaction is native HTML

## Colors

A restrained green-and-cream world holding five saturated data inks that carry fixed meaning.

### Primary
- **Field Green** (`#1e4a2e`): the committed color. Owns whole regions — the hero's right half, the Explore band, interior page statements — never a small accent. Also the primary button fill and every heading color on light ground.
- **Deep Field** (`#163722`): the darkest territory, reserved for the single most serious statement on a page (the AI and non-medical boundary).
- **Brand Green** (`#2f5e3e`): the mid green used for icon strokes, step numerals, and the calorie mark. It is the identity green inherited from the mobile app.

### Secondary
- **Sage** (`#b7d8be`) and **Sage Dim** (`#dcebdc`): the light greens. Sage is the button fill *on* green ground; Sage Dim tints the truth note and the language-selector hover state.

### Tertiary — the data inks
- **Protein Blue** (`#5b8def`), **Carbohydrate Amber** (`#f2a63b`), **Fat Rose** (`#e86a92`), **Water Blue** (`#3ba9f2`), **Weight Violet** (`#8c6de0`): carried unchanged from the Notura app, where they already mean exactly these things across rings, charts and badges.

### Neutral
- **Ground** (`#f7f1e6`): the warm cream page.
- **Ground Raised** (`#fffdf8`): the lifted band used for the capture section and the footer.
- **Ink** (`#16211a`) / **Ink Soft** (`#55645a`): body and secondary text on cream (5.53:1).
- **On Field** (`#f4efe3`) / **On Field Soft** (`#b9c9bc`): text on green (8.9:1 and 5.93:1).

### Named Rules
**The Fixed Ink Rule.** The five data inks mean protein, carbohydrate, fat, water and weight — nothing else, ever. They never decorate, never fill a background, and never get reassigned to a new category. Fat Rose in particular must never read as an error color.

**The Territory Rule.** Green arrives as a full-bleed region or not at all. A green box floating inside a cream section is a violation of the world.

## Typography

**Display / Body Font:** Plus Jakarta Sans (self-hosted, weights 400 and 600 only)

**Character:** One geometric humanist sans doing every job, separated by scale and tracking rather than by family. At display sizes it is set very tight (-0.038em) and very large; at body size it is set open and plain. The distance between those two settings is the whole typographic voice.

### Hierarchy
- **Display** (600, `clamp(2.9rem, 1.95rem + 4.3vw, 5.35rem)`, 1.04): the home hero's `h1` only. Capped at roughly 15 characters per line so it always breaks into a stack.
- **Display small** (600, `clamp(2.5rem, 1.8rem + 3.4vw, 4.4rem)`, 1.04): the `h1` on every interior page and on the language-entry and 404 surfaces. Interior pages deliberately sit one step below the home hero.
- **Headline** (600, `clamp(1.9rem, 1.4rem + 2vw, 3.05rem)`, 1.04): section `h2`s, capped near 18–20ch.
- **Headline small** (600, `clamp(1.4rem, 1.15rem + 1vw, 2rem)`, 1.04): `h2`s inside a section that already has one — product ledger groups, feature rows, and the truth note.
- **Title** (600, `clamp(1.12rem, 1.06rem + 0.28vw, 1.32rem)`): row headings inside method lists and paired notes.
- **Lede** (400, `clamp(1.09rem, 1rem + 0.42vw, 1.32rem)`, 1.5): the paragraph directly under a heading, in Ink Soft, max 36rem.
- **Body** (400, `1.0625rem`, 1.62): running copy, capped at 68ch.
- **Label** (600, `0.8125rem`, 0.08em, uppercase): footer group headings only.

### Named Rules
**The Two Weight Rule.** Only 400 and 600 exist. Hierarchy comes from size, color and space. Adding a third weight means shipping another font file and must be argued on byte cost.

**The Seven Step Rule.** The ramp has exactly seven steps — display, display-sm, headline, headline-sm, title, lede, body — plus one uppercase label. A heading that needs a size not on this list is a heading in the wrong place; pick the nearest step rather than writing a bespoke clamp.

**The No Kicker Rule.** Nothing sits above a heading. No eyebrow, no overline, no small tracked label introducing an `h2`. The heading carries its own weight.

## Layout

A single centred shell of `min(100% - 2.5rem, 78rem)` governs every section. Vertical rhythm is one token — `--bay: clamp(4.5rem, 9.5vw, 8.5rem)` — applied as section padding, so every movement breathes identically.

The hero is the exception and the signature: a full-width two-column grid where the left column is padded to the shell's own gutter (`max(1.25rem, (100% - 78rem) / 2)`) and the right column bleeds past the shell to the viewport edge. This is what lets the green field touch the screen edge while its copy stays aligned with the rest of the page.

Breakpoints are 26rem (hide the language label), 48rem (navigation moves inline, splits become two columns, footer becomes three), and 60rem (the hero splits into its two columns and method rows go three-column). Below 60rem the hero stacks: copy first, green field beneath it full-bleed.

## Elevation & Depth

The system is flat. There is exactly one shadow in the build and it belongs to a floating overlay, not to content. Depth is carried by tonal territory instead: cream, raised cream, field green, deep field green — four planes, no lift.

### Shadow Vocabulary
- **Overlay** (`0 1.25rem 2.75rem rgba(22, 33, 26, 0.16)`): the language-selector dropdown only. Offset and blur, never a zero-offset halo.

### Named Rules
**The Flat Ground Rule.** Content never lifts. If something needs to separate from its surroundings, it changes plane or gains a hairline — it does not gain a shadow.

## Shapes

Corners are quiet and small relative to the type, on a six-step scale: `0.2rem` for the small data square in a marks row, `0.35rem` for a data band, `0.5rem` for a dropdown item, `0.75rem` for the language dropdown and the focus ring, `1.35rem` for the truth note, and full `2rem` pills for every action and the language trigger. The pill and the hairline are the two recurring silhouettes.

Borders are a single hairline weight in one of two colors: `rgba(22, 33, 26, 0.14)` on cream, `rgba(244, 239, 227, 0.22)` on green. Rules separate rows; they never enclose a shape. The one dashed border in the system marks the unknown band and is load-bearing, not decorative.

## Components

### Buttons
- **Shape:** full pill (`2rem`), minimum height `3.1rem`.
- **Primary:** Field Green fill, On Field text, `0.8rem 1.5rem` padding, with a drawn arrow icon trailing the label.
- **On field:** Sage fill with Deep Field text, for use inside green territories.
- **Quiet:** no fill, no padding inline, Field Green text with an underline — the secondary action beside a primary.
- **Hover:** background darkens to Deep Field over 180ms. **Focus:** the global double ring.

### Navigation
Plain 600-weight links at label size in Ink. The current page is marked by an underline at `0.11em`, never by a colored pill or dot. Below 48rem the nav drops to its own full-width row beneath the lockup, separated by a hairline; links remain visible and are never collapsed into a scripted menu.

### Language selector
A native `<details>`/`<summary>` pill with a drawn chevron that rotates 180° when open. The panel is right-anchored in both header and footer so it can never overflow the viewport, minimum 14rem wide, on Ground Raised with the overlay shadow. The trigger is 44px minimum.

### Ruled row lists
The system's default container-free list. `.methods` puts a drawn icon, a title and a body in a hairline-separated row (three columns above 60rem, two below). `.marks` puts a `0.7rem` data-ink square beside a term. `.ledger__items` and `.process` follow the same rule-between-rows logic. None of these is a card.

### Estimate field (signature)
The component the world exists for. A stack of hairline-separated rows; each row carries a term, a right-aligned state word, and a `0.7rem` band. Known quantities render as a filled band in their fixed ink over a `rgba(244,239,227,0.12)` track. The unknown renders as a transparent band with a dashed `rgba(244,239,227,0.55)` border and a 135° hatch, labelled "not determined" with an em-dash where the value would be. A hairline-separated caption beneath explains why.

### Authored demonstrations (signature)

The system's way of showing the product without photographing it. Every demonstration is drawn in this stylesheet's own grammar — hairlines, data inks, Plus Jakarta Sans — never in the app's Material vocabulary, which is what keeps it legible as a designed figure. Three exist, and they recur across pages so the site reads as one system:

- **Correction.** Two estimate panels, before and after, with a circular turn between them (pointing down when stacked, right when side by side above 48rem). The "before" panel carries one open hatched band; in the "after" panel that band is filled and every state reads *Corrected*. This is the product's thesis made visible.
- **Converge.** Six input chips joined by a hairline spine to a single record pill. Above 48rem the spine is a column with stubs reaching it; below, it runs down the left and turns into the pill. Structure only — it asserts nothing numeric.
- **Span.** One row per record type across 28 days, a filled mark where an entry exists and an open mark where none does. Weight is deliberately sparser than water. Gaps are the point.

Each sits inside a `Demonstration` wrapper that is delimited by hairlines rather than boxed, and that renders the mandatory label beneath it.

### Named Rules

**The Labelled Demonstration Rule.** Every authored demonstration carries its label — rendered by the wrapper, in one place, so a figure cannot ship without it. Demonstrations show structure, relationship and state; they never assert a number, a total or a measurement, because a figure that invents data has stopped being a demonstration and started being a claim.

**The Own-Grammar Rule.** A demonstration is drawn in the website's visual language, never in a simulation of the app's interface chrome. If a figure starts acquiring status bars, tab bars, or device frames, it is drifting toward a fake screenshot and must be pulled back.

### Icons
An authored 24px outline set at `1.5` stroke, `currentColor`, round caps and joins. Eight glyphs: camera, gallery, text, saved, manual, barcode, chevron, arrow. No icon font, no unicode glyph, no emoji.

### Motion
One authored moment: the estimate bands grow from zero width over 900ms on `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 90ms per row. It is gated inside `prefers-reduced-motion: no-preference` and uses `backwards` fill, so the default state without motion is the finished state.

## Do's and Don'ts

### Do:
- **Do** commit green at page scale — a full-bleed field, a whole section band, a bleeding hero column.
- **Do** separate rows with a single hairline and let the row itself be the container.
- **Do** use the five data inks only for the quantity they already mean in the app.
- **Do** show an unknown explicitly, with the open hatched band and an em-dash rather than a zero.
- **Do** keep the display face tight (-0.038em) and genuinely large; the scale distance is the voice.
- **Do** draw any new icon into the existing 24px / 1.5-stroke set.
- **Do** keep every interaction native HTML — the build fails on a single emitted `.js` file.
- **Do** reuse the three demonstrations across pages rather than inventing a fourth; their recurrence is what makes the site read as one system.
- **Do** let a demonstration carry a section on its own. They are the evidence this site has instead of screenshots, and they deserve full width and a whole bay.

### Don't:
- **Don't** put a kicker, eyebrow, or tracked label above a heading.
- **Don't** introduce cards, boxed feature grids, or nested containers as page structure.
- **Don't** add a shadow to content, or any zero-offset colored glow. Neon and glow are recorded off-brand.
- **Don't** use a gradient anywhere, including on text.
- **Don't** add a third font weight or a second family without arguing the byte cost.
- **Don't** let a data ink become decoration, or reassign Fat Rose to an error state.
- **Don't** pass an authored demonstration off as a documentary screenshot. Stylized product demonstrations are permitted under PRODUCT.md's product-demonstration rule, but they must read as designed, depict only shipped capabilities, and keep the data inks' fixed meanings.
