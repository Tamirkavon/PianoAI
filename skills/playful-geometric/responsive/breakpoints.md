# RESPONSIVE — BREAKPOINTS

## Breakpoint System

| Name | Min Width | Tailwind | Description |
|---|---|---|---|
| mobile | 0px | base | Single column, stacked layout |
| sm | 640px | `sm:` | Still compact, 2 columns max |
| md | 768px | `md:` | Tablet, 2-3 columns |
| lg | 1024px | `lg:` | Desktop, full layout |
| xl | 1280px | `xl:` | Wide, max-width containers |

---

## Mobile Adaptations

**Pop shadows**: Reduce to `2px 2px 0px 0px #1E293B` on mobile to save space
and prevent elements from visually clashing when stacked.

**Background shapes**: Hide complex floating shapes that overlap text on small screens.
Keep simple dot grid patterns — they don't cause layout issues.

**Buttons**: Minimum 48px height on mobile for touch targets.

**Feature grid**: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`

**Pricing grid**: `grid-cols-1` on mobile. The featured card loses its scale(1.03)
on mobile and becomes equal size — overlapping cards look wrong on small screens.

**Hero**: Stack text above image/decoration on mobile. The large background
yellow circle scales down to 200px and moves to center.

**Nav**: Links hidden on mobile. Hamburger menu opens a slide-down panel.

**Stats bar**: `grid-cols-2` on mobile (2×2 grid), `grid-cols-4` on desktop.
