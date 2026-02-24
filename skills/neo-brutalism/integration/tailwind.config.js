/** @type {import('tailwindcss').Config} */

// NEO-BRUTALISM SKILL — Tailwind Config Extension
// Merge theme.extend into your existing tailwind.config.js

module.exports = {
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────────────────────────
      colors: {
        neo: {
          canvas:    "#FFFDF5",
          ink:       "#000000",
          accent:    "#FF6B6B",
          secondary: "#FFD93D",
          muted:     "#C4B5FD",
          white:     "#FFFFFF",
        },
      },

      // ── FONTS ────────────────────────────────────────────────────────────────
      fontFamily: {
        neo: ["Space Grotesk", "system-ui", "sans-serif"],
      },

      // ── BORDER RADIUS — Sharp or Full, nothing between ───────────────────────
      borderRadius: {
        none: "0px",
        full: "9999px",
        // All mid-range radii intentionally omitted — use rounded-none or rounded-full only
      },

      // ── BOX SHADOWS — Hard ink blocks, zero blur ─────────────────────────────
      boxShadow: {
        "neo-xs":     "2px 2px 0px 0px #000",
        "neo-sm":     "4px 4px 0px 0px #000",
        "neo-md":     "6px 6px 0px 0px #000",
        "neo-base":   "8px 8px 0px 0px #000",
        "neo-lg":     "12px 12px 0px 0px #000",
        "neo-xl":     "16px 16px 0px 0px #000",
        "neo-2xl":    "20px 20px 0px 0px #000",
        // Inverted (for elements on black backgrounds)
        "neo-inv-sm": "4px 4px 0px 0px #fff",
        "neo-inv-md": "6px 6px 0px 0px #fff",
        "neo-inv-lg": "8px 8px 0px 0px #fff",
      },

      // ── ANIMATIONS ───────────────────────────────────────────────────────────
      animation: {
        "spin-slow":         "spin-slow 10s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 8s linear infinite",
        "marquee":           "marquee 20s linear infinite",
        "wiggle":            "wiggle 0.5s ease-in-out",
        "neo-fade-up":       "neo-fade-up 0.3s ease-out both",
      },

      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          from: { transform: "rotate(360deg)" },
          to:   { transform: "rotate(0deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":       { transform: "rotate(3deg)" },
        },
        "neo-fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },

      // ── TRANSITION DURATIONS ─────────────────────────────────────────────────
      transitionDuration: {
        instant:  "100ms",
        fast:     "150ms",
        standard: "200ms",
      },

      // ── TYPOGRAPHY EXTRAS ────────────────────────────────────────────────────
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
