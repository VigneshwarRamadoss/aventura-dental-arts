# UI/UX Design Brief
## Aventura Dental Arts — Premium Dental Website
**Version**: 1.0  
**Author**: Senior UX Lead  
**Status**: Production-Ready  
**Last Updated**: 2026-05-19

---

## 1. Design Vision

### Guiding Principle
> "Restrained luxury — the confidence to leave space."

Aventura Dental Arts is not a typical dental website. It should feel like entering a premium private medical studio: calm, authoritative, and deeply considered. Every pixel serves a purpose. The design does not sell aggressively — it invites trust through refinement.

The visual DNA is:
- **Dark-first** — comfort, sophistication, clinical calm.
- **Typographically driven** — huge serif headlines do the heavy lifting.
- **Warmly accented** — bronze breaks the monochrome without shouting.
- **Spacious** — emptiness is a design element, not a mistake.

---

## 2. Design System Summary

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `charcoal` | `#14151D` | Primary background — dominant surface |
| `near-black` | `#101013` | Depth variation, darkest surface |
| `bronze` | `#B38C61` | Luxury accent — decorative elements only |
| `light-beige` | `#EAE8E8` | Primary text on dark, button surfaces |
| `off-white` | `#DAD5D3` | Card backgrounds, warm surface |
| `dark-gray` | `#424346` | Secondary text, icon color |
| `error-red` | `#FF3C3C` | Form errors only — never decorative |
| `white` | `#FFFFFF` | Maximum contrast; button text on light BG |

### Typography

| Use | Typeface | Size | Weight |
|-----|----------|------|--------|
| Hero headline | InstrumentSerif | 276px → 83px (responsive) | 400 |
| Page headline | InstrumentSerif | 153px → 83px | 400 |
| Section headline | InstrumentSerif | 83px → 48px | 400 |
| Navigation / Links | InstrumentSerif | 16px | 400 |
| Body copy | InterTight | 14px | 500 |
| Labels / UI text | InterTight | 14px | 700 |
| Form inputs | Arial | 13.33px | 400 |

### Spacing Scale (4px base)
`4 · 8 · 12 · 16 · 24 · 28 · 32 · 40 · 44 · 48 · 64 · 72px`

### Border Radius Rules
- `0px` — all buttons (secondary), navigation, links, text elements
- `50%` — circular badge cards (94px × 94px)
- `64px` — primary CTA buttons (pill shape only)
- `40px 40px 0 0` — modals and drawers (top corners only)

---

## 3. Component Design Specifications

### 3.1 Navigation Bar

**Desktop**
```
Height: 80px
Background: transparent → rgba(20,21,29,0.95) + blur(12px) on scroll
Logo: left-aligned, max-height 40px, SVG
Links: InstrumentSerif 16px, #EAE8E8, spacing: 32px between items
Hover: color → #FFFFFF, bottom underline 1px #B38C61
CTA Button: pill (64px radius), bg #EAE8E8, text #FFFFFF, 48px height
Position: sticky top:0, z-index:50
```

**Mobile (< 1024px)**
```
Height: 64px
Hamburger: 3-line icon, 24px, #EAE8E8
Tap area: 48×48px minimum
Open state: full-screen overlay, bg #14151D
Links: centered, 24px apart, 32px font size (InstrumentSerif)
CTA: full-width pill button at bottom of menu
Close: X icon top-right, 48px tap target
Animation: slide-in from right (Framer Motion, 300ms ease-out)
```

---

### 3.2 Hero Section

```
Height: 100svh (full screen)
Layout: centered (text) over full-bleed photography
Overlay: linear-gradient(rgba(14,15,21,0.7), rgba(14,15,21,0.9))

Content structure (centered):
  ├─ Eyebrow tag: InterTight 14px, #B38C61, letter-spacing 0.1em uppercase
  ├─ Headline: InstrumentSerif 276px / 153px / 83px (responsive)
  │   Color: #EAE8E8, centered
  ├─ Divider: 1px horizontal line, 60px wide, #B38C61
  ├─ Sub-headline: InterTight 14px, #EAE8E8/80%, max-width 560px, centered
  ├─ CTA group (flex row, 16px gap):
  │   ├─ Primary: pill button, bg #EAE8E8, text #FFFFFF, "Book Appointment"
  │   └─ Secondary: transparent button, text #EAE8E8, "View Services →"
  └─ Scroll indicator: thin line + "Scroll" label, #B38C61/60%, bouncing animation

Entry animation (Framer Motion):
  eyebrow: fadeIn 0.4s delay 0.1s
  headline: fadeUp 0.6s delay 0.2s
  divider: scaleX from 0 to 60px, 0.4s delay 0.5s
  sub: fadeUp 0.4s delay 0.6s
  CTAs: fadeUp 0.4s delay 0.7s
```

---

### 3.3 Primary CTA Button

```
Background: #EAE8E8
Text: #FFFFFF (white on light bg — ensure contrast with text-shadow if needed)
Font: InstrumentSerif, 16px, weight 400
Height: 48px
Padding: 16px 32px
Border Radius: 64px (pill)
Border: none

States:
  Default: bg #EAE8E8
  Hover:   bg #DAD5D3, transition 200ms ease
  Active:  bg #D6D1D0, scale(0.98)
  Focus:   outline: 2px solid #B38C61, outline-offset: 2px
  Loading: spinner icon + dims to 70% opacity
  Disabled: opacity 40%, cursor not-allowed
```

---

### 3.4 Service Card

```
Background: #20232B (slightly lighter than page bg)
Border: 1px solid #424346 (subtle)
Border Radius: 0px
Padding: 32px
Hover: border-color → #B38C61, transform translateY(-2px), transition 200ms

Content structure:
  ├─ Icon: 32×32px SVG, #B38C61
  ├─ Title: InstrumentSerif 24px, #EAE8E8
  ├─ Description: InterTight 14px, #424346, 2–3 lines
  └─ "Learn More →": InterTight 14px, #B38C61, underline on hover

Grid: 3 columns (desktop) / 2 columns (tablet) / 1 column (mobile)
Gap: 24px
```

---

### 3.5 Circular Badge Card

```
Shape: circle, 94px × 94px (desktop), 72px (mobile)
Background: #DAD5D3
Border: 3px solid #EAE8E8
Border Radius: 50%
Content: centered icon (24px) or abbreviated number (#B38C61)
Label below circle: InterTight 14px, #EAE8E8, centered
Hover: background → #E9E7E7

Use cases:
  - Trust signals (rating, years, patients served)
  - Benefits of a service
  - Process step indicators
Group: max 4 per row, 28px gap
```

---

### 3.6 Testimonial Card

```
Background: #14151D
Border: 1px solid #424346
Padding: 40px
Border Radius: 0px

Content:
  ├─ Quote mark: InstrumentSerif 48px, #B38C61, opacity 60%
  ├─ Review text: InterTight 14px, #EAE8E8, italic
  ├─ Divider: 1px solid #424346
  ├─ Patient name: InstrumentSerif 16px, #EAE8E8
  ├─ Star rating: 5 gold stars, #B38C61
  └─ Source: InterTight 14px, #424346, "via Google"

Carousel behavior (mobile): swipe-enabled, 1 card visible
Desktop: 3 cards visible, auto-rotate every 6s, pause on hover
```

---

### 3.7 Appointment Form

```
Container: max-width 640px, centered
Background: #14151D
Padding: 48px (desktop) / 24px (mobile)

Input fields:
  Background: transparent
  Text: #EAE8E8, InterTight 15px
  Border: none (bottom only: 1px solid #424346)
  Height: 64px
  Padding: 0 0 0 0 (bottom border only)
  Focus: bottom border → 1px solid #EAE8E8
  Placeholder: #424346
  Error state: bottom border → 1px solid #FF3C3C + error message below

Label: InterTight 14px, #424346, uppercase 0.05em tracking

HIPAA Consent:
  Checkbox: custom styled, 20×20px, border #424346
  Checked: bg #B38C61, checkmark #FFFFFF
  Label text: InterTight 13px, #424346 (legal copy)

Submit Button: full-width pill, primary button style
```

---

### 3.8 Footer

```
Background: #DAD5D3 (warm light — contrast to dark page)
Text: #14151D
Padding: 72px (desktop) / 40px (mobile)

Layout (4 columns desktop / 2 columns tablet / 1 column mobile):
  Col 1: Logo + practice tagline + social icons
  Col 2: Quick links (services)
  Col 3: Patient resources links
  Col 4: Hours + address + phone

Link style: InstrumentSerif 16px, #14151D, hover → #424346
Bottom bar: copyright + privacy policy + terms, InterTight 13px, #424346

Bronze accent line: 1px solid #B38C61, top border of footer
```

---

## 4. Page-Level Design Specs

### 4.1 Homepage Section Order & Sizing

| # | Section | Background | Min Height |
|---|---------|------------|------------|
| 1 | Navigation | Transparent → charcoal | 80px |
| 2 | Hero | Charcoal + photo overlay | 100svh |
| 3 | Trust Strip | Near-black `#101013` | 100px |
| 4 | Services Overview | Charcoal | 600px |
| 5 | About Teaser | Near-black | 500px |
| 6 | Before & After | Charcoal | 600px |
| 7 | Testimonials | Near-black | 400px |
| 8 | Booking CTA | Bronze-tinted: `rgba(179,140,97,0.08)` | 300px |
| 9 | Blog Preview | Charcoal | 400px |
| 10 | Footer | Off-white `#DAD5D3` | 280px |

---

### 4.2 Before & After Gallery Design

```
Filter bar: pill-shaped tabs (64px radius), inactive: border #424346, active: border #B38C61
Grid: masonry or 3-col even grid, 16px gap
Image card:
  ├─ Aspect ratio: 4:3 or 1:1
  ├─ Hover: scale(1.02), bronze overlay gradient from bottom
  ├─ Label: service type, InterTight 14px, #EAE8E8 on overlay
  └─ "Before / After" toggle pill on lightbox

Lightbox:
  Background: rgba(0,0,0,0.92)
  Image display: side-by-side (desktop) / stacked toggle (mobile)
  Close button: X, top-right, #EAE8E8
  Navigation: arrow buttons, #EAE8E8
  Caption: InterTight 14px, #424346
```

---

## 5. Motion & Animation Principles

### Philosophy
Animations are **purposeful, not decorative**. They guide attention, confirm actions, and reveal structure — never distract or delight for their own sake.

### Animation Library: Framer Motion

| Animation Type | Duration | Easing | Use Case |
|---------------|----------|--------|---------|
| Fade Up (entry) | 0.5–0.7s | easeOut | Page sections on scroll enter |
| Fade In (content) | 0.3–0.4s | easeOut | Text, images revealing |
| Scale Up (cards) | 0.2s | easeOut | Card hover states |
| Slide In (mobile menu) | 0.3s | easeOut | Navigation drawer |
| Stagger children | 0.1s between | — | Service cards, badge groups |
| Parallax (hero) | continuous | linear | Hero image subtle drift |
| Lightbox open | 0.25s | easeOut | Gallery, modals |
| Button press | 0.1s | easeIn | Active state scale(0.98) |

### Scroll-Triggered Reveals (Intersection Observer)
- All major sections: fade-up on enter, no exit animation.
- Threshold: 0.1 (triggers when 10% of section is visible).
- Once: animations fire once only (no re-trigger on scroll up).

### Performance Rules
- Animate only `transform` and `opacity` — no layout-triggering properties.
- `will-change: transform` on hero image.
- Respect `prefers-reduced-motion` — disable all non-essential animations.

---

## 6. Responsive Design Specs

### Breakpoint Behavior

**Mobile (320–639px)**
- Single-column layout throughout.
- Hero headline: 83px InstrumentSerif.
- Navigation: hamburger menu (full-screen overlay).
- All cards: 100% width, stacked.
- Padding: 24px horizontal.
- Touch targets: min 48×48px.
- Badge circles: 72px diameter.

**Tablet (640–1023px)**
- 2-column cards in services, gallery.
- Hero headline: 153px.
- Navigation collapses to hamburger.
- Padding: 32px horizontal.
- Form: full-width.
- Badge circles: 94px (maintained).

**Desktop (1024–1439px)**
- 3–4 column cards.
- Hero headline: 153px (can push to 276px on large desktop).
- Full horizontal navigation.
- Max container: 1200px, centered.
- Padding: 48–72px sections.

**Large Desktop (1440px+)**
- Hero headline: 276px (if design permits).
- Container locked at 1200px with generous side margins.
- Side margins: auto (centered).

---

## 7. Accessibility Design Specs

### Color Contrast Ratios
| Pair | Ratio | WCAG Standard |
|------|-------|---------------|
| `#EAE8E8` on `#14151D` | 13.2:1 | AAA ✓ |
| `#FFFFFF` on `#14151D` | 16.1:1 | AAA ✓ |
| `#424346` on `#EAE8E8` | 5.8:1 | AA ✓ |
| `#B38C61` on `#14151D` | 4.9:1 | AA ✓ |
| `#FFFFFF` on `#B38C61` | 2.8:1 | FAIL — never use as text combo |

### Focus Indicators
- All focusable elements: `outline: 2px solid #B38C61; outline-offset: 2px`
- Never remove focus outlines without replacement.
- Mobile menu focus trap: enabled when open.
- Lightbox focus trap: enabled when open.

### Semantic HTML Requirements
- `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` landmarks.
- `<h1>` on every page (one only), `<h2>` through `<h4>` for hierarchy.
- `<button>` for all interactive elements (not div/span).
- `aria-label` on icon-only buttons.
- `aria-expanded` on accordion/menu toggles.
- `role="dialog"` + `aria-modal="true"` on lightbox/modal.
- `alt` text on all images; `alt=""` on decorative images.
- `<label>` for all form inputs (linked via `for`/`id`).

---

## 8. Design Deliverables Checklist

### Figma File Structure (for Designer)
```
📁 Aventura Dental Arts — Design System
  ├── 🎨 Styles (Colors, Typography, Effects)
  ├── 🧩 Components
  │   ├── Buttons (all states)
  │   ├── Inputs (default, focus, error)
  │   ├── Cards (service, testimonial, blog)
  │   ├── Badge circles
  │   ├── Navigation (desktop + mobile)
  │   └── Footer
  ├── 📄 Pages
  │   ├── Homepage (desktop + mobile)
  │   ├── Service Page (desktop + mobile)
  │   ├── About Page
  │   ├── Gallery Page
  │   ├── Blog List + Post
  │   ├── Patient Resources
  │   └── Contact Page
  └── 🔄 Prototypes (key user flows)
```

### Required Design Deliverables
- [ ] Figma component library (linked to tokens)
- [ ] High-fidelity mockups — all 8 page types (desktop + mobile)
- [ ] Interactive prototype — booking flow
- [ ] Responsive specs annotations
- [ ] Handoff: inspect-ready with spacing, colors, typography exported
- [ ] Asset export: SVG icons, image placeholders, logo variants

---

## 9. Design Review Criteria

Before any page is approved for development, it must satisfy:

1. **Contrast**: All text passes WCAG AA (4.5:1 minimum).
2. **Touch targets**: All interactive elements ≥ 48×48px on mobile.
3. **Whitespace**: No section has < 24px internal padding.
4. **Typography**: Only InstrumentSerif for 16px+ display; InterTight for body.
5. **Bronze usage**: Bronze (#B38C61) used ≤ 3 times per section (accent only).
6. **CTA presence**: Every page/screen has at least one primary CTA visible.
7. **Consistency**: All buttons follow component specs exactly; no ad-hoc styles.
8. **Responsive**: Design reviewed at 375px, 768px, 1280px, 1440px.
9. **Motion**: All animations respect `prefers-reduced-motion`.
10. **Imagery**: All photography uses dark overlay; no raw images on charcoal.
