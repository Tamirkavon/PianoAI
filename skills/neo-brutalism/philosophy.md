# PHILOSOPHY — NEO-BRUTALISM

## The Reference World

Imagine a DIY punk zine from 1994. Photocopied, slightly misaligned.
Headlines cut from magazines and glued on at angles. Bold red stamps.
Black marker outlines around everything. Nothing smooth. Nothing subtle.
Every element demanding attention.

Now imagine building an entire software interface from that aesthetic.
Not as a joke. Not ironically. With full confidence.

That is this skill.

---

## Why This Aesthetic Exists

Neo-brutalism is a reaction. A deliberate rejection of:
- Borderless cards floating on gradients
- Soft shadows that barely exist  
- Friendly rounded corners on everything
- Muted gray text at 60% opacity
- Smooth, slow, "premium" animations
- The corporate design vocabulary that makes every SaaS look identical

It says: structure is not something to hide. Structure is the design.
Borders are not decoration — they are how elements assert their existence.
Shadows are not lighting simulation — they are physical presence on a surface.

---

## The Physics of This World

Everything in this interface obeys a consistent set of physical rules.
The surface is a bulletin board. Elements are physical objects pinned to it.

### Objects are paper, not light
Cards look like pieces of paper placed on the board. Their shadows are
the gap between the paper and the surface — a hard offset, not soft diffusion.
Think of two pieces of paper stacked at a slight angle. That's the shadow.

### Buttons are switches, not surfaces
A button in this world is a physical switch or key. When you press it,
it moves. When you release, it springs back. The push mechanic is not
animation for its own sake — it communicates that something real happened.

Active state: translate X+2px, Y+2px, shadow disappears.
The button moves INTO the surface. Cover its shadow. Press down.

### Cards are pinned objects
Cards sit on top of the surface with a gap underneath (the shadow).
On hover, they lift toward you — translate up, shadow grows.
They don't glow. They don't blur. They move.

### Text is printed, not rendered
Headlines feel stamped or printed. Uppercase. Heavy. Dense tracking.
Some display text uses the stroke technique — hollow outlined letters
like stenciled paint. This amplifies the printed-material feeling.

---

## The Color Strategy

**Five colors. That's it.**

| Role | Color | Purpose |
|---|---|---|
| Canvas | `#FFFDF5` | Aged paper — warm, not stark white |
| Ink | `#000000` | Every border, every shadow, most text |
| Hot Red | `#FF6B6B` | Primary actions, attention, urgency |
| Vivid Yellow | `#FFD93D` | Secondary actions, highlights, logos |
| Soft Violet | `#C4B5FD` | Tertiary backgrounds, variation, depth |

These aren't pastel. They aren't muted. They are highlighter-on-paper vivid.
The cream canvas makes them pop without becoming garish.

**The rule:** Never introduce a gray. Black or color. Nothing in between.
Gray is the color of corporate compromise. This design doesn't compromise.

---

## The Typography Rules

Space Grotesk at 700 or 900. Nothing lighter.

Headings: UPPERCASE, tracking-tighter, leading-none.
Labels: UPPERCASE, tracking-widest, small.
Body: Bold (700), leading-relaxed, sentence case acceptable.
Numbers and stats: Space Grotesk 900, as large as they'll go.

The text stroke technique for display headings:
```
-webkit-text-stroke: 2px black;
color: transparent;
```
Hollow outlined text looks like stenciled paint or a rubber stamp outline.
Use on hero sections for maximum drama.

---

## The Sticker Effect

Elements are not laid out. They are placed — like stickers on a laptop lid.

Slight rotations: `rotate-1`, `-rotate-2`, `rotate-3`.
Applied to: Badges, heading spans, decorative shapes, card headers.
Never more than ±3 degrees — enough to break the grid, not enough to hurt readability.

Absolute positioning: Badges float above cards (`-top-4 -right-4`).
Decorative shapes float in sections (`absolute top-20 right-0`).
Background text used as texture (`absolute opacity-10 text-9xl pointer-events-none`).

---

## Texture is Mandatory

A flat background is an unfinished background in this system.

Every section background gets one of:
- **Halftone dots**: `radial-gradient(#000 1.5px, transparent 1.5px)` at 20px grid
- **Graph paper grid**: Crossed linear gradients at 10% opacity
- **Noise SVG**: Fractal turbulence for organic texture
- **Radial dots**: Larger dots at 30px grid for bold pattern sections

The texture adds visual richness without adding color. It fills the space
that other design systems fill with whitespace. In neo-brutalism, whitespace
without texture is wasted.

---

## What Breaks This Aesthetic

| ❌ WRONG | ✓ RIGHT |
|---|---|
| `box-shadow: 0 4px 12px rgba(0,0,0,0.15)` | `box-shadow: 8px 8px 0px 0px #000` |
| `rounded-lg` on cards | `rounded-none` — always |
| `#666` or `#333` for muted text | `#000000` or a color |
| `transition: all 300ms ease-in-out` | `transition: all 100ms linear` |
| Gradient button backgrounds | Flat solid color buttons |
| `backdrop-blur` anything | Never. Hard edges only. |
| Subtle hover states | Dramatic mechanical translate |
| No border on an element | `border-4 border-black` always |
| font-weight 400 or 500 | 700 minimum, 900 preferred |
| Rounded button corners | Sharp rectangular buttons |
| Button glows on click | Button pushes down on click |
| Lowercase headings | UPPERCASE or nothing |
| Gray placeholder text | `placeholder:text-black/40` |
| Soft pulse animations | Hard bouncing or snapping |
