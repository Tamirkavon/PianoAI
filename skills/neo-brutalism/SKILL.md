---
name: neo-brutalism
version: 1.0.0
stack: React + Tailwind CSS
category: bold
mood: [rebellious, loud, tactile, energetic, raw]
---

# NEO-BRUTALISM SKILL

Digital punk rebellion against polished "Clean SaaS" aesthetics. This skill
combines the raw structural honesty of brutalism with the high-saturation energy
of Pop Art, DIY zine design, and Y2K internet culture. Every element has visual
weight. Structure is enforced with thick black lines. Shadows are solid blocks
of ink. Buttons physically click down. Cards physically lift up.

This is the anti-subtle. If it doesn't have a border, it doesn't exist.

---

## HOW TO USE THIS SKILL

### STEP 1 — Read before you code
Read these files in order. Do not skip ahead to components.

1. `philosophy.md`           ← The punk manifesto. The WHY behind every decision.
2. `tokens/colors.md`        ← 5 colors only. Strict rules. No grays, ever.
3. `tokens/shadows.md`       ← THE defining visual element. Hard ink blocks.
4. `tokens/typography.md`    ← Space Grotesk Black only. Uppercase. Dense.
5. `tokens/borders.md`       ← Border-4 everywhere. Sharp or full-round. Nothing in between.
6. `tokens/motion.md`        ← Mechanical, snappy, arcade-like. No soft easing.
7. `tokens/spacing.md`       ← Dense grids, asymmetric, sticker layering.

### STEP 2 — Integration
Follow `integration/setup.md`. The hard shadow utilities, Space Grotesk font,
and texture patterns must be in place before any component will look correct.

### STEP 3 — Study the north star
Read `examples/LandingPage.jsx` before building any page. The button push
mechanics, card lift physics, sticker rotation, and texture backgrounds are
the signature — miss any one and the design reads as generic.

### STEP 4 — Build components
Every component file includes WHY annotations explaining the border decisions,
shadow choices, and interaction mechanics. Read them before copying.

---

## THE THREE LAWS

These three rules define every visual decision in this skill:

### Law 1: Everything has a border
`border-4 border-black` is the default. Always. Cards, buttons, inputs,
nav items, badges, containers — if it's visible, it has a border.
An element without a border is invisible in this world.

### Law 2: Shadows are solid ink
No blur. No spread. No soft diffusion. Shadows in this system are hard
rectangles offset at 45 degrees: `box-shadow: 8px 8px 0px 0px #000`.
They simulate physical layering — one piece of paper on top of another.
Remove the blur, you get brutalism. Add blur, you get corporate SaaS.

### Law 3: Interactions are mechanical
Buttons CLICK DOWN (translate to cover their shadow on active).
Cards LIFT UP (translate upward + shadow grows on hover).
Transitions are FAST (100–200ms). Easing is LINEAR or EASE-OUT.
Never ease-in-out. Never slow. Never soft.

---

## WHAT YOU CAN OVERRIDE
- **Accent colors**: The 3 accent colors can shift while maintaining saturation.
  Hot colors only — no pastels, no muted tones.
- **Rotation angles**: Small tweaks to sticker rotations (`±1–3 degrees`).
- **Content and copy**: All placeholder text is replaceable.
- **Shadow size**: Can scale between small (4px) and massive (20px) for hierarchy.

## WHAT YOU MUST NEVER OVERRIDE
- **Pure black borders**: `#000000` only. Never dark gray. Never `#333`.
- **Sharp corners**: `rounded-none` on all interactive elements. Never `rounded-md`.
- **Space Grotesk font**: Non-negotiable. Its geometry IS the aesthetic.
- **Hard shadow zero-blur**: Any blur on the shadow destroys the visual language.
- **Button push mechanic**: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`.
  This is the most iconic interaction in this system. Never soften it.
- **Cream background**: `#FFFDF5` — not white, not gray. The aged-paper warmth
  is essential for the highlighter colors to read correctly against it.
- **High-saturation palette**: No muting, no desaturation. Colors must scream.
- **Uppercase text**: All headings, buttons, labels. Never sentence case on emphasis.
- **Font weight 700/900 only**: Regular weight is forbidden in neo-brutalism.

---

## AGENT BEHAVIOR RULES
- Every interactive element has `border-4 border-black` — no exceptions.
- Buttons use the push mechanic — ALWAYS implement `active:translate` + `active:shadow-none`.
- Cards use the lift mechanic — ALWAYS implement `hover:-translate-y-2` + deeper shadow.
- Background is never flat — add halftone, grid, or noise texture.
- Text in buttons is UPPERCASE, font-bold minimum, tracking-wide.
- Shadows always have zero blur — never use Tailwind's built-in shadow utilities.
- No subtle gray text — it's pure black or a color.
- Decorative elements (stars, shapes, badges) use `pointer-events-none`.
- Inputs focus with background color change (yellow), not a glow ring.
- Badges and sticker elements are rotated ± 1–3 degrees.

---

## STACK REQUIREMENTS
- React 18+
- Tailwind CSS 3+
- Space Grotesk (Google Fonts, weights 700/900)
- Lucide React (strokeWidth 3–4 for thick, bold strokes)
