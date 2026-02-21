# TOKENS — COLORS

All colors reference CSS variables defined in `integration/globals.css`.
Use via Tailwind extended config or inline styles.

---

## The Palette

### Backgrounds & Surfaces

| Token | CSS Var | Hex | Tailwind | Usage |
|---|---|---|---|---|
| `background` | `--color-bg` | `#FFFDF5` | `bg-pg-bg` | Page background. Warm cream — never pure white. |
| `muted` | `--color-muted` | `#F1F5F9` | `bg-pg-muted` | Subtle section backgrounds, code blocks. |
| `card` | `--color-card` | `#FFFFFF` | `bg-pg-card` | Card surfaces. Pure white contrasts against cream. |
| `input` | `--color-input` | `#FFFFFF` | `bg-pg-input` | Form field backgrounds. |

### Text

| Token | CSS Var | Hex | Tailwind | Usage |
|---|---|---|---|---|
| `foreground` | `--color-fg` | `#1E293B` | `text-pg-fg` | All primary text. Also used for borders and shadows. |
| `muted-fg` | `--color-muted-fg` | `#64748B` | `text-pg-muted` | Secondary text, captions, labels. |

### Accent Colors — The Confetti Palette

Use these rotationally. Never use one color for everything.

| Token | CSS Var | Hex | Tailwind | Role |
|---|---|---|---|---|
| `accent` | `--color-accent` | `#8B5CF6` | `bg-pg-accent` / `text-pg-accent` | Primary. CTAs, key interactive elements. |
| `accent-fg` | `--color-accent-fg` | `#FFFFFF` | `text-pg-accent-fg` | Text on accent backgrounds. |
| `secondary` | `--color-secondary` | `#F472B6` | `bg-pg-secondary` | Hot pink. Decoration, featured states, hover fills. |
| `tertiary` | `--color-tertiary` | `#FBBF24` | `bg-pg-tertiary` | Amber/Yellow. Optimism, highlights, star badges. |
| `quaternary` | `--color-quaternary` | `#34D399` | `bg-pg-quaternary` | Emerald/Mint. Freshness, success states, tags. |

### Borders & Rings

| Token | CSS Var | Hex | Tailwind | Usage |
|---|---|---|---|---|
| `border` | `--color-border` | `#E2E8F0` | `border-pg-border` | Default subtle borders. |
| `border-strong` | `--color-border-strong` | `#1E293B` | `border-pg-strong` | Chunky component borders. Same as foreground. |
| `ring` | `--color-ring` | `#8B5CF6` | `ring-pg-ring` | Focus rings. Same as accent. |

---

## The Confetti Rotation Rule

When coloring decorative elements (icon backgrounds, shape fills, card accents),
rotate through the four accents systematically:

```
Item 1 → accent    (#8B5CF6 violet)
Item 2 → secondary (#F472B6 pink)
Item 3 → tertiary  (#FBBF24 yellow)
Item 4 → quaternary (#34D399 mint)
Item 5 → accent    (cycle repeats)
```

This pattern applied to icon circles in a features grid:
```jsx
const colors = ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399']
const color = colors[index % 4]
```

---

## Color Rules

1. **Background is always `#FFFDF5`** — warm cream, not white. This is non-negotiable.
2. **Shadows and borders share `#1E293B`** — consistency creates unity.
3. **Accent fills always have white text** — contrast is maintained by design.
4. **Yellow `#FBBF24` with dark text** — never put white text on yellow.
5. **Never use more than 2 accents in a single component** — confetti, not chaos.
6. **Muted backgrounds `#F1F5F9` are for content, not sections** — sections use cream + shapes.
