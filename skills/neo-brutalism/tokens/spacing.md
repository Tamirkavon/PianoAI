# TOKENS — SPACING

## Dense and Deliberate

Neo-brutalism is not minimalist. Whitespace without purpose is wasted space.
Fill it with texture, borders, or elements. The spacing scale exists but
sections are dense — elements sit close, grids are tight, color blocks butt up.

---

## Base Unit: 4px (Tailwind default)

---

## Spacing Reference

| Usage | Value | Tailwind |
|---|---|---|
| Between inline elements | 8–12px | `gap-2 gap-3` |
| Between related elements | 16–24px | `gap-4 gap-6` |
| Between cards in grid | 24–32px | `gap-6 gap-8` |
| Card internal padding | 24–32px | `p-6 p-8` |
| Section vertical padding | 64–128px | `py-16 py-32` |
| Hero padding | 96–160px | `py-24 py-40` |
| Between sections | 0px | Hard edges — sections touch |

**Sections have zero gap between them.** A yellow section and a black section
share a `border-b-8 border-black` or simply touch. No padding gap.
This creates the color-blocked, zine-like rhythm.

---

## Container Widths

| Context | Max Width | Tailwind |
|---|---|---|
| Main content | 1152px | `max-w-6xl` |
| Wide content | 1280px | `max-w-7xl` |
| Narrow text | 768px | `max-w-3xl` |

---

## Grid Philosophy

**Asymmetric grids over equal columns.**

```
Features:   lg:grid-cols-[3fr_2fr]  — 60/40 split
Blog:       lg:grid-cols-[2fr_1fr_1fr]  — one hero + two smalls
Pricing:    md:grid-cols-3 — equal is acceptable here (comparative layout)
Stats:      md:grid-cols-4 — equal acceptable for parallel metrics
```

Bento grids should mix spans. Never a perfectly uniform grid.

---

## Sticker Positioning

Decorative elements use absolute positioning:
```
Badge on card top:     position: absolute; top: -16px; right: -12px; rotate: 3deg
Background watermark:  position: absolute; opacity: 0.06; font-size: 9xl; z-index: 0
Section shape:         position: absolute; top/bottom + left/right; pointer-events: none
Overlapping divider:   margin-top: -2px (sections slightly overlap for seamless join)
```

Rotation values:
```
rotate-1   (+1 degree)  — very subtle tilt
-rotate-2  (-2 degrees) — natural slight lean left
rotate-3   (+3 degrees) — noticeable sticker angle
```

Never exceed ±3 degrees. More than that hurts readability.
