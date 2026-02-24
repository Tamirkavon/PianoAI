# TOKENS — TYPOGRAPHY

## One Font. Heavy Weights Only.

**Space Grotesk** at weights 700 and 900. That's the entire typography system.

Space Grotesk has quirky, slightly irregular geometry that gives it personality
without being novelty. At heavy weights it feels bold and confident without
being aggressive. Its terminals are slightly rounded in a way that adds warmth
to what would otherwise be a purely clinical geometric sans.

---

## Font Import

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=block" rel="stylesheet">
```

Apply globally:
```css
body {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
}
```

**`display=block`** — prevents flash of unstyled text. Required.

---

## Weight Rules

| Weight | Use | Class |
|---|---|---|
| 900 (Black) | All headings, all stats, all display text | `font-black` |
| 700 (Bold) | All body text, buttons, labels, inputs | `font-bold` |
| 500 (Medium) | Avoided — only for very subtle secondary info | `font-medium` |
| 400 (Regular) | **Forbidden.** Lightness is not in this vocabulary. | — |

---

## Type Scale

### Display / Hero (h1)
```
Size:      clamp(64px, 10vw, 128px) — text-7xl → text-9xl
Weight:    900 (font-black)
Case:      UPPERCASE
Tracking:  tracking-tighter (-0.05em)
Line:      leading-none (1.0) or leading-[0.9]
Color:     #000000 or gradient-stroke technique
```

### Section Title (h2)
```
Size:      text-5xl → md:text-7xl
Weight:    900 (font-black)
Case:      UPPERCASE
Tracking:  tracking-tight
Line:      leading-none
Color:     #000000
```

### Subsection (h3)
```
Size:      text-3xl → text-5xl
Weight:    900 (font-black)
Case:      UPPERCASE or Title Case
Tracking:  tracking-tight
Line:      leading-snug
```

### Body Large
```
Size:      text-xl → text-2xl
Weight:    700 (font-bold)
Case:      Sentence case
Tracking:  normal
Line:      leading-relaxed (1.625)
Color:     #000000
```

### Body
```
Size:      text-lg
Weight:    700 (font-bold)
Case:      Sentence case
Tracking:  normal
Line:      leading-relaxed
Color:     #000000
```

### Labels / Eyebrows
```
Size:      text-sm → text-xs
Weight:    700-900
Case:      UPPERCASE
Tracking:  tracking-widest (0.2em)
Color:     #000000 or neo-accent
```

### Button Text
```
Size:      text-sm → text-base
Weight:    700 (font-bold)
Case:      UPPERCASE
Tracking:  tracking-wide
```

---

## The Text Stroke Technique

For display headings — hollow outlined letters like a stencil or rubber stamp.

```jsx
<span style={{
  WebkitTextStroke: "2px #000000",
  color: "transparent",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 900,
}}>
  OUTLINED TEXT
</span>
```

Combine with solid text for layered depth effect:
```jsx
<div style={{ position: "relative" }}>
  {/* Solid text underneath */}
  <span style={{ color: "#FF6B6B", fontWeight: 900 }}>BIG WORD</span>
  {/* Outlined text on top, slightly offset */}
  <span style={{
    position: "absolute", top: -2, left: 2,
    WebkitTextStroke: "2px #000",
    color: "transparent", fontWeight: 900,
  }}>BIG WORD</span>
</div>
```

Use only at text-6xl and above. Below that, the stroke makes letters unreadable.

---

## Sticker Text Blocks

Bordered text containers that look like sticky labels or print blocks:

```jsx
<div style={{
  display: "inline-block",
  border: "4px solid #000",
  boxShadow: "4px 4px 0px 0px #000",
  padding: "4px 12px",
  background: "#FFD93D",
  transform: "rotate(-1deg)",
  fontWeight: 900,
  textTransform: "uppercase",
}}>
  HIGHLIGHTED PHRASE
</div>
```

Use for: callout phrases within hero, emphasis in features, labels.

---

## Rules

1. **Space Grotesk only.** Inter, Roboto, Poppins — all wrong for this system.
2. **700 minimum weight.** Any lighter and the design goes soft.
3. **Uppercase for all headings, buttons, labels.** No exceptions.
4. **tracking-widest on small labels.** The contrast between tight headlines
   and wide-tracked labels creates the right typographic rhythm.
5. **Stroke technique only at 6xl+.** Smaller = unreadable.
6. **No gradient text.** Text color is solid: black, white, or an accent.
