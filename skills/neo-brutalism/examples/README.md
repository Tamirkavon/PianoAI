# NEO-BRUTALISM — Examples Guide

## LandingPage.jsx — The North Star

This is the complete reference implementation. Every design pattern in this
skill appears at least once in this file. Before building any new page or
component, read it top to bottom.

---

## What To Notice in Each Section

### TICKER (Marquee)
- Black background with alternating red and yellow text
- 20s linear scroll — never stop it, never ease it
- `@keyframes marquee` defined inline — can be moved to globals.css

### HERO
- Text stroke technique on "SHIPPING" — `-webkit-text-stroke: 3px #000; color: transparent`
- GENERIC in accent red — color-blocked word for emphasis
- Command pill: black background, yellow `$` prefix, monospace font, thick border
- Chaos zone (right side): two rotated cards with sticker layering
- Spinning star badge — absolute positioned, `animation: spin-slow 10s linear infinite`
- Float badge "ONE CMD" — rotated pill, `position: absolute`

### STATS
- Full-bleed grid, no outer container padding
- Each cell has colored background (red, yellow, violet, black)
- Hover: `translateY(-4px)` — stat blocks lift like cards
- Large number: `font-black` size-56, `letter-spacing: -0.04em`

### FEATURES
- 3-column grid with shared borders (cells share border-right and border-bottom)
- Icon box: colored square with border + shadow
- Feature cell bg changes to accent color on hover
- Text stroke on subtitle: "NOT TEMPLATES." outlined

### SKILLS SHOWCASE
- Black section background — high contrast inversion
- Yellow section headline
- Each skill card shows a mini mockup preview (colored rectangle with border fragments)
- `hover: translateY(-4px)` lift on skill cards

### HOW IT USE
- Yellow section background — color-blocked
- 4-column step grid with shared borders
- Large accent-red step numbers

### PRICING
- Graph paper texture background
- "MOST POPULAR" badge positioned absolutely (`top: -16px`) above middle card
- Button push mechanic on every CTA button
- Shared border grid layout (no gap, cells share borders)

### CTA BANNER
- Red section background
- "DRIP?" word uses text stroke — hollow outlined
- Two large buttons side by side

### FOOTER
- Black background
- Logo sticker with WHITE border and white shadow (inverted — on dark bg)
- Nav links: `border: 2px solid #555` — subdued on dark background

---

## Pre-Ship Checklist

Before deploying any page using this skill:

- [ ] `#FFFDF5` cream canvas (not #FFF, not #FAFAFA)
- [ ] `border-4 border-black` on EVERY visual element
- [ ] All shadows have zero blur (`0px 0px` blur and spread)
- [ ] Space Grotesk loaded and applied (`font-family: 'Space Grotesk', sans-serif`)
- [ ] All headings are uppercase, font-black, letter-spacing tight
- [ ] At least one text-stroke display heading
- [ ] At least one background texture (halftone / grid / noise)
- [ ] Button push mechanic works (`active` translate + shadow-none)
- [ ] Card lift mechanic works (`hover` translate-up + shadow-grows)
- [ ] No rounded corners on any interactive element (only pills/circles allowed)
- [ ] No soft shadows anywhere (no Tailwind built-in `shadow-*`)
- [ ] No gray text colors — pure black only
- [ ] Rotating sticker elements present (badges, decorative labels)
- [ ] Sections are color-blocked (cream → yellow → black → violet → red)
- [ ] Mobile: still bordered, still black, still Space Grotesk — not generic mobile
