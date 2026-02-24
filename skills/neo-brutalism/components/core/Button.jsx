// NEO-BRUTALISM SKILL — Button.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// The button is a physical switch. At rest it sits above the canvas with
// a hard shadow (the gap between the button and the surface). When pressed,
// it translates exactly as far as the shadow is offset — covering the shadow
// completely. The button appears to press INTO the surface.
//
// The push offset MUST match the shadow offset. If shadow is 6px, translate 6px.
// Mismatch = the shadow doesn't disappear cleanly = the illusion breaks.
//
// Duration is 100ms. Anything slower feels laggy. This is a mechanical switch.
//
// Variants:
// primary   — red background, for primary CTAs
// secondary — yellow background, for secondary actions
// outline   — white background, bordered, for tertiary
// ghost     — no border until hover, for subtle actions
// black     — inverted, for use on light sections when drama is needed

import { useState } from "react";

const VARIANTS = {
  primary: {
    bg:       "#FF6B6B",
    color:    "#000000",
    border:   "4px solid #000",
    shadow:   "6px 6px 0px 0px #000",
    bgHover:  "#e85555",
  },
  secondary: {
    bg:       "#FFD93D",
    color:    "#000000",
    border:   "4px solid #000",
    shadow:   "6px 6px 0px 0px #000",
    bgHover:  "#f0c830",
  },
  outline: {
    bg:       "#FFFFFF",
    color:    "#000000",
    border:   "4px solid #000",
    shadow:   "6px 6px 0px 0px #000",
    bgHover:  "#FFFDF5",
  },
  black: {
    bg:       "#000000",
    color:    "#FFFFFF",
    border:   "4px solid #000",
    shadow:   "6px 6px 0px 0px #FFD93D",
    bgHover:  "#111111",
  },
  ghost: {
    bg:       "transparent",
    color:    "#000000",
    border:   "4px solid transparent",
    shadow:   "none",
    bgHover:  "#FF6B6B",
    borderHover: "4px solid #000",
    shadowHover: "4px 4px 0px 0px #000",
  },
};

const SIZES = {
  sm: { height: 44, padding: "0 20px", fontSize: 13 },
  md: { height: 52, padding: "0 28px", fontSize: 14 },
  lg: { height: 60, padding: "0 36px", fontSize: 16 },
  xl: { height: 72, padding: "0 48px", fontSize: 18 },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;

  // Push offset matches shadow offset exactly
  const shadowPx = variant === "ghost" && hovered ? 4 : 6;
  const shadow = pressed
    ? "none"
    : hovered && v.shadowHover
    ? v.shadowHover
    : v.shadow;

  const border = hovered && v.borderHover ? v.borderHover : v.border;
  const bg = hovered ? (v.bgHover || v.bg) : v.bg;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        border,
        borderRadius: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        whiteSpace: "nowrap",
        outline: "none",
        width: fullWidth ? "100%" : undefined,
        background: bg,
        color: v.color,
        boxShadow: shadow,
        // THE PUSH: translate exactly as far as shadow offset
        transform: pressed ? `translate(${shadowPx}px, ${shadowPx}px)` : "none",
        transition: pressed ? "all 100ms linear" : "all 100ms linear",
      }}
    >
      {Icon && iconPosition === "left"  && <Icon size={s.fontSize + 2} strokeWidth={3} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={s.fontSize + 2} strokeWidth={3} />}
    </button>
  );
}

// ── USAGE ─────────────────────────────────────────────────────────────────────
// <Button>GET STARTED</Button>
// <Button variant="secondary" size="lg">LEARN MORE</Button>
// <Button variant="outline" icon={ArrowRight} iconPosition="right">VIEW DOCS</Button>
// <Button variant="black" size="xl">JOIN WAITLIST</Button>
// <Button variant="ghost">CANCEL</Button>
// <Button fullWidth>FULL WIDTH CTA</Button>
