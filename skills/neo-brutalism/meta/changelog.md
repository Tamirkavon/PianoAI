# CHANGELOG — NEO-BRUTALISM SKILL

## v1.0.0 — Initial Release

### Files (22 total)

```
neo-brutalism/
├── SKILL.md
├── philosophy.md
├── skill.json
├── tokens/
│   ├── colors.md
│   ├── shadows.md       ← THE defining file. Hard ink blocks.
│   ├── typography.md
│   ├── borders.md
│   ├── motion.md
│   ├── spacing.md
│   └── charts.md
├── integration/
│   ├── globals.css
│   ├── tailwind.config.js
│   └── setup.md
├── components/
│   ├── core/
│   │   ├── Button.jsx
│   │   └── Input.jsx    ← Includes Badge, Textarea
│   ├── display/
│   │   └── Card.jsx     ← Includes FeatureCard, StatCard
│   ├── navigation/
│   │   └── Navbar.jsx
│   └── feedback/
│       └── Spinner.jsx  ← Includes Alert, ProgressBar
├── examples/
│   ├── LandingPage.jsx
│   └── README.md
├── responsive/
│   └── breakpoints.md
└── meta/
    └── changelog.md
```

### Design Decisions

**Why cream instead of white?**
`#FFFDF5` mimics aged paper. Against it, the highlighter colors (red, yellow,
violet) read as highlighter-on-paper rather than neon-on-screen. Pure white
makes the same colors look digital and harsh.

**Why only two radius values (0 and 9999)?**
Mid-range radii (`rounded-md`, `rounded-lg`) are the visual signature of
corporate SaaS design. Any rounded corner between 4px and 48px immediately
reads as "friendly product design." Neo-brutalism uses 0 (structural) or
9999 (pill/sticker). Nothing in between.

**Why must shadow offset match button push offset exactly?**
The button push illusion requires the button to travel exactly as far as
its shadow offset. If shadow is 6px and translate is only 2px, the shadow
doesn't disappear cleanly — the button appears to half-press into a surface
that doesn't exist. The mechanics must be precise.

**Why no blur on any shadow?**
Blur simulates light diffusion — soft light wrapping around an object.
Neo-brutalism treats elements as paper cutouts, not 3D objects in a light
field. Paper cutouts cast hard edge shadows where one piece of paper
overlaps another. Zero blur is the defining technical decision.

**Why Space Grotesk?**
Among geometric sans-serifs at 900 weight, Space Grotesk has slightly
irregular letterforms that give it personality without being novelty.
Its geometry feels handmade compared to the clinical perfection of Neue
Haas Grotesk. At ultra-heavy weights, it reads as designed, not defaulted.

---

### Differentiation vs. Other Skills

| Aspect | Neo-Brutalism | Clay Premium | Linear Modern | Minimalist Mono |
|---|---|---|---|---|
| Background | `#FFFDF5` cream | `#F4F1FA` lavender | `#050506` near-black | `#FFFFFF` white |
| Borders | `border-4` black everywhere | Minimal | Subtle | None |
| Shadow | Hard zero-blur offset | 4-layer soft stack | 3-layer glow | None |
| Button | Push down (covers shadow) | Squish `scale(0.92)` | Subtle press | N/A |
| Radius | 0px only (or 9999) | 32–60px rounded | 8–16px precise | 0px |
| Font | Space Grotesk 900 | Nunito Black | Inter | Playfair Display |
| Color | 5 high-sat colors | Candy-store vivid | Single indigo | Black only |
| Motion | 100ms mechanical snap | Bouncy float | Expo-out | Instant |
| Texture | Halftone, grid, noise | Floating blobs | Ambient glow | Paper grain |
| Vibe | Punk rebel | Joyful tactile | Premium tech | Austere editorial |
