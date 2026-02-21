// PLAYFUL GEOMETRIC SKILL — Badge.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// Badges use the confetti accent colors as backgrounds — they're small
// blocks of color that reinforce the palette's playful variety.
// They have a subtle hard shadow to feel "stuck on" — like a price tag
// or label you'd find on a product in a toy store.
//
// The "MOST POPULAR" badge pattern (rotated, with star) is a special variant
// for pricing pages — it sits tilted on top of the featured card.

import { Star } from "lucide-react";

const variants = {
  default:    { bg: "#F1F5F9",  text: "#1E293B",  border: "#E2E8F0" },
  accent:     { bg: "#EDE9FE",  text: "#7C3AED",  border: "#DDD6FE" },
  secondary:  { bg: "#FCE7F3",  text: "#BE185D",  border: "#FBCFE8" },
  tertiary:   { bg: "#FEF3C7",  text: "#B45309",  border: "#FDE68A" },
  quaternary: { bg: "#D1FAE5",  text: "#065F46",  border: "#A7F3D0" },
  filled:     { bg: "#8B5CF6",  text: "#FFFFFF",  border: "#7C3AED" },
  success:    { bg: "#D1FAE5",  text: "#065F46",  border: "#34D399" },
  error:      { bg: "#FEE2E2",  text: "#DC2626",  border: "#FCA5A5" },
  warning:    { bg: "#FEF3C7",  text: "#D97706",  border: "#FDE68A" },
};

export function Badge({
  children,
  variant = "default",
  dot = false,
  shadow = false,
}) {
  const v = variants[variant] || variants.default;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 12px",
      fontSize: 12,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.04em",
      color: v.text,
      background: v.bg,
      // WHY: Small radius for badges — not pill, not sharp. In between.
      borderRadius: 8,
      border: `2px solid ${v.border}`,
      // WHY: Optional pop shadow for badges that need more presence
      boxShadow: shadow ? "2px 2px 0px 0px #1E293B" : "none",
      whiteSpace: "nowrap",
      userSelect: "none",
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: v.text,
          flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  );
}

// ── SPECIAL: POPULAR BADGE ────────────────────────────────────────────────────
// For pricing pages — rotated badge that sits on the featured card corner.
// WHY: The tilt and star icon create a "sale tag" energy — eye-catching, fun.

export function PopularBadge({ children = "MOST POPULAR" }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      background: "#FBBF24",          // always yellow — optimism signal
      border: "2px solid #1E293B",
      borderRadius: 9999,
      boxShadow: "3px 3px 0px 0px #1E293B",
      transform: "rotate(-15deg)",    // the tilt is essential
      fontSize: 12,
      fontWeight: 800,
      fontFamily: '"Outfit", sans-serif',
      color: "#1E293B",
      letterSpacing: "0.04em",
      whiteSpace: "nowrap",
      userSelect: "none",
    }}>
      <Star size={12} strokeWidth={2.5} fill="#1E293B" />
      {children}
      <Star size={12} strokeWidth={2.5} fill="#1E293B" />
    </div>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Badge variant="accent">New</Badge>
// <Badge variant="quaternary" dot>Active</Badge>
// <Badge variant="error" shadow>Error</Badge>
// <PopularBadge />
