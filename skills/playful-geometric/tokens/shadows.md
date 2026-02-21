# TOKENS — SHADOWS (THE POP SHADOW SYSTEM)

## The Core Rule: Hard Offset, Zero Blur

This skill uses ONLY hard, offset shadows with zero blur.
Soft, gaussian-blurred shadows are completely absent from this system.

The hard shadow creates a "sticker" or "cut-out paper" effect —
elements feel physically lifted from the page surface.

```
✓ box-shadow: 4px 4px 0px 0px #1E293B   ← CORRECT
✗ box-shadow: 0 4px 20px rgba(0,0,0,0.1) ← WRONG — soft shadows don't belong here
```

---

## Shadow Scale

| Token | CSS | Usage |
|---|---|---|
| `shadow-pop-sm` | `2px 2px 0px 0px #1E293B` | Small elements: tags, badges, inputs |
| `shadow-pop` | `4px 4px 0px 0px #1E293B` | Default: cards, buttons, panels |
| `shadow-pop-md` | `6px 6px 0px 0px #1E293B` | Hover state — the "lift" effect |
| `shadow-pop-lg` | `8px 8px 0px 0px #1E293B` | Featured cards, modals, hero elements |
| `shadow-pop-xl` | `12px 12px 0px 0px #1E293B` | Maximum emphasis |

---

## The Hover Lift Interaction

The most important motion pattern in this skill.
When an element is hovered, it "lifts" — translates up-left while the shadow grows.

```css
/* Resting state */
transform: translate(0, 0);
box-shadow: 4px 4px 0px 0px #1E293B;

/* Hover state */
transform: translate(-2px, -2px);
box-shadow: 6px 6px 0px 0px #1E293B;

/* Active/pressed state */
transform: translate(2px, 2px);
box-shadow: 2px 2px 0px 0px #1E293B;
```

WHY: The translation + shadow growth creates an illusion of physical lift.
The element moves away from its shadow source. This is how real stickers
and paper cutouts behave when you lift them.

---

## Colored Shadows

For featured or highlighted elements, the shadow can use an accent color
instead of the dark foreground:

```css
/* Pink featured card */
box-shadow: 8px 8px 0px 0px #F472B6;

/* Violet CTA */
box-shadow: 4px 4px 0px 0px #8B5CF6;

/* Yellow badge */
box-shadow: 3px 3px 0px 0px #FBBF24;
```

Use colored shadows sparingly — for the single most important element
in a section. Not on everything.

---

## Focus Shadow

For interactive elements (inputs, buttons), the focus state uses a colored
hard shadow to create a visible, accessible focus ring:

```css
/* Focus state */
border-color: #8B5CF6;
box-shadow: 4px 4px 0px 0px #8B5CF6;
outline: none; /* replaced by shadow */
```

---

## Rules

1. Shadow color is ALWAYS `#1E293B` (foreground) unless using a colored shadow for emphasis.
2. Blur is ALWAYS `0` — no exceptions.
3. Spread is ALWAYS `0` — no exceptions.
4. Hover always increases shadow size AND translates the element.
5. Active/pressed always decreases shadow size AND translates element toward shadow.
6. Colored shadows: maximum one per section, for the featured element only.
