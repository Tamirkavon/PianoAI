# TOKENS — SPACING

## Base Unit: 8px

This skill uses an 8px base unit — slightly more generous than the 4px
system, matching the bold, spacious personality of the design.

---

## Spacing Scale

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `space-1` | 8px | `p-2` | Micro — badge padding, icon margins |
| `space-2` | 12px | `p-3` | Tight — tag padding, small gaps |
| `space-3` | 16px | `p-4` | Standard — button padding, card gaps |
| `space-4` | 24px | `p-6` | Comfortable — card inner padding |
| `space-5` | 32px | `p-8` | Generous — large card padding |
| `space-6` | 48px | `p-12` | Section inner spacing |
| `space-7` | 64px | `p-16` | Between content blocks within a section |
| `space-8` | 96px | `py-24` | Section vertical padding — standard |
| `space-9` | 128px | `py-32` | Hero section vertical padding |

---

## Layout Widths

| Token | Value | Usage |
|---|---|---|
| `max-w-content` | 1152px (`max-w-6xl`) | Standard page content container |
| `max-w-narrow` | 768px | Text-heavy pages, blog, auth |
| `max-w-wide` | 1440px | Full-width sections with shapes |

---

## Section Spacing Rules

All sections use `py-24` (96px) vertical padding as the default.
Hero sections use `py-32` (128px) for extra breathing room.

Between a section heading and its content: `mb-16` (64px).
Between eyebrow label and heading: `mb-4` (16px).
Between heading and body text: `mb-6` (24px).
Between body text and CTA: `mb-10` (40px).

---

## The Decoration Space Rule

This system fills spacing with decoration — shapes, dots, patterns.
Sections should NEVER feel empty. Here is the rule:

- Any section taller than 400px needs at least 2 background shapes.
- Any section with a grid of cards needs a connecting element (dashed line, dots).
- Hero sections need a large background shape (circle, square, or blob) behind the main content.

**The background decoration layer is always:**
```css
position: absolute;
pointer-events: none;
z-index: 0; /* behind content */
```

And the content layer:
```css
position: relative;
z-index: 1; /* above decorations */
```

Every section wrapper needs `position: relative; overflow: hidden` to contain
absolutely-positioned decorative elements.
