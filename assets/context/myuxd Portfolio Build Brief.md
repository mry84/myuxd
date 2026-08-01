# myuxd.work — Portfolio Site Build Brief
*Claude Code Build Reference Document*

---

## Project Overview

myuxd.work — the personal portfolio of Mark Young, Senior Product Designer. A modern, minimal, content-first portfolio that tells a clear story: enterprise UX depth plus AI-directed product development as a named discipline.

The content is the star. The design serves the content. Nothing competes with it.

**Status:** built and deployed. This document now describes the site as it actually exists, not as originally planned. Sections marked **Pending** are not yet done.

---

## Tech Stack

**Vanilla HTML5 / CSS / JavaScript — no frameworks, no build step, no dependencies.**

### HTML5
- Semantic markup throughout: `<article>`, `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<figure>`, `<picture>`
- Accessibility and SEO built in by default via proper structure

### CSS
- CSS custom properties (variables) for the entire design token system — colors, type scale, spacing
- No preprocessor (no Sass, no Less)
- Mobile-first responsive layout using modern CSS (Grid, Flexbox, clamp())
- One master stylesheet: `css/styles.css`

### JavaScript
- Vanilla JS only — no React, no Vue, no jQuery, no libraries
- Used exclusively for:
  - Light/dark mode toggle with localStorage persistence
  - Nav dropdown behavior
  - Mobile menu toggle
  - Smooth scroll
  - Scroll-triggered animations via Intersection Observer API
  - **Image lightbox** (click-to-expand modal)
- One main script: `js/main.js`

### Fonts
- Google Fonts — single `<link>` import
- Roboto family only

### Deployment
- Vercel — GitHub-connected for instant deploys on push to `main`
- Repo: github.com/mry84/myuxd
- Custom domain: myuxd.work

### File Structure
```
/index.html
/resume.html
/contact.html
/work/destin-elite.html
/work/corporate-dump.html
/work/athlink.html
/work/carrier-360.html
/css/styles.css
/js/main.js
/assets/images/          — story and hero imagery (PNG source + WebP variants)
/assets/docs/athlink/    — persona PDFs, app screenshots
/assets/docs/corporatedump/  — design system PDF
/assets/docs/destinelite/    — design system PDF
```

No bundler. No npm. No node_modules. Open a file, edit it, push it, done.

> **Note:** WebP variants are generated offline (via `sharp` in a temp directory) and committed as static files. This keeps the no-build-step rule intact — nothing is generated at deploy time.

---

## Site Architecture

### Pages

1. **Landing Page** — Hero, positioning statement, featured Product Story cards, contact CTA
2. **Product Story Pages** — Individual pages per project, accessed via Work dropdown in nav
3. **Resume Page** — Full rendered page (not a download). PDF download option included on the page.
4. **Contact Page**

### Navigation

```
Work ▾  |  Resume  |  Contact
```

- Work dropdown lists all four Product Stories in order
- No standalone index/hub page for Work
- Logo or name left-aligned links back to homepage
- The current page's own entry carries `aria-current="page"`
- **All seven pages carry an identical dropdown.** Blue Force Gear was removed; Carrier 360 replaced it.

**Work dropdown order (canonical):**
1. Destin Elite Carts
2. Corporate Dump™
3. AthLink
4. Carrier 360

---

## Homepage Structure

### 1. Hero
- Name: MARK YOUNG
- Title: SENIOR PRODUCT DESIGNER
- Headline: *The gap between design decisions and working software is where I work.*
- **Full-bleed hero image** — `assets/images/home_hero.png` (device mockup of the Destin Elite Carts site and CMS across monitor, laptop, tablet, phone)
- Two CTAs: **View Work** (primary) · **Resume** (secondary)

The hero image is full-bleed behind the text, with a theme-aware scrim (`--hero-scrim`) between image and content so the overlaid type holds contrast in both light and dark mode. Without the scrim the near-white image would swallow dark-mode text.

### 2. Positioning Statement
- Leads immediately after hero — no other section between hero and this
- One tight paragraph: enterprise UX foundation + AI-directed development pivot + product thinking discipline

### 3. Featured Product Stories
Four cards in this order:

| Project | Descriptor |
|---|---|
| Destin Elite Carts | A website rebuild that became a multi-tenant CMS platform. |
| Corporate Dump™ | An anonymous workplace restroom review app, treated with complete institutional seriousness. |
| AthLink | Zero-to-one product architecture for an invite-only collegiate athlete network. |
| Carrier 360 | Lifecycle-driven mobile UX for a revenue-critical logistics marketplace supporting 175,000+ carriers. |

Each card includes project name, one-line descriptor, image frame, and a "Read Story →" link.

**Pending:** all four card images are still placeholder frames.

A fifth story (AI Transition — documenting the methodology of AI-directed design practice) is in progress and will be added later.

### 4. Contact CTA
- Simple, direct section at the bottom of the homepage
- Email link

---

## Product Story Pages

Each Product Story page follows this structure:

1. **Masthead** (eyebrow "Product Story", title, subtitle)
2. **Hero image**
3. **At a Glance table** (Role, Timeline, Stack, Tools, Key Outcomes)
4. **Overview**
5. **Project Materials** — external links and document downloads
6. **The Problem**
7. **Constraints**
8. **Key UX Decisions** (with sub-sections per decision)
9. **Results**
10. **What I'd Measure Next**
11. **Reflections**

Section names vary by story — AthLink uses *Approach* / *Key Components Delivered* / *Handoff & Recommendations*; Corporate Dump uses *The Design Challenge* / *The Core Design Principle* / *Product Decision Filter*. The story copy drives the structure, not the reverse.

Copy for all four stories is final and lives in the corresponding MD files in this folder.

### Per-page build state

| Page | Images | WebP | Lightbox | Project Materials |
|---|---|---|---|---|
| Destin Elite Carts | 4 placements, real | Yes | Yes (8 triggers) | Live Site + Design System PDF |
| Corporate Dump™ | 4 placements, real | Yes | Yes (8 triggers) | Design System PDF |
| AthLink | 4 device shots, real | **No** | **No** | Prototype + 2 persona PDFs |
| Carrier 360 | **4 placeholders** | — | — | **None** |

---

## Project Materials Section

A consistent section immediately after **Overview** on story pages that have external assets.

```html
<section class="story-section reveal" aria-labelledby="s-materials">
  <h2 id="s-materials" class="story-section__title">Project Materials</h2>
  <div class="story-materials">
    <a href="…" class="btn btn--primary" target="_blank" rel="noopener">
      Label <span aria-hidden="true">→</span>
    </a>
    <div class="story-downloads">
      <a href="…" class="btn btn--secondary" target="_blank" rel="noopener">
        Label <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>
```

- One **primary** button for the headline asset (live site / prototype / main document)
- Zero or more **secondary** buttons inside `.story-downloads`
- **All CTAs open in a new tab** (`target="_blank" rel="noopener"`) and use the `→` arrow
- The `download` attribute is **not** used — it is mutually exclusive with `target="_blank"`, and every label reads "View …"

### Current CTAs

| Page | Primary | Secondary |
|---|---|---|
| Destin Elite Carts | View Live Site → | View Design System → |
| Corporate Dump™ | View Design System → | — |
| AthLink | View Interactive Prototype → | View Personas → · View Persona Cross Reference → |
| Carrier 360 | — | — |

### PDF assets

| File | Pages | Linked from |
|---|---|---|
| `assets/docs/destinelite/design-system.pdf` | 6 | Destin Elite Carts |
| `assets/docs/corporatedump/ds.pdf` | 8 | Corporate Dump™ |
| `assets/docs/athlink/Personas.pdf` | — | AthLink |
| `assets/docs/athlink/Personas-Cross Reference.pdf` | — | AthLink |

---

## Image Pipeline

All real imagery uses a `<picture>` element: WebP as the primary source, the original PNG as fallback.

```html
<picture>
  <source
    type="image/webp"
    srcset="../assets/images/name.webp     1200w,
            ../assets/images/name@2x.webp  2400w"
    sizes="(min-width: 1140px) 1044px, 100vw"
  />
  <img src="../assets/images/name.png" alt="…" width="…" height="…" loading="lazy" />
</picture>
```

### Rules
- Two WebP variants per source: a standard width and an `@2x` retina width
- `w` descriptors plus an accurate `sizes` attribute — the browser picks
- `width`/`height` on the `<img>` always match the PNG's intrinsic size to reserve layout space (both variants share the PNG's aspect ratio, so the reservation holds either way)
- Above-the-fold images: `loading="eager"` plus `fetchpriority="high"`. Everything else `loading="lazy"`
- Quality 90, `effort: 6`
- In practice no current browser ever requests the PNG — it exists purely as a fallback

### Variant widths in use

| Image type | Standard | @2x |
|---|---|---|
| Homepage hero (3000×2000) | 1800w | 2560w |
| Landscape screenshots (Destin) | 1200w | 2400w (or native) |
| Portrait phone shots (Corporate Dump, 1449×2959) | 760w | 1449w (native) |

### Layout classes
- `.shot` — a single figure; `.shot__btn` is the lightbox trigger; `.shot__img` the image
- `.shot-grid` — one column on mobile, **two** from 720px
- `.shot-grid--trio` — one column on mobile, **three** from 720px
- `.shot--phone` — portrait phone shots, capped and centered on a `--bg-secondary` panel (a 1:2 image at full container width would render over 2000px tall)
- `.shot--feature` — a standalone phone shot, capped slightly larger (380px)

---

## Lightbox

Click-to-expand modal for story images. Vanilla JS in `js/main.js`, built lazily on first open so pages without images pay nothing.

### Markup contract
The trigger is a `<button class="shot__btn" data-lightbox>` wrapping the `<picture>`, carrying:
- `data-full` — the `@2x` WebP shown in the overlay
- `data-full-fallback` — the PNG

A `<button>` rather than a bare image so it is keyboard reachable; its accessible name comes from the inner `<img alt>`.

### Behavior
- Opens on click, showing a higher-resolution file than the inline thumbnail
- Closes on the × button (top right), on a click outside the image, and on Escape
- Focus moves to the close button on open and returns to the trigger on close
- Tab is trapped inside while open
- Background scroll is locked while open
- Backdrop is `rgba(0, 0, 0, 0.9)`; the image is capped to the viewport so tall portrait shots never overflow

---

## Placeholder Image Spec

Still applies to the four homepage cards and the four Carrier 360 slots.

No third-party image services (no Unsplash, no Picsum, etc.).

All image placeholders are:
- Styled `<div>` frames with a background color
- Centered label text describing the intended image content
- Light mode color: `#C8D0D8`
- Dark mode color: `#2A2A2A`
- Label text color: `#888888`
- Example label: `[ Hero device mockup — Corporate Dump app screens ]`

---

## Design System

### Color Tokens

| Token | Light Mode | Dark Mode |
|---|---|---|
| Background primary | `#FFFFFF` | `#0D0D0D` |
| Background secondary | `#F5F5F5` | `#1A1A1A` |
| Text primary | `#111111` | `#F5F5F5` |
| Text secondary | `#555555` | `#999999` |
| Accent | `#0066FF` | `#0066FF` |
| Border | `#E4E4E4` | `#262626` |
| Placeholder frame | `#C8D0D8` | `#2A2A2A` |
| Placeholder label | `#888888` | `#888888` |
| Hero scrim | `rgba(255,255,255,0.6)` | `rgba(13,13,13,0.68)` |

- Accent color used sparingly: CTAs, active nav states, links, key highlights only
- Light mode is default
- Dark mode toggle persistent via localStorage, set pre-paint by an inline script in `<head>` to avoid a flash

### Typography — Roboto Family (Google Fonts)

| Role | Weight | Notes |
|---|---|---|
| Hero / Display | Bold or Black | Large, tight letter-spacing |
| Section headers | Medium | Uppercase, wide letter-spacing |
| Body | Regular | Line height ~1.6 |
| Labels / captions | Light or Mono | Technical details, At a Glance table |

### UI Principles

- Generous white space — content breathes
- No decorative elements competing with content
- Accent color as a touch, not a coat
- Sharp edges throughout — no rounded corners except buttons (4px radius, not pill)
- Subtle hover states — no flashy animations
- Mobile-first, fully responsive
- Smooth scroll
- Consistent card styling across Product Story cards

---

## Animation

### Approach
Scroll-triggered entry animations only. Implemented via the **Intersection Observer API** — no libraries, pure vanilla JS.

### Primary Animation: Fade Up
- Elements start slightly below their final position and at zero opacity
- On viewport entry: rise into position and fade to full opacity
- Duration: ~400ms · Easing: ease-out
- Applied to: section headings, body content blocks, individual cards

### Staggered Fade Up
- Used on grouped elements: Product Story card grids, list items
- Sequential delay between each child element (~80–100ms stagger)

### Hero Animation
- Hero content animates on page load, not scroll
- Name, title, headline, and CTA buttons sequence in with a short stagger

### Rules
- Animation on scroll **entry only** — no exit animations
- Duration kept short: 350–450ms max
- No bouncing, no elastic easing, no overshooting
- Respect `prefers-reduced-motion` — all animations disabled for users who have this set
- No animation libraries (no GSAP, no AOS, no Framer Motion)

---

## Resume Page

- Full rendered page — not a PDF embed
- Sections: Summary, AI-Directed Product Development, Independent Work, Enterprise Leadership, Earlier Experience, Expertise, Tools, Certifications, Military, Education
- Includes a **Download PDF** button
- Typography and layout should feel like a designed document, not a plain web page

**Pending:** the Download PDF button points at `assets/Mark-Young-Resume.pdf`, which does not exist in the repo. That button currently 404s.

---

## Contact Page

- Simple, clean
- Email address
- Links to: LinkedIn, GitHub, X/Twitter (@corporatedump2)

---

## Homepage Copy

### Hero Headline
The gap between design decisions and working software is where I work.

### Positioning Statement
Good design decisions mean nothing if they sit in a Figma file. I spent 15 years designing enterprise software at scale — logistics marketplaces, design systems, high-density mobile workflows. Then I rebuilt my practice around a single idea: the designer should be able to ship. I use AI-directed development to move from product thinking to production software in days instead of months, while keeping full ownership of UX strategy, accessibility, and long-term quality.

---

## Tone & Feel

- Modern, sharp, minimal
- Serious and institutional — matches the product work it's showcasing
- No gimmicks, no personality quirks in the UI
- The content provides the personality
- Feels like a product, not a resume dressed up as a website

---

## Assets & Content Status

| Item | Status |
|---|---|
| Destin Elite Carts — copy | Final, live on page |
| Corporate Dump™ — copy | Final, live on page |
| AthLink — copy | Final, live on page |
| Carrier 360 — copy | Final, live on page |
| Blue Force Gear | **Cut.** Replaced by Carrier 360 |
| AI Transition Story | In progress — not yet written |
| Resume copy | Final, live on page |
| Hero headline | Final |
| Positioning statement | Final |
| Homepage hero image | Real image, WebP + retina |
| Destin Elite Carts images | Real, WebP + lightbox |
| Corporate Dump™ images | Real, WebP + lightbox |
| AthLink images | Real, but **PNG only, no lightbox** |
| Carrier 360 images | **Placeholders only** |
| Homepage card images | **Placeholders only** |
| PDF resume | **Missing** — button 404s |

---

## Known Gaps

Carried forward so they aren't lost:

1. **Carrier 360 has no real images** — four placeholders remain, and no Project Materials section.
2. **Homepage story cards are all placeholders** — the only real image on the homepage is the hero.
3. **AthLink images are inconsistent with the rest of the site** — they are `.PNG` files served from `assets/docs/athlink/`, not `assets/images/`, with no WebP variants and no lightbox. The other two story pages have both.
4. **`assets/Mark-Young-Resume.pdf` does not exist** — the resume page's Download PDF button 404s.
5. **`index.html` has no favicon** — every page logs a `/favicon.ico` 404.
6. **PNG fallbacks are heavy.** Roughly 17MB of source PNG is committed purely as `<picture>` fallback that no current browser requests. Dropping them would cut the repo substantially.
7. **`.gitignore` line 8 reads `assests/context/`** — a typo for `assets/context/`. Inert today because these source MD files live outside the repo, but it will not do what it intends if they are ever copied in.

---

## Reference

- Live: myuxd.work (Vercel, deploys from `main`)
- Repo: github.com/mry84/myuxd
- X/Twitter: @corporatedump2
- corporatedump.com — live on Vercel (separate project, not part of this build)
- destin-elite-carts.vercel.app — live client site, linked from the Destin story

---

*Build reference v2.0 — updated July 31, 2026 to match the deployed site.*
