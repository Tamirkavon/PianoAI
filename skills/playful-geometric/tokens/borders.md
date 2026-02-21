# TOKENS — BORDERS & RADIUS

## Border Width: Always 2px on Interactive Elements

Chunky 2px borders are a defining characteristic of this skill.
They give elements weight and presence — matching the bold typography
and hard shadows. 1px borders look anemic in this system.

| Context | Width | Color |
|---|---|---|
| Buttons | 2px | `#1E293B` (foreground) |
| Cards | 2px | `#1E293B` (foreground) |
| Inputs (default) | 2px | `#CBD5E1` (softer) |
| Inputs (focus) | 2px | `#8B5CF6` (accent) |
| Dividers / subtle | 1px | `#E2E8F0` (border token) |
| Decorative shapes | 2px | `#1E293B` or accent color |

---

## Radius Scale

This skill uses VARIED radius — different element types have different radius values.
This intentional variation is part of the Memphis-inspired aesthetic.

| Token | Value | Tailwind | Used For |
|---|---|---|---|
| `radius-sm` | 8px | `rounded-lg` | Tags, badges, inputs, small chips |
| `radius-md` | 16px | `rounded-2xl` | Cards, panels, modals |
| `radius-lg` | 24px | `rounded-3xl` | Large decorative shapes, section backgrounds |
| `radius-full` | 9999px | `rounded-full` | Buttons (pills), icon circles, avatars |

**The key rule:** Buttons are ALWAYS pills (`rounded-full`).
Cards are ALWAYS `rounded-2xl`. Never swap these.

---

## Special Radius Patterns

### Speech Bubble / Sticker Shape
Asymmetric radius for a handmade, sticker-like feel:
```css
border-radius: 24px 24px 24px 0px;
/* top-left top-right bottom-right bottom-left */
/* → missing bottom-left corner, like a speech bubble */
```

### Arch Shape
```css
border-radius: 9999px 9999px 0 0;
/* Fully rounded top, flat bottom — arch/mushroom shape */
```

### Blob-ish Card (for featured elements)
```css
border-radius: 24px 8px 24px 8px;
/* Alternating large and small corners — organic feel */
```

---

## Decorative Shape Borders

Background decorative shapes (circles, squares, triangles used as decoration)
follow these rules:
- Filled shapes: background color, 2px border in same color or darker shade
- Outline shapes: transparent background, 2px dashed or solid border in accent color
- Pattern-filled shapes: use CSS background patterns (dots, lines)

```css
/* Outline decorative circle */
width: 120px;
height: 120px;
border-radius: 50%;
border: 2px dashed #8B5CF6;
background: transparent;

/* Filled decorative square */
width: 60px;
height: 60px;
background: #FBBF24;
border: 2px solid #1E293B;
box-shadow: 3px 3px 0px #1E293B;
```
