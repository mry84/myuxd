# DESTIN ELITE CARTS
*Product Story — Website Rebuild + Multi-Tenant CMS Platform*

---

## AT A GLANCE

| | |
|---|---|
| **Role** | Solo Product Designer + AI-Directed Developer |
| **Timeline** | June 2026 |
| **Stack** | HTML · CSS · Vanilla JavaScript · JSON · File System Access API · Git |
| **Tools** | Claude · Claude Code |
| **Key Outcomes** | 8-page production site shipped · Custom booking flow eliminated third-party redirect · Content updates reduced from developer-dependent to self-serve in under 5 minutes · Multi-tenant CMS architecture ready for second client |

---

## Overview

Destin Elite Carts is a golf cart rental business operating in Destin, Florida. The existing website was outdated, dependent on a third-party booking system, and offered no way for the business owner to manage content without developer involvement.

The engagement had two phases:

1. **Rebuild the consumer-facing website** — modern, fast, and built to convert
2. **Build a CMS** — so the business owner could manage the site without touching code

What started as a website project became a product architecture project.

---

## Project Materials

- **View Live Site →** — https://destin-elite-carts.vercel.app/index.html (opens in a new tab)
- **View Design System →** — `assets/docs/destinelite/design-system.pdf` (6 pages, opens in a new tab)

---

## The Problem

**For the customer:**
- Outdated site that didn't reflect the quality of the product
- Booking experience redirected to an external third-party system with no visual continuity
- No easy way to browse the fleet and understand what they were renting

**For the business owner:**
- Every content change required a developer
- Cart inventory, pricing, hours, and contact info were scattered and inconsistent across pages
- No control over the site without technical help
- Dependent on BookingCentral for all reservations — an external system with limited customization

**The core insight:**
The website wasn't just a marketing problem. It was an operations problem. The business owner needed ownership of her own content.

---

## Constraints

- **Time:** Initial website build completed in a single focused build session. CMS POC scoped to 5 hours
- **Stack:** Plain HTML/CSS/JS — no frameworks, no build step, no backend server
- **Budget:** No third-party services beyond what was already in use
- **Audience:** Business owner is technically capable but time-constrained across multiple companies

---

## Phase 1: Website Rebuild

### Approach

Rather than redesign from scratch, the existing site was audited for content, structure, and user flow. Key decisions were made before writing a single line of code:

- **Keep the stack simple** — HTML/CSS/JS only. Easier to hand off, faster to build, no framework overhead
- **Replace BookingCentral** — build a custom booking UX that keeps the customer on-site
- **Match existing navigation** — the business owner had already introduced the new site to customers. Changing the nav structure caused confusion in early review. Match what exists, modernize the presentation

### Key UX Decisions

**Navigation**
Preserved the existing nav structure after client feedback flagged confusion with the rebuilt version. Added "Available Carts" as a dedicated page — a new addition that didn't exist on the original site.

**Hero Section**
Stripped back a complex hero with multiple CTAs, stat strips, and body copy to a single focused message:
- Logo
- Heading: *Welcome to Destin Elite Carts!*
- One CTA: *Reserve a Cart*

Beach photography with a frosted glass container replaced a flat blue gradient. The result felt coastal and premium without being overdesigned.

**Cart Fleet**
Named carts (Blue Lagoon, Lady Bug, Thunderball, etc.) are a core part of the brand. Each cart got its own photo, personality blurb, and a More Info modal with full details — pulling customers into the product rather than pushing them directly to booking.

Home page carousel shows active carts only. Available Carts page shows full inventory with filtering by power type and passenger count.

**Customer Reviews**
Moved from a static grid to a carousel with modal expansion. "Read More" opens a full review in a modal rather than expanding the card — cleaner on mobile, better for longer reviews.

**Booking Flow**
Replaced the BookingCentral redirect with a custom 4-step booking flow:
1. Select date (calendar)
2. Select rental length (with live pricing)
3. Delivery/pickup time
4. Additional options (delivery address, add-ons, insurance)

Live order summary sidebar updates in real time as selections are made. No values populate until the user has actually made the corresponding selection — a deliberate guard against premature price display.

**Rules Page**
Original legal/policy content was preserved verbatim. A known pain point with AI-assisted development is invented content on legal pages. All copy was sourced directly from the live site and verified before publishing.

**Services Page**
Same approach — exact original pricing and service descriptions used. No paraphrasing.

### Design System

A single stylesheet with CSS custom properties as design tokens. Ocean blue + white primary. Sand/coral accents. Fluid sizing via `clamp()`. Pill buttons, hover-lift cards, scroll-reveal animations.

All page heroes use local banner images — no third-party API URLs that could break. Cart images organized in `Images/carts/` with a consistent naming convention for easy replacement.

---

## Phase 2: CMS — Control Center

### The Problem with Static Sites

The website looked great. But every content change — a price update, a new cart, corrected hours — required opening a code editor. For a business owner running multiple companies, that's not sustainable.

The question became: *what information changes frequently enough that the business owner shouldn't have to call a developer?*

- Cart inventory (new carts, status changes, pricing)
- Hero copy and page content
- Contact info and hours
- Brand colors and logos
- Partner listings

That list became the feature set.

### Architecture Decision: Local-First JSON

**Options considered:**
- Supabase (hosted database, auth, API)
- Firebase (already in use on another project)
- Local JSON files

**Decision:** Local-first JSON for the POC.

**Reasoning:**
- Fastest to build and prove
- No third-party dependencies
- The File System Access API (a modern browser capability) handles writing files directly from the browser
- Schema designed to migrate to a hosted backend later without rewriting the app

### Multi-Tenant From Day One

The CMS wasn't built for Destin Elite Carts. It was built for *any* site.

A multi-site registry (`data/sites.json`) acts as the top-level directory. Each client gets a per-site folder (`data/sites/destin-elite/content.json`). Adding a second client is a folder and a registry entry — not a rewrite.

This decision was made on day one before a single CMS screen was designed.

### The Control Center

**Sites Dashboard (`cms/index.html`)**
Landing page showing all managed sites. Table view by default, grid view toggle. Each site shows name, domain, status badge, and last updated date. One click to enter a site's editor.

**Site Control Center (`cms/site.html`)**
Fixed left sidebar navigation — no doom-scroll. Each section is its own focused view:

- **Dashboard** — operational stats (total carts, active carts, carts missing photos, partners, last updated)
- **Fleet** — table/grid toggle, status badges, slide-in edit panel, visual image picker
- **Partners** — partner listings with logo paths and URLs
- **Content** — homepage copy, taglines, hero heading, CTA text
- **Contact & Hours** — NAP (name/address/phone), social links, hours table
- **Brand & Theme** — logo paths, color palette with visual swatches

**Fleet Manager**
The centerpiece of the CMS. Table view shows all carts with photo thumbnails, power type, seat count, nightly rate, and color-coded status badges:
- 🟢 Active — visible on consumer site
- 🔴 Inactive — hidden from consumer site, manageable in admin
- 🟡 Maintenance — out for repair
- ⚫ Retired — permanently removed, kept for records

Edit panel slides in from the right — no navigation away from the page. Visual image picker shows thumbnails of all existing cart photos pulled directly from `Images/carts/`. Click to assign.

**The Save Model**
A deliberate two-level save:
1. **Panel "Save Cart"** — updates in-memory, re-renders the table
2. **Header "Save Changes"** — writes to `content.json` via the File System Access API

Changes reflect on the consumer site on reload.

### Consumer Rendering Engine

`js/content.js` — a ~230-line vanilla JS data-binder that:
- Fetches `content.json` on page load
- Injects brand colors into CSS custom properties site-wide
- Renders fleet inventory dynamically on both the home carousel and Available Carts page
- Filters active carts only for the consumer site
- Degrades gracefully to static HTML if the data layer fails (progressive enhancement)

### A Bug Worth Documenting

During Brand & Theme testing, a save wrote the content model to `data/sites.json` (the registry) instead of `data/sites/destin-elite/content.json`. The registry was corrupted. The CMS crashed.

**Diagnosis:** The File System Access API save target isn't locked — whatever file the user picks gets written to.

**Fix:** A write-target guard in `editor.js` that validates the filename before writing. If the picked file isn't named `content.json`, the save is rejected, the handle is cleared, and the user is re-prompted.

This is the kind of bug that only surfaces in real use — and the kind of fix that makes a prototype production-ready.

---

## Results

**Consumer site:**
- 8-page production website shipped
- Custom 4-step booking flow keeping customers on-site
- Fleet of 11 named carts with real photography
- Reviews carousel with modal expansion
- Fully responsive

**CMS:**
- Working end-to-end — edit in CMS → save → consumer site reflects changes on reload
- Content updates reduced from developer-dependent to self-serve in under 5 minutes
- Fleet management with active/inactive filtering
- Site-wide brand color theming from a single edit
- Visual image picker from existing site assets
- Multi-tenant architecture ready for second client

---

## What I'd Measure Next

- **Booking conversion rate** — does the custom flow convert better than the BookingCentral redirect?
- **Time-to-content-update** — baseline how long updates actually take versus the developer-dependent model
- **CMS session frequency** — how often is the business owner actually using it? Low frequency could signal friction; high frequency validates the investment
- **Second client onboarding time** — the real proof of the multi-tenant architecture is how long it takes to add client two

---

## Reflections

The most important UX decision on this project wasn't a design decision. It was an architecture decision: *build a system, not a website.*

A website serves one business. A system serves many. Choosing multi-tenancy on day one — when the scope was still "rebuild destinelitecarts.com" — is the difference between a project and a platform.

The other lesson: the business owner's time is the scarcest resource. Every feature in the CMS was evaluated against one question: *does this eliminate a reason to call a developer?* If yes, build it. If no, defer it.

That filter produced a focused, functional tool in 5 hours.

---

*Stack: HTML · CSS · Vanilla JavaScript · JSON · File System Access API · Git*  
*Tools: Claude · Claude Code*  
*Timeline: June 2026*
