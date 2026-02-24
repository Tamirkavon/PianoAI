# SETUP — NEO-BRUTALISM SKILL

## 1. Install Dependencies

```bash
npm install lucide-react
```

No animation library needed — all motion is CSS.

---

## 2. Wire Up Font

Add to your `<head>` (Next.js: `layout.jsx`, Vite: `index.html`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=block" rel="stylesheet">
```

`display=block` is required — it prevents flash of unstyled text on initial load.

---

## 3. Import globals.css

```js
// Next.js App Router (layout.jsx)
import '@/skills/neo-brutalism/integration/globals.css'

// Vite / CRA
import './skills/neo-brutalism/integration/globals.css'
```

---

## 4. Merge Tailwind Config

Add the `theme.extend` block from `tailwind.config.js` into your project config.

Key additions:
- `neo.*` color tokens
- `shadow-neo-*` shadow scale (hard, zero-blur)
- `animate-spin-slow`, `animate-marquee`, `animate-wiggle`
- `font-neo` (Space Grotesk)

---

## 5. Verify Setup

Paste this into any page. You should see a cream background, a bordered card
with a hard black shadow, and a red button that physically presses down:

```jsx
export default function NeoTest() {
  return (
    <div style={{ background: "#FFFDF5", padding: 48, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{
        background: "#FFF",
        border: "4px solid #000",
        boxShadow: "8px 8px 0px 0px #000",
        padding: 32,
        maxWidth: 400,
      }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 28, textTransform: "uppercase" }}>
          Neo-Brutalism
        </h2>
        <p style={{ fontWeight: 700, marginTop: 12 }}>
          Border ✓  Hard shadow ✓  Space Grotesk ✓
        </p>
        <button
          style={{
            marginTop: 20,
            background: "#FF6B6B",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px 0px #000",
            padding: "12px 28px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "all 100ms linear",
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = "translate(6px, 6px)";
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "6px 6px 0px 0px #000";
          }}
        >
          Press me
        </button>
      </div>
    </div>
  );
}
```

You should see:
- Canvas background `#FFFDF5` — warm cream, not white
- Card with crisp 4px black border and hard 8px offset shadow (no blur)
- Space Grotesk Black on the heading
- Button that physically clicks down on press

---

## 6. Folder Location

```
your-project/
└── skills/
    └── neo-brutalism/
```
