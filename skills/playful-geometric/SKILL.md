---
name: playful-geometric
version: 1.0.0
stack: React + Tailwind CSS + Framer Motion + Lucide React
category: light / expressive
mood: friendly, tactile, optimistic, energetic
---

# PLAYFUL GEOMETRIC SKILL

A complete design system rooted in the Memphis Group aesthetic of the 1980s —
cleaned up for modern digital screens. The core concept is **"Stable Grid, Wild Decoration"**:
content lives in clean, readable areas while the world around it is alive with
primitive shapes, hard shadows, and playful motion.

This is the antidote to sterile corporate minimalism. It creates emotional
connection through optimism, clarity, and tactile fun.

---

## HOW TO USE THIS SKILL

### STEP 1 — Read intent before code
Read these files in order before generating anything:

1. `philosophy.md`           ← The soul. Read this first, always.
2. `tokens/colors.md`        ← The confetti palette. Every color has a role.
3. `tokens/typography.md`    ← Two fonts. Precise hierarchy rules.
4. `tokens/shadows.md`       ← The "pop" shadow system. Central to the aesthetic.
5. `tokens/borders.md`       ← Chunky 2px borders. Radius variety is intentional.
6. `tokens/motion.md`        ← Bouncy, elastic, fun. No linear easing.
7. `tokens/spacing.md`       ← Generous spacing filled with decoration.

### STEP 2 — Set up the project
Follow `integration/setup.md` exactly. Wire in the Tailwind config and globals.css
before writing any component code.

### STEP 3 — Study components as reference patterns
Files in `components/` are annotated references. Read the comments — they explain
WHY each decision was made. When building new components, apply the same logic:
hard shadow, chunky border, bounce on hover, shaped decoration nearby.

### STEP 4 — Use examples as your quality benchmark
Read `examples/LandingPage.jsx` before generating any full page.
Every page you build should feel like it belongs in the same world:
warm cream background, confetti shapes, hard shadows, bouncy interactions.

---

## WHAT YOU CAN OVERRIDE
- **Accent color**: `#8B5CF6` violet can be swapped for another brand color.
  Maintain high saturation — muted colors break the energy.
- **Secondary/tertiary/quaternary**: The pink, yellow, and mint can be
  replaced with other vivid colors for brand alignment.
- **Font sizes**: Can scale one step up or down across the board.
- **Content and copy**: All placeholder text.

## WHAT YOU MUST NEVER OVERRIDE
- **Background**: Always warm cream `#FFFDF5` — never white, never gray.
- **Hard shadows**: The `4px 4px 0px #1E293B` pop shadow is the single most
  defining element of this skill. Remove it and the design collapses.
- **Border width**: Always `2px` on interactive elements. Never `1px`.
- **Bounce easing**: All hover/entrance animations use the overshoot cubic-bezier.
  Never use `ease-in-out` or `linear` for interactive states.
- **Decoration shapes**: Every major section needs primitive shapes (circles,
  triangles, dots) in the background. Empty backgrounds are wrong.
- **Typography pairing**: Outfit for headings, Plus Jakarta Sans for body.
  These fonts define the personality — do not substitute.

---

## AGENT BEHAVIOR RULES
- Every card, button, and panel needs a hard shadow — check before finalizing.
- Sections feel empty without background decoration. Add shapes.
- Hover states must translate AND change shadow — the "lift" effect is essential.
- Icons always live inside a colored circle — never floating alone.
- Use the four accent colors rotationally for variety — the confetti rule.
- Buttons are pills (rounded-full). Cards are rounded-xl. Never mix these up.
- The `foreground` color `#1E293B` is used for borders AND shadows — consistency.

---

## STACK REQUIREMENTS
- React 18+
- Tailwind CSS 3+ (config extended via `integration/tailwind.config.js`)
- Framer Motion 10+ (for bounce animations)
- Lucide React (strokeWidth=2.5, round caps — see typography.md)
- Outfit + Plus Jakarta Sans via Google Fonts
