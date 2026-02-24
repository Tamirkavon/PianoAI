# TOKENS — BORDERS & RADIUS

## The Iron Rule: Border Everything

In neo-brutalism, borders are not decoration. They are how elements assert
that they exist. An element without a border is invisible — it blends into
the canvas and loses its physical presence. Every visual element gets a border.

---

## Border Scale

| Token | Width | Tailwind | Usage |
|---|---|---|---|
| `border-thin` | 2px | `border-2` | Dividers, ghost buttons, subtle separators |
| `border-default` | 4px | `border-4` | Default for ALL elements — cards, buttons, inputs |
| `border-thick` | 6px | `border-[6px]` | Feature callout boxes, section dividers |
| `border-hero` | 8px | `border-8` | Hero elements, major structural dividers |

**`border-4 border-black` is the default.** When in doubt, use this.

---

## Radius Rules

This is one of the strictest rules in the system:

| Shape | Value | When to Use |
|---|---|---|
| Sharp | `0px` / `rounded-none` | Everything interactive and structural |
| Pill | `9999px` / `rounded-full` | Badges, tags, circular icons only |

**That is the entire radius system. Two options.**

**`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` are forbidden.**
These values communicate "polished SaaS" — the exact thing this aesthetic rejects.
A single `rounded-lg` on a card collapses the entire visual language.

WHY: Sharp corners signal structure, confidence, and rawness. Rounded corners
signal friendliness and softness. This design does not want to be friendly and
soft. It wants to be bold and deliberate.

---

## Border Color Rules

| Context | Border Color | Note |
|---|---|---|
| Standard (light bg) | `#000000` | Always pure black |
| Inverted (dark bg) | `#FFFFFF` | White on black sections only |
| Focus state | `#000000` | No colored focus rings — background changes instead |
| Disabled | `rgba(0,0,0,0.3)` | Only exception to pure-black rule |

**Never use a gray or colored border.** Black is structural. Color communicates
state through backgrounds, not border colors.

---

## Practical Application

```
Every card:       border-4 border-black rounded-none
Every button:     border-4 border-black rounded-none
Every input:      border-4 border-black rounded-none
Every nav item:   border-4 border-black rounded-none (on hover/active)
Every badge:      border-4 border-black rounded-full (pill) or rounded-none
Every container:  border-4 border-black rounded-none
Section dividers: border-t-8 border-black or border-b-8 border-black
```

---

# TOKENS — MOTION

## Mechanical, Not Fluid

Animations in this system feel like physical switches and mechanical parts —
not like water or light. Fast. Direct. Snappy. No easing that implies softness.

---

## Duration Scale

| Token | Value | Usage |
|---|---|---|
| `instant` | 100ms | Button press, immediate feedback |
| `fast` | 150ms | Nav hover states |
| `standard` | 200ms | Card hovers, most transitions |
| `slow` | 300ms | Large element entrances |

Nothing slower than 300ms for micro-interactions.
Long animations (marquees, spinning stars) are exempt from this rule.

---

## Easing

| Name | Value | Usage |
|---|---|---|
| `linear` | `linear` | Spinning decorations, marquees |
| `out` | `ease-out` | Card lift, element entrance |
| `mechanical` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Button push — sharp stop |

**Never `ease-in-out`.** The symmetry feels too smooth and corporate.
**Never `ease-in` alone.** Starting slow feels like lag.

---

## Core Interaction Patterns

### Button Push (most important)
```
Rest:   transform: translate(0,0); shadow: 6px 6px 0 #000
Active: transform: translate(6px,6px); shadow: none
Timing: 100ms linear
```

### Card Lift
```
Rest:   transform: translateY(0); shadow: 8px 8px 0 #000
Hover:  transform: translateY(-4px); shadow: 12px 12px 0 #000
Timing: 200ms ease-out
```

### Link Snap
```
Rest:   border: transparent; background: none; padding: 0
Hover:  border-4 border-black; background: neo-accent; px-2; shadow: 4px 4px
Timing: 100ms linear
```

### Badge Spin
```
Hover:  rotate(12deg)
Timing: 150ms ease-out
```

---

## Looping Decorative Animations

```css
/* Slow star spin — decorative elements */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 10s linear infinite; }

/* Marquee scroll */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }

/* Wiggle for attention */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(3deg); }
}
.animate-wiggle { animation: wiggle 0.5s ease-in-out; }
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .animate-spin-slow,
  .animate-marquee,
  .animate-bounce,
  .animate-pulse,
  .animate-wiggle {
    animation: none !important;
    transform: none !important;
  }
}
```

---

# TOKENS — SPACING

## Dense and Deliberate

Neo-brutalism is not minimalist. Whitespace is not celebrated here —
it is filled. With texture. With borders. With elements. The spacing
scale still exists, but sections are dense and elements are close.

---

## Base Unit: 4px

Tailwind's default 4px base. Neo-brutalism uses the larger end of the scale.

---

## Spacing Scale

| Usage | Value | Tailwind |
|---|---|---|
| Between inline elements | 8–12px | `gap-2 gap-3` |
| Between related elements | 16–24px | `gap-4 gap-6` |
| Between cards | 24–32px | `gap-6 gap-8` |
| Card internal padding | 24–32px | `p-6 p-8` |
| Section vertical padding | 64–128px | `py-16 py-32` |
| Hero padding | 96–160px | `py-24 py-40` |
| Between sections | 0px | Sections butt up against each other — no gap |

**Between sections: 0 spacing.** Hard edges between colored blocks.
No padding gap between a yellow section and a black section.
They meet with a shared thick border or just touch directly.

---

## Container Widths

| Context | Max Width | Tailwind |
|---|---|---|
| Main content | 1152px | `max-w-6xl` |
| Wide content | 1280px | `max-w-7xl` |
| Narrow text | 768px | `max-w-3xl` |
| Ultra-narrow | 560px | `max-w-xl` |

---

## Grid System

```
Standard: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6 md:gap-8
Asymmetric: grid-cols-1 lg:grid-cols-[3fr_2fr] — preferred for feature sections
Bento: Mix of col-span-1 and col-span-2 — never perfectly uniform
```

Asymmetry is intentional. Avoid equal-column grids where possible.
60/40 or 70/30 splits feel more neo-brutalist than 50/50.

---

## The Sticker Positioning System

Decorative elements use absolute positioning to layer over content:
```
Floating badge on card:  position: absolute; top: -16px; right: -12px;
Background number/text:  position: absolute; opacity: 0.08; font-size: 9xl
Section shape decor:     position: absolute; top/bottom offset; pointer-events: none
Rotation:                ±1–3 degrees — never more
```
