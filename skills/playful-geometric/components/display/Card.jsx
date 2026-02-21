// PLAYFUL GEOMETRIC SKILL — Card.jsx (The Sticker Card)
//
// WHY THIS LOOKS THE WAY IT DOES:
// Cards in this system are "stickers" — white surfaces with a chunky dark border
// and a hard offset shadow. They feel physically present on the page.
//
// On hover, the card rotates -1 degree AND scales up slightly — the "wiggle" effect.
// This comes from the Memphis Group aesthetic where objects feel playful and unstable
// in the best way. Combined with the shadow growing, the card seems to pop off the page.
//
// The floating icon (sitting half-in, half-out of the top border) is the most
// distinctive layout detail. It breaks the grid deliberately — the icon intrudes
// into the card's space, creating visual tension and interest.
//
// Featured variant: uses a PINK shadow instead of dark, with a subtle pink tint.
// Only one card per grid should be "featured."

import { useState } from "react";

export function Card({
  children,
  variant = "default",    // "default" | "featured" | "ghost"
  interactive = false,    // enables hover wiggle effect
  padding = "28px",
  style: externalStyle,
}) {
  const [hovered, setHovered] = useState(false);

  const variants = {
    default: {
      background: "#FFFFFF",
      border: "2px solid #1E293B",
      boxShadow: hovered && interactive ? "8px 8px 0px 0px #1E293B" : "4px 4px 0px 0px #1E293B",
    },
    featured: {
      background: "#FFFFFF",
      border: "2px solid #1E293B",
      // WHY: Pink shadow makes the featured card immediately stand out
      // without using a different background or size
      boxShadow: hovered && interactive ? "10px 10px 0px 0px #F472B6" : "6px 6px 0px 0px #F472B6",
    },
    ghost: {
      background: "transparent",
      border: "2px dashed #E2E8F0",
      boxShadow: "none",
    },
  };

  const v = variants[variant];

  return (
    <div
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        borderRadius: 16,  // rounded-2xl — WHY: Cards use md radius, never pill
        overflow: "hidden",
        position: "relative",

        ...v,

        // The wiggle effect — small rotation + scale on hover
        // WHY: Mimics picking up a sticker or paper card
        transform: interactive && hovered
          ? "rotate(-1deg) scale(1.02)"
          : "rotate(0deg) scale(1)",

        transition: [
          "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
          "box-shadow 300ms cubic-bezier(0.34,1.56,0.64,1)",
        ].join(", "),

        cursor: interactive ? "pointer" : "default",
        padding,
        ...externalStyle,
      }}
    >
      {children}
    </div>
  );
}

// ── FLOATING ICON PATTERN ─────────────────────────────────────────────────────
// Use this inside a Card to create the "half-out" floating icon effect.
// The card needs `overflow: visible` and the section needs enough top padding
// to accommodate the icon overflowing upward.

export function CardIcon({ icon: Icon, color = "#8B5CF6", size = 48 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",    // WHY: Icon containers are always circles in this skill
      background: color,
      border: "2px solid #1E293B",
      boxShadow: "3px 3px 0px 0px #1E293B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      flexShrink: 0,
    }}>
      {Icon && <Icon size={size * 0.45} strokeWidth={2.5} color="#FFFFFF" />}
    </div>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Card interactive>
//   <CardIcon icon={Zap} color="#8B5CF6" />
//   <h3>Feature Title</h3>
//   <p>Description text</p>
// </Card>
//
// <Card variant="featured" interactive>
//   The featured card — pink shadow, slightly more prominent.
// </Card>
