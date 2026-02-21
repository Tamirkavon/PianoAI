# TOKENS — TYPOGRAPHY

## Two Fonts, One Personality

**Outfit** for headings — geometric sans with rounded letter corners.
**Plus Jakarta Sans** for body — humanist, legible, warm.

Together they create a tone that is confident but approachable. Never cold.

---

## Fonts

| Role | Family | Source | Weights |
|---|---|---|---|
| Headings | Outfit | Google Fonts | 700 (Bold), 800 (ExtraBold) |
| Body | Plus Jakarta Sans | Google Fonts | 400 (Regular), 500 (Medium) |

Google Fonts import URL:
```
https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&display=swap
```

---

## Type Scale (Major Third ratio — 1.25)

| Role | Size | Weight | Font | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `display` | 64px | 800 | Outfit | 1.05 | `-0.03em` | Hero headlines only |
| `heading-1` | 48px | 800 | Outfit | 1.1 | `-0.02em` | Page titles |
| `heading-2` | 38px | 700 | Outfit | 1.15 | `-0.01em` | Section headings |
| `heading-3` | 30px | 700 | Outfit | 1.2 | `0em` | Card titles, feature headings |
| `heading-4` | 24px | 700 | Outfit | 1.3 | `0em` | Sub-headings |
| `body-lg` | 18px | 400 | Plus Jakarta Sans | 1.7 | `0em` | Lead paragraphs |
| `body` | 16px | 400 | Plus Jakarta Sans | 1.7 | `0em` | All body copy |
| `body-sm` | 14px | 400 | Plus Jakarta Sans | 1.6 | `0em` | Secondary text |
| `label` | 12px | 500 | Plus Jakarta Sans | 1.4 | `0.08em` | Form labels, tags, badges |
| `caption` | 11px | 400 | Plus Jakarta Sans | 1.4 | `0.05em` | Footnotes, metadata |

---

## Heading Styling Rules

### The Colored Word Technique
Use the confetti accent colors on single words within headings to create emphasis:

```jsx
<h2 style={{ fontFamily: "Outfit", fontSize: 38, fontWeight: 700 }}>
  Build something{" "}
  <span style={{ color: "#8B5CF6" }}>people love</span>
</h2>
```

Rotate the accent color per section — violet in one, pink in the next.

### Squiggle Underlines
Key words in headings can have a hand-drawn SVG squiggle underline
instead of (or alongside) color:

```jsx
<span style={{ position: "relative", display: "inline-block" }}>
  beautiful
  <svg style={{ position:"absolute", bottom:-6, left:0, width:"100%" }}
    viewBox="0 0 100 8" preserveAspectRatio="none">
    <path d="M0,4 C25,0 50,8 75,4 S100,0 100,4"
      stroke="#F472B6" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
</span>
```

### Labels / Eyebrows
Section eyebrow labels above headings follow this pattern:
```
Font: Plus Jakarta Sans, 12px, weight 500
Color: accent color (rotate per section)
Letter spacing: 0.1em
Text transform: uppercase
```

---

## Icon Typography (Lucide React)

All Lucide icons in this skill must use:
```jsx
<Icon size={20} strokeWidth={2.5} />
// strokeWidth 2.5 = bold/chunky feel
// Round caps and joins (Lucide default)
```

Icons are NEVER floating alone. Always wrap in a colored circle:
```jsx
<div style={{
  width: 48, height: 48, borderRadius: "50%",
  background: "#8B5CF6",  // use confetti rotation
  display: "flex", alignItems: "center", justifyContent: "center"
}}>
  <Icon size={20} strokeWidth={2.5} color="#FFFFFF" />
</div>
```

---

## What Never To Do

- Never use Outfit for body text — it loses legibility at small sizes
- Never use Plus Jakarta Sans for hero headings — it lacks the visual weight
- Never set heading `letter-spacing` wider than `0em` — it breaks the geometric feel
- Never use font weights other than the specified ones
- Never float icons without a containing shape
