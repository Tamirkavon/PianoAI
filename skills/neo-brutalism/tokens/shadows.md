# TOKENS — SHADOWS
## THE DEFINING VISUAL ELEMENT OF THIS SKILL

The hard shadow is what makes neo-brutalism instantly recognizable.
It is not a lighting effect. It is not depth simulation.
It is a solid black rectangle offset behind an element.
Two pieces of paper. One on top. One peeking out below and to the right.

**Zero blur. Zero spread. Always bottom-right direction. Always black.**

---

## The Shadow Scale

| Token | CSS Value | Tailwind Utility | Usage |
|---|---|---|---|
| `shadow-xs` | `2px 2px 0px 0px #000` | `shadow-[2px_2px_0px_0px_#000]` | Tight badges, tiny elements |
| `shadow-sm` | `4px 4px 0px 0px #000` | `shadow-[4px_4px_0px_0px_#000]` | Small buttons, tags |
| `shadow-md` | `6px 6px 0px 0px #000` | `shadow-[6px_6px_0px_0px_#000]` | Default buttons |
| `shadow-base` | `8px 8px 0px 0px #000` | `shadow-[8px_8px_0px_0px_#000]` | Standard cards |
| `shadow-lg` | `12px 12px 0px 0px #000` | `shadow-[12px_12px_0px_0px_#000]` | Large cards, featured |
| `shadow-xl` | `16px 16px 0px 0px #000` | `shadow-[16px_16px_0px_0px_#000]` | Hero elements, CTAs |
| `shadow-2xl` | `20px 20px 0px 0px #000` | `shadow-[20px_20px_0px_0px_#000]` | Max drama, modals |

### Inverted Shadows (for elements on black backgrounds)
| Token | CSS Value | Tailwind Utility |
|---|---|---|
| `shadow-inv-sm` | `4px 4px 0px 0px #fff` | `shadow-[4px_4px_0px_0px_#fff]` |
| `shadow-inv-md` | `6px 6px 0px 0px #fff` | `shadow-[6px_6px_0px_0px_#fff]` |
| `shadow-inv-lg` | `8px 8px 0px 0px #fff` | `shadow-[8px_8px_0px_0px_#fff]` |

---

## The Button Push Mechanic

When a button is pressed (`:active`), it translates to COVER its own shadow.
The shadow disappears. The button appears to press into the surface.
This is the most important interaction in this system.

```css
/* Rest state */
box-shadow: 6px 6px 0px 0px #000;
transform: translate(0, 0);

/* Active/pressed state */
box-shadow: none;
transform: translate(6px, 6px);
```

In Tailwind:
```
default: shadow-[6px_6px_0px_0px_#000]
active:  active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
```

WHY THE OFFSET MATCHES THE SHADOW:
The button must move exactly as far as the shadow is offset. If shadow is
6px, button translates 6px. If shadow is 8px, button translates 8px.
Mismatching these makes the press look glitchy — the shadow doesn't disappear cleanly.

---

## The Card Lift Mechanic

When a card is hovered, it lifts toward the viewer.
The card translates UP. The shadow grows to compensate.
The visual gap between the card and the surface increases.

```css
/* Rest state */
box-shadow: 8px 8px 0px 0px #000;
transform: translate(0, 0);

/* Hover state */
box-shadow: 12px 12px 0px 0px #000;
transform: translateY(-4px);
```

In Tailwind:
```
default: shadow-[8px_8px_0px_0px_#000]
hover:   hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000]
```

For maximum drama (featured cards):
```
hover:   hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#000]
```

---

## Context Guide: Which Shadow for What

| Element | Rest Shadow | Hover Shadow | Active Shadow |
|---|---|---|---|
| Small badge | `4px 4px` | — | — |
| Default button | `6px 6px` | `6px 6px` | none + translate |
| Large button / CTA | `8px 8px` | `10px 10px` | none + translate |
| Standard card | `8px 8px` | `12px 12px` | — |
| Featured card | `12px 12px` | `16px 16px` | — |
| Hero element | `16px 16px` | `20px 20px` | — |
| Nav | `4px 4px` | — | — |
| Input (rest) | none | — | — |
| Input (focus) | `4px 4px` | — | — |

---

## Critical Rules

1. **Zero blur always.** `0px 0px` for blur and spread. If you see blur, it's wrong.
2. **Bottom-right always.** `+X +Y` offset. Never top-left, never centered.
3. **Black always (on light backgrounds).** `#000000` — not `#111`, not `rgba(0,0,0,0.8)`.
4. **Never use Tailwind's built-in shadows** (`shadow-sm`, `shadow-md`, etc.).
   They have blur. They are wrong for this system.
5. **Push offset must match shadow offset.** Button pushes exactly as far as its shadow.
6. **Lift + grow.** Card lift always grows the shadow — don't just translate without updating shadow.
