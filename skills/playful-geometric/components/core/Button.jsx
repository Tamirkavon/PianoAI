// PLAYFUL GEOMETRIC SKILL — Button.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// This is "The Candy Button" — a pill shape with a chunky dark border and
// a hard offset shadow. When you hover, it LIFTS (translate -2px/-2px, bigger shadow).
// When you click, it PRESSES (translate +2px/+2px, smaller shadow).
// This physical push/pull makes it feel like a real button you can touch.
//
// The icon slot (trailing arrow circle) is borrowed from premium SaaS marketing sites.
// It signals "this is the main CTA" — only use it on primary buttons.
//
// Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — the bounce overshoot curve.
// Never use ease-in-out for this interaction.

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const variants = {
  primary: {
    base: {
      background: "#8B5CF6",
      color: "#FFFFFF",
      border: "2px solid #1E293B",
      boxShadow: "4px 4px 0px 0px #1E293B",
    },
    hover: {
      transform: "translate(-2px, -2px)",
      boxShadow: "6px 6px 0px 0px #1E293B",
    },
    active: {
      transform: "translate(2px, 2px)",
      boxShadow: "2px 2px 0px 0px #1E293B",
    },
  },
  secondary: {
    base: {
      background: "transparent",
      color: "#1E293B",
      border: "2px solid #1E293B",
      boxShadow: "4px 4px 0px 0px #1E293B",
    },
    hover: {
      // WHY: Fills with yellow on hover — unexpected, delightful, on-brand
      background: "#FBBF24",
      transform: "translate(-2px, -2px)",
      boxShadow: "6px 6px 0px 0px #1E293B",
    },
    active: {
      transform: "translate(2px, 2px)",
      boxShadow: "2px 2px 0px 0px #1E293B",
    },
  },
  ghost: {
    base: {
      background: "transparent",
      color: "#64748B",
      border: "2px solid transparent",
      boxShadow: "none",
    },
    hover: {
      color: "#1E293B",
      border: "2px solid #E2E8F0",
      background: "#F1F5F9",
    },
    active: {},
  },
  danger: {
    base: {
      background: "#FEF2F2",
      color: "#DC2626",
      border: "2px solid #1E293B",
      boxShadow: "4px 4px 0px 0px #1E293B",
    },
    hover: {
      background: "#DC2626",
      color: "#FFFFFF",
      transform: "translate(-2px, -2px)",
      boxShadow: "6px 6px 0px 0px #1E293B",
    },
    active: {
      transform: "translate(2px, 2px)",
      boxShadow: "2px 2px 0px 0px #1E293B",
    },
  },
};

const sizes = {
  sm: { padding: "8px 18px",  fontSize: "13px", iconSize: 14 },
  md: { padding: "12px 24px", fontSize: "15px", iconSize: 16 },
  lg: { padding: "16px 32px", fontSize: "17px", iconSize: 18 },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  showArrow = false,  // adds the circular arrow icon — use only on primary CTAs
  disabled = false,
  loading = false,
  onClick,
}) {
  const [state, setState] = useState("rest"); // "rest" | "hover" | "active"
  const v = variants[variant];
  const s = sizes[size];

  const stateStyle =
    state === "hover" ? v.hover :
    state === "active" ? v.active :
    {};

  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseEnter={() => !disabled && setState("hover")}
      onMouseLeave={() => setState("rest")}
      onMouseDown={() => !disabled && setState("active")}
      onMouseUp={() => !disabled && setState("hover")}
      disabled={disabled}
      style={{
        // Shape — always a pill for buttons
        // WHY: Pill shape is warm and inviting vs. sharp corners which feel clinical
        borderRadius: 9999,

        // Layout
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : "pointer",

        // Typography
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 700,
        ...s,

        // Visual
        ...v.base,
        ...stateStyle,

        opacity: disabled ? 0.5 : 1,

        // Transition — bounce easing on transform and shadow only
        transition: [
          "transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
          "box-shadow 200ms cubic-bezier(0.34,1.56,0.64,1)",
          "background 150ms ease",
          "color 150ms ease",
          "border-color 150ms ease",
        ].join(", "),

        outline: "none",
      }}
    >
      {loading ? (
        // Simple loading state — bouncing dots
        <span style={{ display: "flex", gap: 4 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "currentColor",
              animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
            }} />
          ))}
        </span>
      ) : (
        <>
          {children}
          {/* Circular arrow — only on primary CTA buttons */}
          {showArrow && (
            <span style={{
              width: s.iconSize + 10,
              height: s.iconSize + 10,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <ArrowRight size={s.iconSize} strokeWidth={2.5} />
            </span>
          )}
        </>
      )}
    </button>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Button variant="primary" size="lg" showArrow>Get started free</Button>
// <Button variant="secondary">Learn more</Button>
// <Button variant="ghost">Cancel</Button>
// <Button variant="danger">Delete account</Button>
// <Button loading>Saving...</Button>
