# RESPONSIVE — NEO-BRUTALISM SKILL

## The Prime Directive: Keep the Punk on Mobile

The aesthetic must survive every screen size. Thick borders, hard shadows, and
bold uppercase text do NOT disappear on mobile. The design adapts in size and
layout, never in character.

A mobile neo-brutalist page should still look loud and rebellious.
It should NOT look like a generic mobile app.

---

## Breakpoints (Tailwind defaults)

| Name | px | When to use |
|---|---|---|
| base | 0px | Mobile first |
| sm | 640px | Large phones, small tablets |
| md | 768px | Tablets |
| lg | 1024px | Desktops |
| xl | 1280px | Large desktops |

---

## Typography Scaling

| Element | Mobile | Desktop |
|---|---|---|
| Hero h1 | `font-size: clamp(40px, 10vw, 96px)` | 96px–128px |
| Section h2 | `text-4xl` (36px) | `text-6xl` (64px) |
| Subsection h3 | `text-3xl` (30px) | `text-4xl` (48px) |
| Body | `text-base` (16px) | `text-lg` (18px) |
| Labels | `text-xs` (12px) | `text-sm` (14px) |
| Stat numbers | `text-5xl` (48px) | `text-7xl` (72px) |

**Always use `clamp()` for hero headlines** — they must scale smoothly across
all widths without hard breakpoint jumps.

---

## Layout Transformations

### Navbar
- Mobile: 64px height, logo + hamburger only (no desktop links visible)
- Desktop: 72px height, full horizontal nav
- Mobile menu: full-width dropdown with stacked bordered links
- Logo sticker: always visible, always rotated -1 to -2 degrees

### Hero
- Mobile: single column, headline first, visual chaos zone below
- Desktop: 50/50 grid, headline left, chaos zone right
- Command pill: `overflow: auto` on mobile — horizontal scroll if needed
- CTA buttons: full-width stacked on mobile, inline row on desktop

### Stats
- Mobile: 2×2 grid
- Desktop: 4-column single row
- Stat values: scale down but stay large (`text-4xl` minimum on mobile)

### Features
- Mobile: single column, all cells stacked
- Tablet: 2-column grid
- Desktop: 3-column grid

### Pricing
- Mobile: single column, stacked cards
- Tablet: still single column (pricing cards need room)
- Desktop: 3-column grid
- "Most Popular" badge: stays absolute positioned on all sizes

### CTA Banner
- Mobile: headline above buttons, stacked
- Desktop: headline and buttons side by side
- Button: `width: 100%` on mobile

### Footer
- Mobile: stacked center-aligned
- Desktop: three-column space-between row

---

## Components

### Buttons
```
Mobile:  height: 48px, full width for primary CTAs
Desktop: height: 52–60px, auto width
Push offset: stays 4–6px — same mechanic on all sizes
```

### Cards
```
Mobile:  shadow: 6px 6px 0 #000  (slightly smaller)
Desktop: shadow: 8px–12px 8px–12px 0 #000
Hover lift: only on desktop (hover not meaningful on touch)
```

### Nav Link hover states
```
Mobile: N/A — links are in dropdown, no hover
Desktop: full border+background snap on hover
```

### Inputs
```
All sizes: height minimum 52px (touch-friendly)
Font size: 16px minimum (prevents iOS auto-zoom)
```

---

## What MUST NOT Change at Any Breakpoint

| Rule | Reason |
|---|---|
| `border-4 border-black` on all elements | Removes if borders shrink to border-2 |
| `#000000` pure black borders | Never lighten borders on mobile |
| `#FFFDF5` cream canvas | Never swap to white on mobile |
| Hard zero-blur shadows | Never add blur on mobile for "performance" |
| Space Grotesk font | Never fall back to system fonts |
| UPPERCASE text | Never switch to sentence case on mobile |
| Hard button push mechanic | Touch devices: use `onTouchStart/End` |
| At least one texture | Never remove all texture on mobile |
| Color-blocked sections | Sections keep their color backgrounds on mobile |

---

## Performance Notes

Hard shadows (`box-shadow: 8px 8px 0`) are cheaper than blurred shadows.
The zero-blur approach is actually more performant than soft shadows.
Texture patterns use CSS gradients only — no extra image files.
Space Grotesk is a small font (two weights only: 700, 900).

No performance tradeoffs needed to maintain the aesthetic.
