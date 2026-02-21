/** @type {import('tailwindcss').Config} */

// PLAYFUL GEOMETRIC SKILL — Tailwind Config Extension
// Merge the theme.extend block into your existing tailwind.config.js

module.exports = {
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────────────────────────
      colors: {
        pg: {
          // Backgrounds & surfaces
          bg:       "var(--color-bg)",       // #FFFDF5 — warm cream
          muted:    "var(--color-muted)",     // #F1F5F9
          card:     "var(--color-card)",      // #FFFFFF
          input:    "var(--color-input)",     // #FFFFFF

          // Text
          fg:       "var(--color-fg)",        // #1E293B
          "muted-fg": "var(--color-muted-fg)", // #64748B

          // Confetti accents
          accent:      "var(--color-accent)",      // #8B5CF6 violet
          "accent-fg": "var(--color-accent-fg)",   // #FFFFFF
          secondary:   "var(--color-secondary)",   // #F472B6 pink
          tertiary:    "var(--color-tertiary)",     // #FBBF24 yellow
          quaternary:  "var(--color-quaternary)",  // #34D399 mint

          // Borders
          border:  "var(--color-border)",       // #E2E8F0
          strong:  "var(--color-border-strong)", // #1E293B
          ring:    "var(--color-ring)",          // #8B5CF6
        },
      },

      // ── FONTS ────────────────────────────────────────────────────────────────
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        body:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },

      // ── BORDER RADIUS ────────────────────────────────────────────────────────
      // Varied radii are intentional in this skill
      borderRadius: {
        sm:   "8px",
        md:   "16px",
        lg:   "24px",
        full: "9999px",
        // Keep default Tailwind values for flexibility
      },

      // ── BOX SHADOWS (POP SHADOW SYSTEM) ─────────────────────────────────────
      boxShadow: {
        "pop-sm": "2px 2px 0px 0px #1E293B",
        "pop":    "4px 4px 0px 0px #1E293B",
        "pop-md": "6px 6px 0px 0px #1E293B",
        "pop-lg": "8px 8px 0px 0px #1E293B",
        "pop-xl": "12px 12px 0px 0px #1E293B",
        // Colored variants
        "pop-violet": "4px 4px 0px 0px #8B5CF6",
        "pop-pink":   "4px 4px 0px 0px #F472B6",
        "pop-yellow": "4px 4px 0px 0px #FBBF24",
        "pop-mint":   "4px 4px 0px 0px #34D399",
        // Focus
        "focus-ring": "4px 4px 0px 0px #8B5CF6",
      },

      // ── ANIMATIONS ───────────────────────────────────────────────────────────
      animation: {
        "pop-in":    "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        "fade-up":   "fadeInUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "wiggle":    "wiggle 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "float":     "float 4s ease-in-out infinite",
        "float-slow":"float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "marquee":   "marquee 20s linear infinite",
      },

      keyframes: {
        popIn: {
          "0%":   { opacity: "0", transform: "scale(0.8)" },
          "70%":  { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%":      { transform: "rotate(4deg)" },
          "75%":      { transform: "rotate(-4deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },

      // ── TRANSITION TIMING ────────────────────────────────────────────────────
      transitionTimingFunction: {
        "bounce-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
