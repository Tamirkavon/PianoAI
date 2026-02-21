# SETUP — PLAYFUL GEOMETRIC SKILL

Follow these steps in order before writing any component code.

---

## 1. Install Dependencies

```bash
npm install framer-motion lucide-react
```

Tailwind CSS should already be installed. If not:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 2. Wire Up the Tailwind Config

Merge the skill's `theme.extend` block from `integration/tailwind.config.js`
into your project's `tailwind.config.js`.

Key things being added:
- `pg.*` color tokens (pg-bg, pg-accent, pg-secondary, etc.)
- `font-display` (Outfit) and `font-body` (Plus Jakarta Sans)
- `shadow-pop`, `shadow-pop-md`, `shadow-pop-lg` etc.
- Bounce keyframes and animation utilities

---

## 3. Import globals.css

**Next.js (App Router):**
```js
// app/layout.tsx
import '@/skills/playful-geometric/integration/globals.css'
```

**Next.js (Pages Router):**
```js
// pages/_app.tsx
import '../skills/playful-geometric/integration/globals.css'
```

**Vite / CRA:**
```js
// main.jsx
import './skills/playful-geometric/integration/globals.css'
```

---

## 4. Verify Setup

Create a quick test to confirm everything is working:

```jsx
export default function SkillTest() {
  return (
    <div className="bg-pg-bg min-h-screen p-16 font-body">
      <h1 className="font-display text-5xl font-extrabold text-pg-fg mb-4"
        style={{ fontFamily: "Outfit" }}>
        Playful Geometric ✦
      </h1>
      <button style={{
        background: "#8B5CF6",
        color: "#fff",
        border: "2px solid #1E293B",
        borderRadius: 9999,
        padding: "12px 28px",
        fontWeight: 700,
        boxShadow: "4px 4px 0px #1E293B",
        cursor: "pointer",
      }}>
        The Candy Button
      </button>
    </div>
  )
}
```

You should see:
- Warm cream background (not pure white)
- Outfit font rendering for the heading
- A violet pill button with a hard dark shadow
- No soft drop shadows anywhere

---

## 5. Folder Location

Place the skill at:
```
your-project/
└── skills/
    └── playful-geometric/
```
