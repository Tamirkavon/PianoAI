# TOKENS — MOTION

## Motion Philosophy

Motion in this skill is physical, elastic, and joyful.
Things don't slide in linearly — they spring, bounce, and wiggle.
The `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot curve is the most
important easing value in the entire system.

**The test:** Does this animation feel like it has personality?
If it could be a corporate slide transition, it's wrong.

---

## Duration Scale

| Token | Value | Usage |
|---|---|---|
| `duration-instant` | 100ms | Color switches, border changes |
| `duration-fast` | 200ms | Hover states, button presses |
| `duration-normal` | 300ms | Component entrances, panel opens |
| `duration-slow` | 500ms | Page transitions, section reveals |
| `duration-bounce` | 600ms | Bounce entrance animations |

---

## Easing Curves

| Name | Value | Usage |
|---|---|---|
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | **THE primary easing.** Hover lifts, entrances, pops. Overshoots and settles. |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Slightly less overshoot. For subtler bounces. |
| `ease-out-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Same as bounce — used for exit animations reversed. |
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | For color transitions only — bounce doesn't apply to color. |

**Never use:** `linear`, `ease-in-out`, or `ease` for interactive states.

---

## Keyframe Library

### wiggle — icon personality
```css
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25%       { transform: rotate(4deg); }
  75%       { transform: rotate(-4deg); }
}
/* Usage: icon containers on hover */
animation: wiggle 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
/* Trigger once on hover — not infinite */
```

### popIn — element entrance
```css
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.8); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
```

### float — decorative shape movement
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
/* Usage: background decorative shapes */
animation: float 4s ease-in-out infinite;
/* Use different durations (3s, 4s, 5s) for multiple shapes to desynchronize */
```

### spin-slow — rotating decorative elements
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
animation: spin-slow 12s linear infinite;
/* Usage: star badges, asterisk decorations */
```

### marquee — scrolling text/logos
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
animation: marquee 20s linear infinite;
```

### fadeInUp — staggered content reveal
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
animation-delay: calc(var(--i) * 100ms);
```

---

## Hover Lift Pattern (most used)

```jsx
// Resting
style={{
  transform: "translate(0, 0)",
  boxShadow: "4px 4px 0px 0px #1E293B",
  transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms cubic-bezier(0.34,1.56,0.64,1)"
}}

// Hover
style={{
  transform: "translate(-2px, -2px)",
  boxShadow: "6px 6px 0px 0px #1E293B",
}}

// Active
style={{
  transform: "translate(2px, 2px)",
  boxShadow: "2px 2px 0px 0px #1E293B",
}}
```

---

## Framer Motion Variants

```js
// Pop entrance — for cards and sections
export const popIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  }
}

// Stagger container
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

// Fade up — for text blocks
export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  }
}

// Hover lift — for cards
export const hoverLift = {
  rest:  { y: 0, boxShadow: "4px 4px 0px 0px #1E293B" },
  hover: { y: -4, boxShadow: "8px 8px 0px 0px #1E293B",
    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
  }
}
```

---

## Reduced Motion

Always respect `prefers-reduced-motion`. Disable bounce and wiggle:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
