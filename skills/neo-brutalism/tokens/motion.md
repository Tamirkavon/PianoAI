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
Long animations (marquees, spinning stars) are exempt.

---

## Easing

| Name | Value | Usage |
|---|---|---|
| `linear` | `linear` | Spinning decorations, marquees |
| `out` | `ease-out` | Card lift, element entrance |
| `mechanical` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Button push — sharp stop |

**Never `ease-in-out`.** The symmetry feels too smooth and corporate.

---

## Core Interaction Patterns

### Button Push (most important)
```
Rest:   transform: translate(0,0);   shadow: 6px 6px 0 #000
Active: transform: translate(6px,6px); shadow: none
Timing: 100ms linear
```

### Card Lift
```
Rest:   transform: translateY(0);    shadow: 8px 8px 0 #000
Hover:  transform: translateY(-4px); shadow: 12px 12px 0 #000
Timing: 200ms ease-out
```

### Link Snap
```
Rest:   border: transparent; background: none
Hover:  border-4 border-black; background: neo-accent; shadow: 4px 4px
Timing: 100ms linear
```

### Badge Wiggle on Hover
```
Hover:  rotate(12deg)
Timing: 150ms ease-out
```

---

## Looping Decorative Animations

```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 10s linear infinite; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }

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
