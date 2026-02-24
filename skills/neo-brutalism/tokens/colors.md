# TOKENS — COLORS

## Five Colors. That Is All.

Neo-brutalism runs on a minimal, high-saturation palette.
There are no gradients. No transparency stacks. No color variations or shades.
Just five pure colors used with confidence and intent.

---

## The Palette

| Token | Hex | Name | Role |
|---|---|---|---|
| `canvas` | `#FFFDF5` | Cream | Page background — aged paper warmth |
| `ink` | `#000000` | Pure Black | All borders, all shadows, most text |
| `accent` | `#FF6B6B` | Hot Red | Primary CTA, attention, urgency |
| `secondary` | `#FFD93D` | Vivid Yellow | Secondary actions, badges, highlights |
| `muted` | `#C4B5FD` | Soft Violet | Tertiary, card headers, FAQ panels |
| `white` | `#FFFFFF` | White | Text on black, inverted panels |

In Tailwind config: `neo-canvas`, `neo-ink`, `neo-accent`, `neo-secondary`, `neo-muted`

---

## Color-by-Role Reference

### Backgrounds
```
Page canvas:           #FFFDF5  (neo-canvas)
Cards:                 #FFFFFF  (white)
Primary CTA sections:  #FF6B6B  (neo-accent)
Badge highlights:      #FFD93D  (neo-secondary)
Tertiary panels:       #C4B5FD  (neo-muted)
Dark/inverted blocks:  #000000  (neo-ink)
```

### Text
```
All body text:         #000000  (neo-ink)
Text on black bg:      #FFFFFF  (white)
Text on accent red:    #000000  (neo-ink) — high contrast
Text on secondary yel: #000000  (neo-ink)
Text on muted violet:  #000000  (neo-ink)
Placeholder text:      rgba(0,0,0,0.4)
```

### Borders
```
All borders:           #000000  always — no exceptions
Border on black bg:    #FFFFFF  for inverted elements only
```

### Shadows
```
All shadows:           #000000  always
Shadow on black bg:    #FFFFFF  for inverted floating elements
```

---

## The No-Gray Rule

**There are zero grays in this system.**

`#333`, `#666`, `#999`, `#CCC` — none of these exist here.
Muted text is not `#666`. It is `rgba(0,0,0,0.5)` at most, or just pure black.

WHY: Gray is the color of corporate design compromise. Neo-brutalism uses
black for structure and full-saturation colors for accent. Gray sits in the
middle and communicates nothing boldly. It has no place here.

---

## Color-Blocking Strategy

Sections alternate through these background colors to create rhythm:
```
Section 1: #FFFDF5 (canvas) — default
Section 2: #FFD93D (secondary yellow) — energetic
Section 3: #000000 (black) — dramatic inversion
Section 4: #C4B5FD (muted violet) — softer
Section 5: #FF6B6B (accent red) — call to action
Footer:    #FFD93D (secondary yellow) or #000000 (black)
```

The contrast between these blocks creates the visual rhythm without any
gradients. Hard edges between sections — never a gradient fade.

---

## Accessibility

All core text combinations pass WCAG AA (4.5:1):
- Black on cream `#000 / #FFFDF5`: 19.5:1 ✓
- Black on yellow `#000 / #FFD93D`: 11.4:1 ✓
- Black on red `#000 / #FF6B6B`: 3.9:1 (passes for large text ≥18pt) ✓
- Black on violet `#000 / #C4B5FD`: 6.1:1 ✓
- White on black `#FFF / #000`: 21:1 ✓

Note: Black on red passes for large/bold text only. Never use small black
body text on the red accent background.
